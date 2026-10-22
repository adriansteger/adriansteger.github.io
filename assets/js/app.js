/**
 * ADRIAN STEGER - PORTFOLIO 2026
 * Interactive Logic, Multilingual i18n Engine (DE/EN), Theme & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- i18n Translation Dictionary ---
  const translations = {
    de: {
      // Accessibility
      skip_link: 'Zum Inhalt springen',
      aria_nav: 'Hauptnavigation',
      aria_theme: 'Design umschalten (Dark/Light)',
      aria_lang: 'Sprachauswahl',
      aria_menu: 'Menü öffnen',

      // Navigation
      nav_about: 'Über mich',
      nav_experience: 'Werdegang',
      nav_projects: 'Projekte',
      nav_skills: 'Skills & Tech',
      nav_edu: 'Ausbildung',
      nav_contact: 'Kontakt',
      
      // Hero
      hero_status: 'Offen für Festanstellungen in Zürich & Remote',
      hero_greeting: 'Hallo, ich bin',
      hero_role: 'Fullstack Software-Developer & Gründer',
      hero_bio: 'Vielseitiger Software-Entwickler mit Schwerpunkt auf modernen .NET-Technologien (C#, .NET Core, Azure Functions), PHP und Frontend-Frameworks (React, TypeScript). Nachgewiesene Erfolge in agiler Entwicklung, Systemarchitektur und Einführung moderner Workflows (Docker, KI).',
      hero_btn_projects: 'Projekte ansehen',
      hero_btn_contact: 'Kontakt aufnehmen',
      hero_badge_exp_label: 'Erfahrung',
      hero_badge_exp_val: '12+ Jahre Dev',
      hero_badge_focus_label: 'Schwerpunkt',
      hero_badge_focus_val: '.NET, PHP & React',
      
      // Impact Metrics
      metric_1_num: '12+',
      metric_1_lbl: 'Jahre Web- & Software-Entwicklung (seit 2012)',
      metric_2_num: '-22%',
      metric_2_lbl: 'SMS-Betriebskosten gesenkt (Careanesth)',
      metric_3_num: '6k+',
      metric_3_lbl: 'Fahrzeugdaten automatisiert (Ascotech)',
      metric_4_num: 'SaaS',
      metric_4_lbl: 'Job-CRM Resumate.ch gegründet & gebaut',

      // Section Titles & Subtitles
      sec_exp_tag: 'Karriere & Erfahrung',
      sec_exp_title: 'Beruflicher Werdegang',
      sec_exp_desc: 'Von der Fullstack-Entwicklung komplexer Enterprise-Systeme bis zum Aufbau eigener cloud-basierter SaaS-Lösungen.',
      
      sec_projects_tag: 'Showcase & Case Studies',
      sec_projects_title: 'Ausgewählte Projekte',
      sec_projects_desc: 'Ein Einblick in aktuelle Produktentwicklungen, Enterprise-Architekturen und Automatisierungs-Systeme.',

      sec_skills_tag: 'Technologie-Stack',
      sec_skills_title: 'Skills & Expertise',
      sec_skills_desc: 'Moderne Tools, Frameworks und Paradigmen, die ich in der täglichen Entwicklung einsetze.',

      sec_edu_tag: 'Qualifikationen',
      sec_edu_title: 'Ausbildung, Zertifikate & Sprachen',
      sec_edu_desc: 'Informatik-Grundlagen, stetige Weiterbildung und mehrsprachige Kommunikation.',

      sec_contact_tag: 'Kontakt',
      sec_contact_title: 'In Kontakt treten',
      sec_contact_desc: 'Interesse an einer Zusammenarbeit oder einer spannenden Festanstellung? Ich freue mich auf Ihre Nachricht via LinkedIn.',

      // Projects
      badge_live: 'Live in Production',
      proj_resumate_cat: 'Eigenes SaaS / Job-CRM Platform',
      proj_resumate_title: 'Resumate.ch – Modernes Job-CRM & Matching',
      proj_resumate_desc: 'Eigenverantwortliche Konzeption, Architekturplanung und Fullstack-Entwicklung eines modernen Job-CRMs und Matchmaking-Portals für den Schweizer Arbeitsmarkt.',
      proj_resumate_f1: 'Reaktives Frontend mit React, TypeScript und intuitivem Talent-Pipeline-Management',
      proj_resumate_f2: 'Skalierbares Backend mit Node.js, Supabase, PostgreSQL & Row-Level-Security',
      proj_resumate_f3: 'Automatisierte Parser & Algorithmen zur Profil- und Stellenanzeigen-Analyse',
      btn_visit_live: 'Live-Plattform öffnen',

      proj_careanesth_cat: 'Enterprise Platform & Healthcare Cloud',
      proj_careanesth_title: 'Careanesth AG – Enterprise APIs, Integrationen & SMS-Engine',
      proj_careanesth_desc: 'Entwicklung und Wartung hochverfügbarer APIs, Parser und Fullstack-Anwendungen im agilen Scrum/Jira-Umfeld im Healthcare-Personalbereich.',
      proj_careanesth_f1: 'Entwicklung eines robusten SMS-Versandsystems mit Error-Handling (-22% Versandkosten)',
      proj_careanesth_f2: 'C#/.NET Core, Entity Framework, Azure Functions und PHP/ProcessWire mit MSSQL & MySQL',
      proj_careanesth_f3: 'Proaktive Einführung moderner Technologien wie Docker, WSL2 und KI-Entwicklungs-Tools',
      proj_careanesth_f4: 'Schnittstellen zu Buchungssystemen und SMS-Providern',

      proj_ascotech_cat: 'Automatisierung & E-Commerce',
      proj_ascotech_title: 'Ascotech – Web-Scraper & E-Commerce Engine',
      proj_ascotech_desc: 'Entwicklung massgeschneiderter E-Commerce-Plattformen und hochperformanter Web-Scraper zur automatisierten Datenverarbeitung und Synchronisation.',
      proj_ascotech_f1: 'High-Throughput Parser zur automatisierten Verarbeitung von über 6.000 Fahrzeugdatensätzen',
      proj_ascotech_f2: 'Custom REST APIs und Schnittstellen-Integration mit WordPress / WooCommerce',
      proj_ascotech_f3: 'Eigenverantwortliche Leitung von Kundenprojekten und Koordination externer Freelancer',

      proj_techtuning_title: 'Techtuning.ch – E-Commerce & Konfigurator',
      proj_techtuning_desc: 'E-Commerce Plattform mit spezialisiertem 4-Stufen-Fahrzeugfilter (Marke, Modell, Jahrgang, Treibstoff) und automatisiertem Datenbezug via Scraper.',
      
      proj_client_title: 'Diverse Web- & KMU-Projekte',
      proj_client_desc: 'Entwicklung responsiver Web-Präsenzen, Corporate Identities und massgeschneiderter E-Commerce-Lösungen (u.a. Die Pizza Italia, GGF Getränke, MS Records).',

      // Experience Timeline
      tech_stack_label: 'Tech-Stack:',
      exp_role_1: 'Software-Developer & Gründer (Freelance)',
      exp_company_1: 'Ascotech & Resumate.ch | Zürich',
      exp_date_1: '05/2025 – Heute',
      exp_b1_1: 'Entwicklung und Architekturplanung des eigenen Job-CRMs (Resumate.ch) mit Node.js, React und Supabase.',
      exp_b1_2: 'Umsetzung anspruchsvoller Kundenprojekte unter Nutzung von modernen Web-Technologien und PHP.',

      exp_role_2: 'Full-Stack-Entwickler',
      exp_company_2: 'Careanesth AG | Zürich',
      exp_date_2: '10/2021 – 05/2025',
      exp_b2_1: 'Entwicklung und Wartung von APIs, Parsern und Fullstack-Anwendungen im agilen Umfeld (Scrum/Jira).',
      exp_b2_2: 'Entwicklung eines robusten SMS-Versandsystems inklusive Error-Handling, wodurch die SMS-Kosten um 22% gesenkt wurden.',
      exp_b2_3: 'Proaktive Einführung moderner Technologien (Docker, WSL, KI-Tools), um Architektur und Workflows zukunftssicher aufzustellen.',
      exp_b2_4: 'Entwicklung von Schnittstellen zu Drittsystemen wie Buchungssystemen und SMS-Providern.',
      exp_b2_5: 'Code-Reviews, technische Dokumentation sowie Mitgestaltung der technischen Planung neuer Projekte und Best Practices.',
      exp_b2_6: 'Unterstützung des 2nd-Level-Supports mit aktiver Fehleranalyse und -behebung.',

      exp_role_3: 'Freelance-Tätigkeit & Weiterbildung',
      exp_company_3: 'Selbstständig | Zürich',
      exp_date_3: '05/2020 – 10/2021',
      exp_b3_1: 'Umsetzung diverser Freelance-Projekte (PHP, JavaScript, Node.js, C#).',
      exp_b3_2: 'Intensives Selbststudium und Vertiefung aktueller Web- und Framework-Technologien.',

      exp_role_4: 'CEO & Web-Developer',
      exp_company_4: 'Ascotech Multimedia LTD | Schlieren',
      exp_date_4: '12/2016 – 05/2020',
      exp_b4_1: 'Entwicklung komplexer E-Commerce-Plattformen, massgeschneiderter APIs sowie eigener Plugins und Themes.',
      exp_b4_2: 'Programmierung eines leistungsstarken Web-Scrapers/Parsers zur automatisierten Verarbeitung von über 6.000 Fahrzeugdatensätzen.',
      exp_b4_3: 'Eigenverantwortliche Leitung von Kundenprojekten und erfolgreiche Koordination externer Freelancer.',

      exp_role_5: 'Webmaster & Social Media Specialist',
      exp_company_5: 'GGF Getränke | Zürich',
      exp_date_5: '11/2018 – 09/2019',
      exp_b5_1: 'Aufbau und Weiterentwicklung der E-Commerce-Infrastruktur durch Custom-Plugins und Themes.',
      exp_b5_2: 'Nachweisbare Steigerung der Conversion Rate durch gezielte Datenanalyse und technische Shop-Optimierungen.',
      exp_b5_3: 'Planung und Umsetzung des neuen Online-Shops inklusive Datenübernahme.',
      exp_b5_4: 'Markt-, Website- und Wettbewerbsanalysen sowie Reichweitenmessung von Website, Newslettern und Shop; Steuerung externer Dienstleister.',

      exp_role_6: 'Web-Developer & Designer (Freelance)',
      exp_company_6: 'Selbstständig / für Henninger IT | Zürich',
      exp_date_6: '07/2012 – 12/2016',
      exp_b6_1: 'Freelance-Tätigkeit: Webdesign, Grafikdesign und Webseiten-Entwicklung.',

      // Skills Headers
      skill_cat_backend: 'Backend & Cloud',
      skill_cat_frontend: 'Frontend & UI',
      skill_cat_db: 'Datenbanken',
      skill_cat_devops: 'DevOps, Tools & Workflows',
      skill_cat_cms: 'CMS & E-Commerce',
      skill_cat_methodology: 'Architektur & Methoden',
      skills_globe_hint: 'Globus ziehen zum Drehen – oder mit der Maus über einen Skill unten fahren',

      // Education & Languages
      edu_title_card: 'Ausbildung & Zertifikate',
      lang_title_card: 'Sprachen & Sonstiges',
      edu_cert_1: 'Certified Javascript Developer',
      edu_cert_1_org: 'W3Schools (2021)',
      edu_efz: 'Basislehrjahr Informatiker EFZ (1. Lehrjahr)',
      edu_efz_org: 'Schweiz (2013 – 2014)',
      edu_cont: 'Kontinuierliche Weiterbildung & Selbststudium',
      edu_cont_desc: 'Modernes .NET 8 / C#, React & TypeScript, Cloud-Architektur, Docker (Seit 2017) | KI-gestützte Entwicklung & Tools (Seit 2022)',
      
      lang_de: 'Deutsch',
      lang_de_lvl: 'Muttersprache (C2)',
      lang_en: 'Englisch',
      lang_en_lvl: 'Verhandlungssicher (C1)',
      lang_es: 'Spanisch',
      lang_es_lvl: 'Zweite Muttersprache (Mündlich C2 / Schriftlich B2)',
      other_info: 'Führerschein: Kat. B, A1 | Hobbys: Fussball, Reisen, Software-Entwicklung',

      // Contact
      contact_location_label: 'Standort',
      contact_location_val: 'Schlieren / Zürich, Schweiz',
      contact_location_pill: 'Wohnhaft in der Schweiz',
      contact_linkedin_btn: 'Nachricht auf LinkedIn senden',
      contact_github_btn: 'Profil ansehen',

      footer_text: '© 2026 Adrian Steger. Entwickelt mit Vanilla HTML5, CSS3, JavaScript & Three.js.'
    },

    en: {
      // Accessibility
      skip_link: 'Skip to content',
      aria_nav: 'Main navigation',
      aria_theme: 'Toggle theme (dark/light)',
      aria_lang: 'Language selection',
      aria_menu: 'Open menu',

      // Navigation
      nav_about: 'About',
      nav_experience: 'Experience',
      nav_projects: 'Projects',
      nav_skills: 'Skills & Tech',
      nav_edu: 'Education',
      nav_contact: 'Contact',
      
      // Hero
      hero_status: 'Open for Fullstack & .NET Roles in Zurich & Remote',
      hero_greeting: 'Hello, I am',
      hero_role: 'Fullstack Software Developer & Founder',
      hero_bio: 'Versatile software engineer specializing in modern .NET technologies (C#, .NET Core, Azure Functions), PHP, and frontend frameworks (React, TypeScript). Proven track record in agile engineering, robust systems architecture, and modern workflows (Docker, AI tools).',
      hero_btn_projects: 'View Projects',
      hero_btn_contact: 'Get in Touch',
      hero_badge_exp_label: 'Experience',
      hero_badge_exp_val: '12+ Years Dev',
      hero_badge_focus_label: 'Core Focus',
      hero_badge_focus_val: '.NET, PHP & React',
      
      // Impact Metrics
      metric_1_num: '12+',
      metric_1_lbl: 'Years Software & Web Engineering (Since 2012)',
      metric_2_num: '-22%',
      metric_2_lbl: 'SMS Operating Costs Reduced (Careanesth)',
      metric_3_num: '6k+',
      metric_3_lbl: 'Automotive Records Parsed (Ascotech)',
      metric_4_num: 'SaaS',
      metric_4_lbl: 'Job-CRM Resumate.ch Architected & Founded',

      // Section Titles & Subtitles
      sec_exp_tag: 'Career & Milestones',
      sec_exp_title: 'Professional Experience',
      sec_exp_desc: 'From fullstack development of complex enterprise healthcare systems to founding cloud-native SaaS platforms.',
      
      sec_projects_tag: 'Showcase & Case Studies',
      sec_projects_title: 'Featured Projects',
      sec_projects_desc: 'An overview of production software, cloud architectures, and automated data engines.',

      sec_skills_tag: 'Tech Stack & Tooling',
      sec_skills_title: 'Skills & Expertise',
      sec_skills_desc: 'Modern programming languages, cloud frameworks, and methodologies used in my daily work.',

      sec_edu_tag: 'Qualifications',
      sec_edu_title: 'Education, Certifications & Languages',
      sec_edu_desc: 'Computer science foundation, continuous specialization, and multilingual communication.',

      sec_contact_tag: 'Let’s Connect',
      sec_contact_title: 'Get in Touch',
      sec_contact_desc: 'Looking for a skilled developer for your team or have an exciting fullstack role? I look forward to your message on LinkedIn.',

      // Projects
      badge_live: 'Live in Production',
      proj_resumate_cat: 'Proprietary SaaS / Job-CRM Platform',
      proj_resumate_title: 'Resumate.ch – Modern Job-CRM & Matching',
      proj_resumate_desc: 'Architected, designed, and built a fullstack talent matchmaking and candidate CRM platform tailored for the Swiss job market.',
      proj_resumate_f1: 'Reactive frontend built with React, TypeScript, and intuitive talent pipeline kanban management',
      proj_resumate_f2: 'Scalable backend with Node.js, Supabase, PostgreSQL, and Row-Level-Security (RLS)',
      proj_resumate_f3: 'Automated data parsers and matching algorithms for resume and vacancy analysis',
      btn_visit_live: 'Launch Live Platform',

      proj_careanesth_cat: 'Enterprise Platform & Healthcare Cloud',
      proj_careanesth_title: 'Careanesth AG – Enterprise APIs, Integrations & SMS Engine',
      proj_careanesth_desc: 'Development and maintenance of high-throughput APIs, data parsers, and fullstack applications in an agile Scrum/Jira healthcare staffing environment.',
      proj_careanesth_f1: 'Engineered a resilient SMS dispatch engine with advanced error handling (-22% messaging costs)',
      proj_careanesth_f2: 'C#/.NET Core, Entity Framework, Azure Functions and PHP/ProcessWire with MSSQL & MySQL',
      proj_careanesth_f3: 'Proactively introduced Docker containerization, WSL2, and AI-assisted workflows',
      proj_careanesth_f4: 'Integrations with booking systems and SMS providers',

      proj_ascotech_cat: 'Automation & E-Commerce',
      proj_ascotech_title: 'Ascotech – Web Scraper & E-Commerce Engine',
      proj_ascotech_desc: 'Engineered custom E-Commerce architectures and high-volume automated scrapers for real-time inventory synchronization.',
      proj_ascotech_f1: 'High-throughput parser automating ETL pipelines for 6,000+ automotive vehicle records',
      proj_ascotech_f2: 'Custom REST APIs and backend integrations with WordPress / WooCommerce',
      proj_ascotech_f3: 'Managed end-to-end client deliverables and coordinated specialized external engineers',

      proj_techtuning_title: 'Techtuning.ch – E-Commerce & Configurator',
      proj_techtuning_desc: 'E-Commerce store featuring a custom 4-tier automotive compatibility filter (Make, Model, Year, Fuel) and automated scraping pipelines.',
      
      proj_client_title: 'Client Web Platforms & KMU Solutions',
      proj_client_desc: 'Engineered responsive web applications, corporate brandings, and tailored e-commerce platforms (Die Pizza Italia, GGF Drinks, MS Records).',

      // Experience Timeline
      tech_stack_label: 'Tech Stack:',
      exp_role_1: 'Software Developer & Founder (Freelance)',
      exp_company_1: 'Ascotech & Resumate.ch | Zurich',
      exp_date_1: '05/2025 – Present',
      exp_b1_1: 'Architected and developed proprietary Job-CRM platform (Resumate.ch) with Node.js, React, and Supabase.',
      exp_b1_2: 'Delivered high-standard client software solutions leveraging modern web stacks and PHP.',

      exp_role_2: 'Full-Stack Developer',
      exp_company_2: 'Careanesth AG | Zurich',
      exp_date_2: '10/2021 – 05/2025',
      exp_b2_1: 'Development and maintenance of APIs, parsers, and fullstack applications in an agile Scrum/Jira environment.',
      exp_b2_2: 'Engineered a robust SMS dispatch engine with automated failover, reducing messaging expenses by 22%.',
      exp_b2_3: 'Proactively championed adoption of modern tooling (Docker, WSL2, AI coding tools) to optimize workflows.',
      exp_b2_4: 'Built integrations with third-party systems such as booking platforms and SMS providers.',
      exp_b2_5: 'Conducted code reviews, wrote technical documentation, and helped shape technical planning of new projects and best practices.',
      exp_b2_6: 'Supported 2nd-level support with hands-on root-cause analysis and bug fixing.',

      exp_role_3: 'Freelance Software Developer & Studies',
      exp_company_3: 'Independent | Zurich',
      exp_date_3: '05/2020 – 10/2021',
      exp_b3_1: 'Built and shipped various client solutions using PHP, JavaScript, Node.js, and C#.',
      exp_b3_2: 'Deepened proficiency in modern web architecture, async programming, and cloud frameworks.',

      exp_role_4: 'CEO & Web Developer',
      exp_company_4: 'Ascotech Multimedia LTD | Schlieren',
      exp_date_4: '12/2016 – 05/2020',
      exp_b4_1: 'Built complex E-Commerce platforms, custom REST APIs, and bespoke plugins/themes.',
      exp_b4_2: 'Engineered high-performance web scraper/parser pipeline processing 6,000+ vehicle records.',
      exp_b4_3: 'Led client technical roadmaps and coordinated cross-functional external engineering talent.',

      exp_role_5: 'Webmaster & Social Media Specialist',
      exp_company_5: 'GGF Drinks | Zurich',
      exp_date_5: '11/2018 – 09/2019',
      exp_b5_1: 'Scaled e-commerce infrastructure with custom plugins and performance enhancements.',
      exp_b5_2: 'Achieved measurable conversion rate growth through targeted analytics and technical optimizations.',
      exp_b5_3: 'Planned and launched the new online shop including data migration.',
      exp_b5_4: 'Market, website and competitor analysis, reach tracking for website, newsletters and shop; managed external service providers.',

      exp_role_6: 'Web Developer & Designer (Freelance)',
      exp_company_6: 'Independent / Henninger IT | Zurich',
      exp_date_6: '07/2012 – 12/2016',
      exp_b6_1: 'Delivered freelance web development, interface design, and custom implementations.',

      // Skills Headers
      skill_cat_backend: 'Backend & Cloud',
      skill_cat_frontend: 'Frontend & UI',
      skill_cat_db: 'Databases',
      skill_cat_devops: 'DevOps, Tools & Workflows',
      skill_cat_cms: 'CMS & E-Commerce',
      skill_cat_methodology: 'Architecture & Methods',
      skills_globe_hint: 'Drag the globe to spin it – or hover a skill below',

      // Education & Languages
      edu_title_card: 'Education & Certifications',
      lang_title_card: 'Languages & Personal',
      edu_cert_1: 'Certified Javascript Developer',
      edu_cert_1_org: 'W3Schools (2021)',
      edu_efz: 'First-Year Apprenticeship / Foundation: Informatiker EFZ',
      edu_efz_org: 'Switzerland (2013 – 2014)',
      edu_cont: 'Continuous Self-Study & Specialization',
      edu_cont_desc: 'Modern .NET 8 / C#, React & TypeScript, Cloud Architecture, Docker (Since 2017) | AI-Assisted Development & Tools (Since 2022)',
      
      lang_de: 'German',
      lang_de_lvl: 'Native (C2)',
      lang_en: 'English',
      lang_en_lvl: 'Full Professional (C1)',
      lang_es: 'Spanish',
      lang_es_lvl: 'Second Native Language (Oral C2 / Written B2)',
      other_info: 'Driver License: Cat. B, A1 | Interests: Football, Travel, Software Engineering',

      // Contact
      contact_location_label: 'Location',
      contact_location_val: 'Schlieren / Zurich, Switzerland',
      contact_location_pill: 'Based in Switzerland',
      contact_linkedin_btn: 'Message me on LinkedIn',
      contact_github_btn: 'View profile',

      footer_text: '© 2026 Adrian Steger. Engineered with Vanilla HTML5, CSS3, JavaScript & Three.js.'
    }
  };

  // --- Safe localStorage access (may throw in private mode / blocked storage) ---
  function readStorage(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function writeStorage(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  // --- Current State ---
  // Language: ?lang=en in the URL wins (shareable links), then saved choice, then German
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  let currentLang = translations[urlLang] ? urlLang : (readStorage('adrian_portfolio_lang') || 'de');
  // Theme: already set by the inline script in <head> before first paint
  let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  // --- Theme Switcher Function ---
  const themeToggleBtn = document.getElementById('theme-toggle');

  function applyTheme(theme, persist) {
    if (theme !== 'light' && theme !== 'dark') theme = 'dark';
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) writeStorage('adrian_portfolio_theme', theme);
    if (themeToggleBtn) themeToggleBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  // --- Event Listener for Theme Toggle Button ---
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, true);
    });
  }

  // --- Language Switcher Function ---
  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'de';
    currentLang = lang;
    writeStorage('adrian_portfolio_lang', lang);

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Update all text content via data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        // Safe textContent update following security guidelines
        el.textContent = translations[lang][key];
      }
    });

    // Update attribute-based translations (e.g., aria-label, title)
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const config = el.getAttribute('data-i18n-attr');
      // Format: "attrName:translationKey"
      const parts = config.split(':');
      if (parts.length === 2) {
        const attr = parts[0];
        const key = parts[1];
        if (translations[lang] && translations[lang][key] !== undefined) {
          el.setAttribute(attr, translations[lang][key]);
        }
      }
    });
  }

  // --- Event Listeners for Language Buttons ---
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  // --- Mobile Menu Handler ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    const setMenuOpen = (open) => {
      navLinks.classList.toggle('open', open);
      mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    mobileMenuBtn.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('open'));
    });

    // Close menu when a navigation item is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    // Close menu on Escape and return focus to the toggle button
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenuOpen(false);
        mobileMenuBtn.focus();
      }
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        setMenuOpen(false);
      }
    });
  }

  // --- Scroll Header Effect ---
  const header = document.querySelector('.site-header');

  if (header) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // --- ScrollSpy: highlight the nav link of the section in view ---
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  // --- Motion Effects (skipped for reduced motion) ---
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 3D tilt with a cursor-following spotlight on cards
  if (!reduceMotion && finePointer) {
    document.querySelectorAll('.project-card, .skill-card, .metric-card, .contact-card, .sec-project-card, .timeline-card').forEach(card => {
      card.classList.add('tilt');
      const maxTilt = card.classList.contains('project-card') || card.classList.contains('timeline-card') ? 3 : 7;

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
        card.style.transition = 'transform 0.12s ease-out, border-color 0.3s, box-shadow 0.3s';
        card.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * maxTilt}deg) rotateY(${(x - 0.5) * maxTilt}deg) translateY(-4px)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transition = '';
        card.style.transform = '';
      });
    });
  }

  // Scroll reveal: fade cards in as they enter the viewport
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.section-header, .project-card, .sec-project-card, .timeline-item, .skill-card, .edu-card, .lang-card, .contact-card, .metric-card');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        revealObserver.unobserve(el);
        el.classList.add('is-visible');
        // Drop the reveal classes afterwards so the cards' own hover transitions apply again
        setTimeout(() => el.classList.remove('reveal', 'is-visible'), 900 + (parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0) * 1000);
      });
    }, { rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(el => {
      // Stagger siblings inside the same grid
      const siblings = [...el.parentElement.children].filter(c => c.matches(el.tagName.toLowerCase() + '.' + el.classList[0]));
      el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 5) * 0.08}s`);
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  // Count up impact metrics ("12+", "-22%", "6k+") when they come into view
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);
        const el = entry.target;
        const final = el.textContent;
        const match = final.match(/^(-?)(\d+)(.*)$/);
        if (!match) return;
        const target = parseInt(match[2], 10);
        const start = performance.now();
        const duration = 1400;

        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = t < 1 ? `${match[1]}${Math.round(target * eased)}${match[3]}` : final;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('.metric-number').forEach(el => countObserver.observe(el));
  }

  // --- Initialize Initial Theme & Language ---
  applyTheme(currentTheme, false);
  applyLanguage(currentLang);
});
