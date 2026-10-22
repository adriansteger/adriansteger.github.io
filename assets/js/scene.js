/**
 * ADRIAN STEGER - PORTFOLIO 2026
 * Three.js Background: morphing particle field that changes shape per section
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

const canvas = document.getElementById('bg-canvas');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmall = window.matchMedia('(max-width: 768px)').matches;
const COUNT = isSmall ? 7000 : 16000;
const TAU = Math.PI * 2;
const MORPH_DURATION = reduceMotion ? 0.001 : 1.8;

// --- Theme palettes (dark: glowing additive, light: ink on paper) ---
const PALETTES = {
  dark: { a: '#6366f1', b: '#06b6d4', c: '#a855f7', glow: 1, blending: THREE.AdditiveBlending },
  light: { a: '#4f46e5', b: '#0284c7', c: '#9333ea', glow: 0, blending: THREE.NormalBlending }
};

// --- Shape generators: each returns COUNT xyz positions ---
const rand = Math.random;

function put(arr, i, x, y, z) {
  arr[i * 3] = x;
  arr[i * 3 + 1] = y;
  arr[i * 3 + 2] = z;
}

// Random point inside a sphere of radius r (denser towards the centre)
function jitter(r) {
  const u = rand() * TAU;
  const v = Math.acos(2 * rand() - 1);
  const d = r * Math.pow(rand(), 1.5);
  return [Math.sin(v) * Math.cos(u) * d, Math.sin(v) * Math.sin(u) * d, Math.cos(v) * d];
}

function shapeCloud() {
  const a = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const [x, y, z] = jitter(14);
    put(a, i, x, y, z);
  }
  return a;
}

// Hero: planet with a tilted ring around the avatar
function shapeGlobe() {
  const a = new Float32Array(COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const shell = Math.floor(COUNT * 0.8);
  const tilt = 0.42;
  for (let i = 0; i < COUNT; i++) {
    if (i < shell) {
      const y = 1 - (i / (shell - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const R = 2.2 * (1 + (rand() - 0.5) * 0.05);
      put(a, i, Math.cos(th) * r * R, y * R, Math.sin(th) * r * R);
    } else {
      const ang = rand() * TAU;
      const R = 2.75 + Math.pow(rand(), 2) * 0.55;
      const x = Math.cos(ang) * R;
      const y = (rand() - 0.5) * 0.05;
      const z = Math.sin(ang) * R;
      put(a, i, x, y * Math.cos(tilt) - z * Math.sin(tilt), y * Math.sin(tilt) + z * Math.cos(tilt));
    }
  }
  return a;
}

// Projects: (2,3) torus knot
function shapeKnot() {
  const a = new Float32Array(COUNT * 3);
  const R = 1.7, r = 0.65;
  for (let i = 0; i < COUNT; i++) {
    const t = rand() * TAU;
    const k = R + r * Math.cos(3 * t);
    const [jx, jy, jz] = jitter(0.3);
    put(a, i, k * Math.cos(2 * t) + jx, k * Math.sin(2 * t) + jy, r * Math.sin(3 * t) + jz);
  }
  return a;
}

// Experience: spiral galaxy (xz plane, tilted towards the camera by the group)
function shapeGalaxy() {
  const a = new Float32Array(COUNT * 3);
  const arms = 3;
  for (let i = 0; i < COUNT; i++) {
    if (i % 10 === 0) {
      const [x, y, z] = jitter(0.7);
      put(a, i, x, y * 0.6, z);
      continue;
    }
    const r = Math.pow(rand(), 1.4) * 4.3 + 0.2;
    const ang = ((i % arms) / arms) * TAU + r * 1.15;
    const spread = () => Math.pow(rand(), 3) * (rand() < 0.5 ? 1 : -1) * (0.25 + r * 0.18);
    put(a, i, Math.cos(ang) * r + spread(), spread() * 0.6, Math.sin(ang) * r + spread());
  }
  return a;
}

// Skills: DNA double helix
function shapeHelix() {
  const a = new Float32Array(COUNT * 3);
  const H = 6.6, turns = 2.2, R = 1.3, rungs = 28;
  for (let i = 0; i < COUNT; i++) {
    if (rand() < 0.68) {
      const t = rand();
      const ang = t * turns * TAU + (i % 2) * Math.PI;
      const [jx, jy, jz] = jitter(0.12);
      put(a, i, Math.cos(ang) * R + jx, (t - 0.5) * H + jy, Math.sin(ang) * R + jz);
    } else {
      const t = (Math.floor(rand() * rungs) + 0.5) / rungs;
      const ang = t * turns * TAU;
      const f = rand() * 2 - 1;
      const [jx, jy, jz] = jitter(0.05);
      put(a, i, Math.cos(ang) * R * f + jx, (t - 0.5) * H + jy, Math.sin(ang) * R * f + jz);
    }
  }
  return a;
}

// Education: tesseract (4D hypercube projection)
function shapeTesseract() {
  const a = new Float32Array(COUNT * 3);
  const corners = [];
  for (let n = 0; n < 8; n++) corners.push([n & 1 ? 1 : -1, n & 2 ? 1 : -1, n & 4 ? 1 : -1]);
  const edges = [];
  for (let p = 0; p < 8; p++) {
    for (let q = p + 1; q < 8; q++) {
      const diff = p ^ q;
      if (diff === 1 || diff === 2 || diff === 4) {
        edges.push([corners[p], corners[q], 1.9]);
        edges.push([corners[p], corners[q], 0.95]);
      }
    }
    edges.push([corners[p].map(v => v * 1.9), corners[p].map(v => v * 0.95), 1]);
  }
  for (let i = 0; i < COUNT; i++) {
    const [from, to, s] = edges[Math.floor(rand() * edges.length)];
    const f = rand();
    const [jx, jy, jz] = jitter(0.07);
    put(a, i,
      (from[0] + (to[0] - from[0]) * f) * s + jx,
      (from[1] + (to[1] - from[1]) * f) * s + jy,
      (from[2] + (to[2] - from[2]) * f) * s + jz);
  }
  return a;
}

// Contact: glowing portal ring with a vortex inside
function shapePortal() {
  const a = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    if (rand() < 0.55) {
      const ang = rand() * TAU;
      const [jx, jy, jz] = jitter(0.22);
      put(a, i, Math.cos(ang) * (2.5 + jx), jy, Math.sin(ang) * (2.5 + jz));
    } else {
      const r = Math.sqrt(rand()) * 2.3;
      const ang = rand() * TAU + r * 2.2;
      put(a, i, Math.cos(ang) * r, -Math.pow((2.4 - r) / 2.4, 2) * 2.2, Math.sin(ang) * r);
    }
  }
  return a;
}

// --- Section configuration ---
const SECTIONS = {
  hero: { shape: shapeGlobe(), tilt: 0.2, opacity: 1, anchor: '.avatar-wrapper' },
  projects: { shape: shapeKnot(), tilt: 0, opacity: 0.6 },
  experience: { shape: shapeGalaxy(), tilt: 1.05, opacity: 0.65 },
  skills: { shape: shapeHelix(), tilt: 0, opacity: 0.4 },
  education: { shape: shapeTesseract(), tilt: 0.45, opacity: 0.65 },
  contact: { shape: shapePortal(), tilt: 1.15, opacity: 0.8 }
};

// --- Shaders ---
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uMouseStrength;
  uniform float uScroll;
  uniform float uClickTime;
  uniform float uGlow;
  uniform vec3 uMouse;
  uniform vec3 uClickPos;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Staggered morph: each particle starts at a slightly different moment
    float m = clamp(uMorph * 1.4 - aRandom * 0.4, 0.0, 1.0);
    m = m * m * (3.0 - 2.0 * m);
    vec3 p = mix(aFrom, aTo, m);

    // Particles burst outwards mid-morph, then settle into the new shape
    float burst = sin(m * 3.14159265);
    p += normalize(p + vec3(0.0001)) * burst * (0.4 + aRandom * 1.2);

    // Organic breathing, amplified by scroll speed
    float amp = 0.04 + uScroll * 0.35;
    p += amp * vec3(
      sin(uTime * 0.9 + aRandom * 40.0 + p.y * 1.7),
      cos(uTime * 0.8 + aRandom * 30.0 + p.x * 1.7),
      sin(uTime * 0.7 + aRandom * 20.0 + p.z * 1.7)
    );

    vec4 world = modelMatrix * vec4(p, 1.0);

    // Mouse repulsion
    vec2 toMouse = world.xy - uMouse.xy;
    float force = (1.0 - smoothstep(0.0, 1.8, length(toMouse))) * uMouseStrength;
    world.xy += normalize(toMouse + 0.0001) * force * 0.9;

    // Click shockwave
    vec2 toClick = world.xy - uClickPos.xy;
    float age = uTime - uClickTime;
    float wave = exp(-pow(length(toClick) - age * 5.0, 2.0) * 3.0) * exp(-age * 1.4);
    world.xy += normalize(toClick + 0.0001) * wave * 0.7;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.35 + aRandom) * uPixelRatio / -mv.z * (1.0 + force * 0.8 + wave * 1.5);

    vec3 col = mix(uColorA, uColorB, smoothstep(-2.5, 2.5, p.y + p.x * 0.4));
    col = mix(col, uColorC, step(0.86, aRandom));
    vColor = col + (force * 0.35 + wave * 0.6) * uGlow;
    vAlpha = 0.25 + 0.6 * aRandom + force * 0.3;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = pow(1.0 - d * 2.0, 1.6);
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

const dustVertexShader = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aRandom;
  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.4 + aRandom) * uPixelRatio / -mv.z;
    vAlpha = 0.2 + 0.5 * aRandom;
  }
`;

const dustFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, (1.0 - d * 2.0) * vAlpha * uOpacity);
  }
`;

function init() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  } catch (e) {
    canvas.remove();
    return;
  }

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  const CAM_Z = 9;
  camera.position.set(0, 0, CAM_Z);

  // --- Main morphing particle system ---
  const randoms = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) randoms[i] = rand();

  const geometry = new THREE.BufferGeometry();
  const fromAttr = new THREE.BufferAttribute(shapeCloud(), 3);
  const toAttr = new THREE.BufferAttribute(new Float32Array(SECTIONS.hero.shape), 3);
  geometry.setAttribute('position', toAttr); // three.js needs a position attribute for draw range
  geometry.setAttribute('aFrom', fromAttr);
  geometry.setAttribute('aTo', toAttr);
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uSize: { value: isSmall ? 30 : 38 },
    uPixelRatio: { value: pixelRatio },
    uMouseStrength: { value: 0 },
    uScroll: { value: 0 },
    uClickTime: { value: -100 },
    uGlow: { value: 1 },
    uOpacity: { value: 1 },
    uMouse: { value: new THREE.Vector3(99, 99, 0) },
    uClickPos: { value: new THREE.Vector3() },
    uColorA: { value: new THREE.Color() },
    uColorB: { value: new THREE.Color() },
    uColorC: { value: new THREE.Color() }
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  // --- Ambient star dust for depth ---
  const DUST = isSmall ? 500 : 1400;
  const dustPos = new Float32Array(DUST * 3);
  const dustRnd = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    put(dustPos, i, (rand() - 0.5) * 34, (rand() - 0.5) * 22, (rand() - 0.5) * 16 - 4);
    dustRnd[i] = rand();
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute('aRandom', new THREE.BufferAttribute(dustRnd, 1));
  const dustUniforms = {
    uSize: { value: 22 },
    uPixelRatio: { value: pixelRatio },
    uColor: { value: new THREE.Color() },
    uOpacity: { value: 1 }
  };
  const dustMaterial = new THREE.ShaderMaterial({
    uniforms: dustUniforms,
    vertexShader: dustVertexShader,
    fragmentShader: dustFragmentShader,
    transparent: true,
    depthWrite: false
  });
  const dust = new THREE.Points(dustGeo, dustMaterial);
  scene.add(dust);

  // --- Theme handling ---
  function applyPalette() {
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const p = PALETTES[theme];
    uniforms.uColorA.value.set(p.a);
    uniforms.uColorB.value.set(p.b);
    uniforms.uColorC.value.set(p.c);
    uniforms.uGlow.value = p.glow;
    dustUniforms.uColor.value.set(p.b);
    dustUniforms.uOpacity.value = theme === 'light' ? 0.5 : 1;
    material.blending = p.blending;
    dustMaterial.blending = p.blending;
    material.needsUpdate = true;
    dustMaterial.needsUpdate = true;
  }
  applyPalette();
  new MutationObserver(applyPalette).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // --- Morph state (a new target queues until the running morph finishes) ---
  let morphing = true;
  let currentShape = SECTIONS.hero.shape;
  let pendingShape = null;

  function morphTo(shape) {
    if (morphing) {
      pendingShape = shape;
      return;
    }
    if (shape === currentShape) return;
    fromAttr.array.set(toAttr.array);
    toAttr.array.set(shape);
    fromAttr.needsUpdate = true;
    toAttr.needsUpdate = true;
    uniforms.uMorph.value = 0;
    currentShape = shape;
    morphing = true;
  }

  // --- Active section detection ---
  const sectionEls = Object.keys(SECTIONS).map(id => document.getElementById(id)).filter(Boolean);
  let activeId = 'hero';

  function updateActiveSection() {
    const mid = window.innerHeight * 0.5;
    for (const el of sectionEls) {
      const r = el.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        if (el.id !== activeId) {
          activeId = el.id;
          morphTo(SECTIONS[activeId].shape);
        }
        return;
      }
    }
  }

  // --- Input: pointer, click, scroll ---
  const pointer = { x: 0, y: 0, active: false };
  const mouseWorld = new THREE.Vector3(99, 99, 0);
  const tmp = new THREE.Vector3();

  function screenToWorld(clientX, clientY, target) {
    tmp.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1, 0.5).unproject(camera);
    tmp.sub(camera.position).normalize();
    const t = -camera.position.z / tmp.z;
    return target.copy(camera.position).addScaledVector(tmp, t);
  }

  if (!reduceMotion) {
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    }, { passive: true });

    document.addEventListener('pointerleave', () => { pointer.active = false; });

    window.addEventListener('pointerdown', (e) => {
      screenToWorld(e.clientX, e.clientY, uniforms.uClickPos.value);
      uniforms.uClickTime.value = uniforms.uTime.value;
    }, { passive: true });
  }

  let lastScrollY = window.scrollY;
  let scrollSpeed = 0;

  // --- Resize ---
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }
  window.addEventListener('resize', onResize);

  // --- Group target (hero follows the avatar on screen, others are centred) ---
  const targetPos = new THREE.Vector3();
  const anchorEl = document.querySelector(SECTIONS.hero.anchor);

  function computeTarget() {
    const cfg = SECTIONS[activeId];
    if (activeId === 'hero' && anchorEl) {
      const r = anchorEl.getBoundingClientRect();
      const worldPerPx = (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CAM_Z) / window.innerHeight;
      targetPos.set(
        (r.left + r.width / 2 - window.innerWidth / 2) * worldPerPx,
        -(r.top + r.height / 2 - window.innerHeight / 2) * worldPerPx,
        0
      );
      // Globe radius ~1.5x the avatar half-size
      return { scale: (r.width / 2) * 1.5 * worldPerPx / 2.2, tilt: cfg.tilt, opacity: cfg.opacity };
    }
    targetPos.set(0, 0, 0);
    const fit = Math.min(1, camera.aspect / 1.2);
    return { scale: Math.max(fit, 0.55), tilt: cfg.tilt, opacity: cfg.opacity };
  }

  // --- Render loop ---
  let last = performance.now();
  const motion = reduceMotion ? 0 : 1;

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    uniforms.uTime.value += dt * motion;

    updateActiveSection();

    // Morph progress
    if (morphing) {
      uniforms.uMorph.value = Math.min(uniforms.uMorph.value + dt / MORPH_DURATION, 1);
      if (uniforms.uMorph.value >= 1) {
        morphing = false;
        if (pendingShape) {
          const next = pendingShape;
          pendingShape = null;
          morphTo(next);
        }
      }
    }

    // Scroll speed drives turbulence and a little extra spin
    const sy = window.scrollY;
    const delta = sy - lastScrollY;
    lastScrollY = sy;
    scrollSpeed += (Math.min(Math.abs(delta) / (dt || 0.016) / 3000, 1) - scrollSpeed) * 0.08;
    uniforms.uScroll.value = scrollSpeed * motion;

    // Group placement
    const t = computeTarget();
    const ease = reduceMotion ? 1 : 1 - Math.pow(0.02, dt);
    group.position.lerp(targetPos, ease);
    const s = THREE.MathUtils.lerp(group.scale.x, t.scale, ease);
    group.scale.setScalar(s);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, t.tilt, ease);
    group.rotation.y += (dt * 0.12 + delta * 0.0015) * motion;
    uniforms.uOpacity.value = THREE.MathUtils.lerp(uniforms.uOpacity.value, t.opacity, ease);

    // Mouse in world space
    if (pointer.active) screenToWorld(pointer.x, pointer.y, mouseWorld);
    uniforms.uMouse.value.lerp(mouseWorld, 0.2);
    uniforms.uMouseStrength.value += ((pointer.active ? 1 : 0) - uniforms.uMouseStrength.value) * 0.05;

    // Gentle camera parallax
    if (pointer.active) {
      const px = (pointer.x / window.innerWidth - 0.5) * 0.6;
      const py = (pointer.y / window.innerHeight - 0.5) * 0.4;
      camera.position.x += (px - camera.position.x) * 0.04;
      camera.position.y += (-py - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
    }

    dust.rotation.y += dt * 0.01 * motion;
    dust.rotation.x = sy * 0.00015;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  canvas.classList.add('is-ready');
  requestAnimationFrame(tick);
}

init();
