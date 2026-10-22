/**
 * ADRIAN STEGER - PORTFOLIO 2026
 * Interactive 3D Skill Globe: drag to spin, hover a skill tag to bring it to the front
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

const wrap = document.getElementById('skill-globe');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const RADIUS = 2.4;
const LABEL_HEIGHT = 0.22;
const AUTO_SPIN = reduceMotion ? 0 : 0.22; // rad/s

const LABEL_STYLES = {
  dark: {
    bg: 'rgba(15, 23, 42, 0.88)', border: 'rgba(255, 255, 255, 0.14)', text: '#e2e8f0',
    hlBg: 'rgba(49, 46, 129, 0.9)', hlBorder: 'rgba(129, 140, 248, 0.75)', hlText: '#c7d2fe',
    decor: '#6366f1', dust: '#06b6d4'
  },
  light: {
    bg: 'rgba(255, 255, 255, 0.95)', border: 'rgba(15, 23, 42, 0.14)', text: '#1e293b',
    hlBg: 'rgba(238, 242, 255, 0.97)', hlBorder: 'rgba(79, 70, 229, 0.6)', hlText: '#4338ca',
    decor: '#4f46e5', dust: '#0284c7'
  }
};

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Draws a pill-shaped label onto a canvas texture
function makeLabelTexture(text, highlight, style) {
  const scale = 2;
  const font = `600 ${24 * scale}px 'JetBrains Mono', monospace`;
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.font = font;
  const padX = 18 * scale;
  const h = 46 * scale;
  c.width = Math.ceil(ctx.measureText(text).width + padX * 2);
  c.height = h;

  ctx.font = font;
  roundRect(ctx, 2, 2, c.width - 4, h - 4, 12 * scale);
  ctx.fillStyle = highlight ? style.hlBg : style.bg;
  ctx.fill();
  ctx.lineWidth = 2 * scale;
  ctx.strokeStyle = highlight ? style.hlBorder : style.border;
  ctx.stroke();
  ctx.fillStyle = highlight ? style.hlText : style.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, c.width / 2, h / 2 + scale);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return { tex, aspect: c.width / c.height };
}

function init() {
  if (!wrap) return;
  const canvas = wrap.querySelector('canvas');

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 0, 7.4);

  const group = new THREE.Group();
  scene.add(group);

  // --- Collect skills from the DOM (single source of truth) ---
  const skills = new Map();
  document.querySelectorAll('.skills-grid .skill-tag').forEach(el => {
    const name = el.textContent.trim();
    const entry = skills.get(name) || { name, highlight: false, els: [] };
    entry.highlight = entry.highlight || el.classList.contains('highlight');
    entry.els.push(el);
    skills.set(name, entry);
  });
  const entries = [...skills.values()];

  // --- Sprites on a fibonacci sphere ---
  const golden = Math.PI * (3 - Math.sqrt(5));
  entries.forEach((entry, i) => {
    const y = 1 - (i / (entries.length - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, depthTest: false }));
    sprite.position.set(Math.cos(th) * r * RADIUS, y * RADIUS, Math.sin(th) * r * RADIUS);
    sprite.userData.entry = entry;
    sprite.userData.focus = 0;
    entry.sprite = sprite;
    group.add(sprite);
  });

  // --- Decorative core: wireframe icosahedron, orbit ring, dust shell ---
  const decorMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.22 });
  const core = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(RADIUS * 0.62, 1)), decorMat);
  group.add(core);

  const ringPts = new THREE.EllipseCurve(0, 0, RADIUS * 1.12, RADIUS * 1.12).getPoints(128);
  const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ringPts), decorMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  const DUST = 700;
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(RADIUS * (0.95 + Math.random() * 0.15));
    v.toArray(dustPos, i * 3);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ size: 0.025, transparent: true, opacity: 0.6, depthWrite: false });
  group.add(new THREE.Points(dustGeo, dustMat));

  // --- Theme: (re)build label textures and decor colours ---
  function applyTheme() {
    const style = LABEL_STYLES[currentTheme()];
    entries.forEach(entry => {
      const { tex, aspect } = makeLabelTexture(entry.name, entry.highlight, style);
      const mat = entry.sprite.material;
      if (mat.map) mat.map.dispose();
      mat.map = tex;
      mat.needsUpdate = true;
      entry.sprite.userData.aspect = aspect;
    });
    decorMat.color.set(style.decor);
    dustMat.color.set(style.dust);
  }

  // --- Interaction state ---
  const velocity = new THREE.Vector2(0, AUTO_SPIN); // x: pitch, y: yaw (rad/s)
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let focused = null; // entry brought to the front by hovering a DOM tag
  let hovered = null; // sprite under the pointer
  const pointerNdc = new THREE.Vector2(9, 9);
  const raycaster = new THREE.Raycaster();

  const qTmp = new THREE.Quaternion();
  const axisX = new THREE.Vector3(1, 0, 0);
  const axisY = new THREE.Vector3(0, 1, 0);
  const front = new THREE.Vector3(0, 0, 1);
  const vTmp = new THREE.Vector3();

  function rotate(pitch, yaw) {
    group.quaternion.premultiply(qTmp.setFromAxisAngle(axisY, yaw));
    group.quaternion.premultiply(qTmp.setFromAxisAngle(axisX, pitch));
  }

  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    pointerNdc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    rotate(dy * 0.006, dx * 0.006);
    velocity.set(dy * 0.35, dx * 0.35);
  });

  const endDrag = () => { dragging = false; };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => pointerNdc.set(9, 9));

  // Hovering a skill tag in the grid spins the globe to that skill
  entries.forEach(entry => {
    entry.els.forEach(el => {
      el.addEventListener('mouseenter', () => { focused = entry; });
      el.addEventListener('mouseleave', () => { if (focused === entry) focused = null; });
    });
  });

  function setHovered(sprite) {
    if (hovered === sprite) return;
    if (hovered) hovered.userData.entry.els.forEach(el => el.classList.remove('is-linked'));
    hovered = sprite;
    if (hovered) hovered.userData.entry.els.forEach(el => el.classList.add('is-linked'));
    canvas.style.cursor = hovered ? 'pointer' : '';
  }

  // --- Sizing ---
  function resize() {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the whole globe in view on narrow screens
    camera.position.z = 7.4 * Math.max(1, 1.3 / camera.aspect);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(wrap);

  // --- Render loop (only while visible) ---
  let running = false;
  let last = 0;

  function tick(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    if (focused) {
      // Rotate along the shortest arc so the focused label faces the camera
      vTmp.copy(focused.sprite.position).normalize().applyQuaternion(group.quaternion);
      qTmp.setFromUnitVectors(vTmp, front);
      const k = reduceMotion ? 1 : 1 - Math.pow(0.003, dt);
      group.quaternion.premultiply(new THREE.Quaternion().slerp(qTmp, k));
      velocity.set(0, 0);
    } else if (!dragging) {
      rotate(velocity.x * dt, velocity.y * dt);
      const decay = 1 - Math.pow(0.15, dt);
      velocity.x += (0 - velocity.x) * decay;
      velocity.y += (AUTO_SPIN - velocity.y) * decay;
    }

    // Hover picking (front-most visible sprite)
    raycaster.setFromCamera(pointerNdc, camera);
    const hit = raycaster.intersectObjects(group.children.filter(o => o.isSprite))[0];
    setHovered(hit && hit.object.getWorldPosition(vTmp).z > 0 ? hit.object : null);

    // Depth-based fade & scale, plus focus pop
    group.children.forEach(obj => {
      if (!obj.isSprite) return;
      const ud = obj.userData;
      const z = obj.getWorldPosition(vTmp).z / RADIUS; // -1 (back) .. 1 (front)
      const depth = (z + 1) / 2;
      const isFocus = obj === hovered || (focused && focused.sprite === obj);
      ud.focus += ((isFocus ? 1 : 0) - ud.focus) * Math.min(dt * 10, 1);
      const s = LABEL_HEIGHT * (0.7 + depth * 0.45) * (1 + ud.focus * 0.35);
      obj.scale.set(s * (ud.aspect || 3), s, 1);
      obj.material.opacity = 0.12 + Math.pow(depth, 1.5) * 0.88;
      obj.renderOrder = Math.round(depth * 1000) + (isFocus ? 2000 : 0);
    });

    core.rotation.y -= dt * 0.15;
    core.rotation.x += dt * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(tick);
  }

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) start();
    else running = false;
  }, { rootMargin: '100px' }).observe(wrap);

  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Labels use the web font; draw them once it has loaded
  const ready = document.fonts ? document.fonts.load("600 24px 'JetBrains Mono'").catch(() => { }) : Promise.resolve();
  ready.then(() => {
    applyTheme();
    wrap.classList.add('is-ready');
    resize();
  });
}

init();
