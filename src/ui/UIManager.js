import { AudioEngine } from '../audio/AudioEngine.js';

export class UIManager {
  constructor() {
    this.contentDiv = document.getElementById('story-content');
    this.choicesDiv = document.getElementById('choices-container');
    this.companionsDiv = document.getElementById('companions-list');
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalBody = document.getElementById('modal-body');
     this.vfxLayer = document.getElementById('vfx-layer');
     this.bgLayer = document.getElementById('bg-layer');
     this.container = document.getElementById('game-container');
     this.yugaIndicator = document.getElementById('yuga-indicator');
     this.audio = new AudioEngine();
     this.onChoiceSelected = null;
    
    this.lastStats = { karma: 50, dharma: 0, adharma: 10, essence: 100 };
    this.activeCompanions = [];
    this.currentYuga = 'kali';
    this.currentTitle = 'Chiranjeevis Eternal';
    this.currentBg = null;
    this.vfx = null;
    this.inVision = false;
    this.pendingVision = {}; // accumulates vision_* tags before overlay fires
    
    this.visionOverlay = document.getElementById('memory-vision-overlay');
    this.bgLayer = document.getElementById('bg-layer');
    
    // Default Settings
    this.settings = {
      volume: 50,
      atmosphere: true,
      grain: true,
      vfx: true,
      fontSize: 100
    };
    this.loadSettings();
    this.initParallax();
    this.init();

    this.allCompanions = [
      { id: 'parashurama', name: 'Parashurama', icon: '🪓', bio: 'The Sixth Avatar. The man with the axe who slaughtered twenty-one generations of corrupt kings. He awaits on Mahendra Mountain to train the final Avatar.' },
      { id: 'hanuman', name: 'Hanuman', icon: '🟠', bio: 'The God of Wind and Devotion. He has walked the earth for millennia, guarding the memories of the Treta Yuga and the glory of Rama.' },
      { id: 'vibhishana', name: 'Vibhishana', icon: '🛡️', bio: 'The wise king of Lanka who chose Dharma over blood. His knowledge of tactical warfare and the nature of Adharma is unmatched.' },
      { id: 'vyasa', name: 'Vyasa', icon: '📜', bio: 'The Sage of Sages. The chronicler of the Mahabharata. He knows every heartbeat of the universe, past and future.' },
      { id: 'bali', name: 'Mahabali', icon: '🏺', bio: 'The noble Asura king of the netherworld. Though banished to Sutala, he visits the earth once a year to ensure his people are happy.' },
      { id: 'kripacharya', name: 'Kripacharya', icon: '🏹', bio: 'The master of archery and military science. He is the royal Guru who outlived the great war of the Kuru dynasty.' },
      { id: 'ashwatthama', name: 'Ashwatthama', icon: '👁️', bio: 'The son of Drona, cursed with immortality and a gem that bleeds on his forehead. He seeks redemption through the sword of Kalki.' }
    ];
    
    this.initCompanionPanel();
    this.initModalHandlers();
    this.ensureNotificationLayer();
  }

  init() {
    // intentionally empty — initModalHandlers called explicitly in constructor
  }

  setVFX(vfxManager) {
    this.vfx = vfxManager;
  }

  ensureNotificationLayer() {
    if (!document.getElementById('notification-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'notification-overlay';
      document.body.appendChild(overlay);
    }
  }

  initVFX() {
    for (let i = 0; i < 80; i++) {
        this.createParticle('ash');
    }
  }

  createParticle(type = 'ash') {
    const p = document.createElement('div');
    p.className = `particle ${type}`;
    const size = type === 'ember' ? Math.random() * 4 + 2 : Math.random() * 5 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    const duration = type === 'ember' ? 8 + Math.random() * 5 : 15 + Math.random() * 10;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    
    if (size < 2.5) {
        p.style.zIndex = 4;
        p.style.filter = 'blur(1px)';
        p.style.opacity = type === 'ember' ? 0.4 : 0.35;
    } else {
        p.style.zIndex = 6;
        p.style.opacity = type === 'ember' ? 0.9 : 0.7;
    }

    this.vfxLayer.appendChild(p);
    setTimeout(() => {
        p.remove();
        this.createParticle(type);
    }, (duration + 10) * 1000);
  }

  spawnEmberBurst(count = 10) {
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle ember';
        p.style.width = '4px';
        p.style.height = '4px';
        p.style.left = `${40 + Math.random() * 20}vw`; 
        p.style.animationDuration = `${5 + Math.random() * 3}s`;
        this.vfxLayer.appendChild(p);
        setTimeout(() => p.remove(), 8000);
    }
  }

  initModalHandlers() {
    const helpBtn = document.getElementById('help-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const closeBtn = document.getElementById('modal-close');

    if (helpBtn) helpBtn.onclick = () => this.showMap();
    if (settingsBtn) settingsBtn.onclick = () => this.showSettings();
    if (closeBtn) closeBtn.onclick = () => this.hideModal();

    this.modalOverlay.onclick = (e) => {
      if (e.target === this.modalOverlay) this.hideModal();
    };
  }

  initParallax() {
    window.addEventListener('mousemove', (e) => {
      // Parallax
      if (this.bgLayer) {
        const px = (e.clientX / window.innerWidth - 0.5) * 20;
        const py = (e.clientY / window.innerHeight - 0.5) * 20;
        this.bgLayer.style.transform = `translate(${px}px, ${py}px) scale(1.05)`;
      }

      // Torchlight tracking
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (!this.bgLayer || !e.beta) return;
        const x = (e.gamma / 45) * 15;
        const y = ((e.beta - 45) / 45) * 15;
        this.bgLayer.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      });
    }
  }

  playChoiceImpact() {
    // Haptic
    if (navigator.vibrate) navigator.vibrate(15);

    // Procedural Selection Click
    if (this.audio && this.audio.audioContext) {
        const ctx = this.audio.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.05 * this.audio.masterVolume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }
  }

  setDistortion(active) {
    if (active) this.container.classList.add('distort-world');
    else this.container.classList.remove('distort-world');
  }

  showEndSummary(stats, activeCompanions) {
    this.modalOverlay.classList.remove('hidden-fade');
    const compIcons = this.allCompanions
      .filter(c => activeCompanions.includes(c.id))
      .map(c => `<span title="${c.name}" style="font-size: 2rem; margin: 0 5px; filter: drop-shadow(0 0 10px var(--c-gold));">${c.icon}</span>`)
      .join('');

    const dharmaState = stats.dharma > stats.adharma ? "BRIGHT" : "SHADOWED";
    // Use the Ink-set ending title if available, otherwise fall back to a stat-derived one
    const title = stats.title && stats.title !== 'Chiranjeevis Eternal'
      ? stats.title
      : this.currentTitle && this.currentTitle !== 'Chiranjeevis Eternal'
        ? this.currentTitle
        : (stats.dharma > stats.adharma ? "LEGEND OF THE SATYA YUGA" : "ECHO OF THE AGE OF KALI");

    this.modalBody.innerHTML = `
      <div style="text-align:center; padding: 1rem; max-width: 600px; margin: 0 auto;">
        <h2 class="modal-title" style="font-size: 2.2rem; color: var(--c-gold); text-shadow: 0 0 20px rgba(201, 168, 76, 0.4);">${title}</h2>
        <div style="margin: 1rem 0; letter-spacing: 3px; color: var(--c-text-muted); font-weight: 600;">ALIGNED WITH ${dharmaState} DHARMA</div>
        
        <div class="modal-section" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; margin-top: 2rem;">
          <h3 style="margin-bottom: 1.5rem; letter-spacing: 2px;">THE CHIRANJEEVIS ASSEMBLED</h3>
          <div style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1.5rem;">
             ${compIcons || '<div style="opacity:0.5">The path was walked alone.</div>'}
          </div>
          <p style="font-style: italic; font-size: 0.95rem; color: var(--c-gold); opacity: 0.8;">
            ${activeCompanions.length} of 7 Immortals recognized your spirit.
          </p>
        </div>

        <div class="modal-section" style="margin-top: 2rem;">
          <h3 style="letter-spacing: 2px;">COSMIC RESIDUE</h3>
          <div style="display: flex; justify-content: space-around; width: 100%; margin: 1.5rem 0; background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 8px;">
            <div style="text-align:center"><div style="color: var(--c-gold); font-size: 0.7rem; letter-spacing:1px;">KARMA</div><div style="font-size: 1.8rem; font-weight:bold;">${stats.karma}</div></div>
            <div style="text-align:center"><div style="color: #e07020; font-size: 0.7rem; letter-spacing:1px;">DHARMA</div><div style="font-size: 1.8rem; font-weight:bold;">${stats.dharma}</div></div>
            <div style="text-align:center"><div style="color: var(--c-adharma); font-size: 0.7rem; letter-spacing:1px;">ADHARMA</div><div style="font-size: 1.8rem; font-weight:bold;">${stats.adharma}</div></div>
          </div>
        </div>

        <div style="margin-top: 3rem; display: flex; flex-direction: column; gap: 1rem;">
          <button class="choice-btn" style="width: 100%;" onclick="localStorage.removeItem('chiranjeevis_eternal_save'); location.reload()">REGENERATE THE AGES (NEW GAME)</button>
          <button class="choice-btn" style="width: 100%; border-color: var(--c-text-muted); opacity: 0.7;" onclick="window._ui && window._ui.returnToLanding()">RETURN TO THE BEGINNING</button>
        </div>
      </div>
    `;
  }

  loadSettings() {
    const saved = localStorage.getItem('chiranjeevis_settings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
    this.applySettings();
  }

  saveSettings() {
    localStorage.setItem('chiranjeevis_settings', JSON.stringify(this.settings));
  }

  applySettings() {
    const vol = this.settings.volume / 100;

    // Master volume
    if (this.audio) {
      this.audio.masterVolume = vol;
      this.audio.setVolume(vol);
    }

    // Atmosphere (ambient drone on/off)
    if (this.audio && this.audio.layers && this.audio.layers.base && this.audio.layers.base.masterGain) {
      this.audio.layers.base.masterGain.gain.value = this.settings.atmosphere ? 0.15 * vol : 0;
    }
    if (this.audio && this.audio.layers && this.audio.layers.yuga && this.audio.layers.yuga.masterGain) {
      this.audio.layers.yuga.masterGain.gain.value = this.settings.atmosphere ? 0.20 * vol : 0;
    }

    // Film grain
    const grain = document.querySelector('.film-grain');
    if (grain) grain.style.display = this.settings.grain ? 'block' : 'none';

    // VFX particles
    if (this.vfx) this.vfx.active = this.settings.vfx;
    if (this.vfxLayer) this.vfxLayer.style.display = this.settings.vfx ? 'block' : 'none';

    // Font scale (applies via CSS calc on prose/choices)
    document.documentElement.style.setProperty('--font-size-scale', this.settings.fontSize / 100);
  }

  showSettings() {
    this.modalOverlay.classList.remove('hidden-fade');
    this.modalBody.innerHTML = `
      <h2 class="modal-title">SETTINGS</h2>
      <div class="modal-section">
        <h3>AUDIO</h3>
        <div class="setting-row">
          <span class="setting-label">Master Volume</span> 
          <input type="range" id="set-volume" min="0" max="100" value="${this.settings.volume}">
        </div>
        <div class="setting-row">
          <span class="setting-label">Ambient Drone</span> 
          <input type="checkbox" id="set-atmosphere" ${this.settings.atmosphere ? 'checked' : ''}>
        </div>
      </div>
      <div class="modal-section">
        <h3>VISUAL</h3>
        <div class="setting-row">
          <span class="setting-label">Film Grain</span> 
          <input type="checkbox" id="set-grain" ${this.settings.grain ? 'checked' : ''}>
        </div>
        <div class="setting-row">
          <span class="setting-label">Fly Ash & Embers</span> 
          <input type="checkbox" id="set-vfx" ${this.settings.vfx ? 'checked' : ''}>
        </div>
        <div class="setting-row">
          <span class="setting-label">Text Scale</span> 
          <input type="range" id="set-font-size" min="80" max="150" value="${this.settings.fontSize}">
        </div>
      </div>
      <div style="margin-top:2rem; text-align:center">
        <button id="modal-close-btn" class="choice-btn" style="width: auto; padding: 1rem 3rem;">RETURN TO JOURNEY</button>
      </div>
    `;

    this.attachSettingsListeners();
  }

  attachSettingsListeners() {
    const vol = document.getElementById('set-volume');
    const atm = document.getElementById('set-atmosphere');
    const grn = document.getElementById('set-grain');
    const vfx = document.getElementById('set-vfx');
    const close = document.getElementById('modal-close-btn');

    vol.oninput = (e) => {
      this.settings.volume = parseInt(e.target.value);
      this.applySettings();
      this.saveSettings();
    };

    atm.onchange = (e) => {
      this.settings.atmosphere = e.target.checked;
      this.applySettings();
      this.saveSettings();
    };

    grn.onchange = (e) => {
      this.settings.grain = e.target.checked;
      this.applySettings();
      this.saveSettings();
    };

    vfx.onchange = (e) => {
      this.settings.vfx = e.target.checked;
      this.applySettings();
      this.saveSettings();
    };

    const fnt = document.getElementById('set-font-size');
    fnt.oninput = (e) => {
      this.settings.fontSize = parseInt(e.target.value);
      this.applySettings();
      this.saveSettings();
    };

    close.onclick = () => this.hideModal();
  }

  showHelp() {
    this.showMap('act1'); // Default to act 1 for help
  }

  showMap(actId) {
    this.modalOverlay.classList.remove('hidden-fade');
    this.modalBody.innerHTML = `
      <h2 class="modal-title">THE GREAT CHRONICLE</h2>
      <div class="map-parchment">
        ${this.generateMapSVG(actId)}
      </div>
      <div class="modal-section" style="margin-top:1rem; font-size: 0.8rem; color: var(--c-text-muted)">
        * Locations in <span style="color:var(--c-gold)">GOLD</span> are discovered. Pulse indicates current position.
      </div>
    `;
  }

  generateMapSVG(actId) {
    // Styling the map SVG to look like golden ink on parchment
    const configs = {
      act1: {
        title: "SHAMBHALA VALLEY",
        nodes: [
          { x: 100, y: 150, name: "The Stable", id: "stable" },
          { x: 300, y: 100, name: "Village Center", id: "village" },
          { x: 500, y: 180, name: "Forest Edge", id: "forest" }
        ],
        paths: "M 100 150 L 300 100 L 500 180"
      },
      act2: {
        title: "MAHENDRA MOUNTAINS",
        nodes: [
          { x: 150, y: 250, name: "Valley Entrance", id: "entrance" },
          { x: 350, y: 150, name: "Hermitage", id: "hermitage" },
          { x: 550, y: 200, name: "Southern Coast", id: "coast" }
        ],
        paths: "M 150 250 L 350 150 L 550 200"
      },
      act3: {
        title: "THE THREE PATHS",
        nodes: [
          { x: 100, y: 250, name: "Shadow Temples", id: "moha" },
          { x: 300, y: 150, name: "Crossroads", id: "crossroads" },
          { x: 500, y: 250, name: "Merchant Spires", id: "lobha" },
          { x: 300, y: 350, name: "Black Chasm", id: "bali" }
        ],
        paths: "M 300 150 L 100 250 M 300 150 L 500 250 M 300 350 L 300 150"
      },
      act4: {
        title: "OBSIDIAN FORTRESS",
        nodes: [
          { x: 300, y: 350, name: "Grand Gate", id: "gate" },
          { x: 300, y: 200, name: "Inner Sanctum", id: "sanctum" },
          { x: 300, y: 50, name: "The Mirror", id: "mirror" }
        ],
        paths: "M 300 350 L 300 200 L 300 50"
      }
    };

    const config = configs[actId] || configs.act1;
    
    return `
      <div style="text-align:center; color: var(--c-gold); margin-bottom: 20px; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 5px; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);">${config.title}</div>
      <div style="position: relative; padding: 5px; background: linear-gradient(45deg, #111, #222); border-radius: 8px; box-shadow: 0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(212,175,55,0.1); border: 1px solid rgba(212, 175, 55, 0.3);">
        <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: auto; background: radial-gradient(ellipse at 40% 35%, #1e1a0e 0%, #120e06 45%, #080503 100%); border-radius: 4px;">
          <defs>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="redPulsar" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <pattern id="tacticalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212, 175, 55, 0.05)" stroke-width="1"/>
            </pattern>
          </defs>
          <style>
            .tactical-line {
              stroke-dasharray: 10, 10;
              animation: marchFlow 4s linear infinite;
            }
            @keyframes marchFlow {
              to { stroke-dashoffset: -40; }
            }
            .node-pulsar {
              animation: expandFade 2.5s ease-out infinite;
            }
            @keyframes expandFade {
              0% { r: 4; opacity: 1; stroke-width: 2; }
              100% { r: 25; opacity: 0; stroke-width: 0.5; }
            }
          </style>

          <!-- Grid Background -->
          <rect width="100%" height="100%" fill="url(#tacticalGrid)" />

          <!-- Paths: Underglow + Marching Line -->
          <path d="${config.paths}" fill="none" stroke="rgba(212, 175, 55, 0.15)" stroke-width="6" filter="url(#goldGlow)" />
          <path d="${config.paths}" fill="none" stroke="rgba(212, 175, 55, 0.8)" stroke-width="1.5" class="tactical-line" />

          <!-- Nodes -->
          ${config.nodes.map(n => `
            <g transform="translate(${n.x}, ${n.y})">
              <!-- Tactical Reticle Underlay -->
              <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(212, 175, 55, 0.2)" stroke-width="1" />
              <path d="M -18 0 L -10 0 M 18 0 L 10 0 M 0 -18 L 0 -10 M 0 18 L 0 10" fill="none" stroke="rgba(212, 175, 55, 0.4)" stroke-width="1.5" />
              
              <!-- Expanding Ping rings -->
              <circle cx="0" cy="0" r="4" fill="none" stroke="var(--c-kali-red)" class="node-pulsar" filter="url(#redPulsar)" />
              
              <!-- Core dot -->
              <circle cx="0" cy="0" r="5" fill="var(--c-gold)" filter="url(#goldGlow)" />
              
              <!-- Label Box -->
              <rect x="-40" y="20" width="80" height="20" fill="rgba(0,0,0,0.7)" rx="3" stroke="rgba(212,175,55,0.3)" stroke-width="1" />
              <text x="0" y="34" text-anchor="middle" fill="var(--c-gold)" style="font-size: 11px; font-family: var(--font-main); letter-spacing: 1px; font-weight:600;">${n.name.toUpperCase()}</text>
            </g>
          `).join('')}
        </svg>
      </div>
    `;
  }


  hideModal() {
    this.modalOverlay.classList.add('hidden-fade');
  }

  // ─── Memory Vision Overlay ──────────────────────────────────────────────

  /**
   * Activate the full-screen Memory Vision cinematic overlay.
   * @param {object} meta - { yuga, title, chiranjeevi }
   */
  showMemoryVision(meta = {}) {
    this.inVision = true;
    const yuga = meta.yuga || 'dvapara';
    const title = meta.title || 'A MEMORY FROM ANOTHER AGE';
    const chiranjeevi = meta.chiranjeevi || '';

    // Yuga palette config
    const palettes = {
      satya:   { bg: '#1c1507', accent: '#e6b840', sub: '#c8a060', label: 'SATYA YUGA',   particle: 'satya' },
      treta:   { bg: '#1a0800', accent: '#e07020', sub: '#c05010', label: 'TRETA YUGA',   particle: 'treta' },
      dvapara: { bg: '#0d0d12', accent: '#8a9aba', sub: '#505870', label: 'DVAPARA YUGA', particle: 'dvapara' },
      kali:    { bg: '#0a0a10', accent: '#c9a84c', sub: '#6b21a8', label: 'KALI YUGA',    particle: 'kali' },
    };
    const p = palettes[yuga] || palettes.dvapara;

    this.visionOverlay.innerHTML = `
      <div class="vision-bg" style="background:${p.bg}"></div>
      <div class="vision-particles" id="vision-particles"></div>
      <div class="vision-frame">
        <div class="vision-era-label" style="color:${p.sub}">${p.label}</div>
        <div class="vision-chiranjeevi" style="color:${p.accent}">${chiranjeevi.toUpperCase()}</div>
        <div class="vision-separator" style="background:${p.accent}"></div>
        <div class="vision-title-text">${title}</div>
        <div class="vision-eyebrow">✦ MEMORY VISION ✦</div>
      </div>
      <div id="vision-story-content" class="vision-story-content"></div>
      <div id="vision-choices-content" class="vision-choices-content"></div>
    `;

    this.visionOverlay.classList.remove('hidden');
    // Force reflow then animate in
    void this.visionOverlay.offsetWidth;
    this.visionOverlay.classList.add('vision-active');

    // Spawn ambient particles for this yuga
    this._spawnVisionParticles(p.accent);

    // Redirect prose / choices into the vision overlay
    this._visionContentEl = document.getElementById('vision-story-content');
    this._visionChoicesEl = document.getElementById('vision-choices-content');
  }

  /**
   * Dismiss the Memory Vision overlay and return to main game.
   */
  hideMemoryVision() {
    this.inVision = false;
    this.pendingVision = {};
    this._visionContentEl = null;
    this._visionChoicesEl = null;

    this.visionOverlay.classList.remove('vision-active');
    // Wait for CSS transition, then hide & clean up
    setTimeout(() => {
      this.visionOverlay.classList.add('hidden');
      this.visionOverlay.innerHTML = '';
    }, 1200);
  }

  shakeScene(type = 'strong') {
    const el = this.container;
    const cls = type === 'strong' ? 'shake-scene' : 'shake-subtle';
    el.classList.remove('shake-scene', 'shake-subtle');
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 600);
  }

  flashRed() {
    this.container.classList.remove('flash-red');
    void this.container.offsetWidth;
    this.container.classList.add('flash-red');
    setTimeout(() => this.container.classList.remove('flash-red'), 400);
  }

  _spawnVisionParticles(color) {
    const container = document.getElementById('vision-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'vision-particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${color};
        opacity: ${Math.random() * 0.4 + 0.1};
        animation-duration: ${10 + Math.random() * 15}s;
        animation-delay: ${Math.random() * 8}s;
      `;
      container.appendChild(p);
    }
  }

  bindChoiceHandler(callback) {
    this.onChoiceSelected = callback;
  }

  clearUI() {
    this.contentDiv.innerHTML = '';
    this.choicesDiv.innerHTML = '';
    if (this._visionContentEl) this._visionContentEl.innerHTML = '';
    if (this._visionChoicesEl) this._visionChoicesEl.innerHTML = '';
  }

  setTitle(title) {
    this.currentTitle = title;
    document.getElementById('scene-title').textContent = title;
  }

  setYugaTheme(yuga) {
    this.currentYuga = yuga;
    document.body.className = `yuga-${yuga}`;
    this.container.className = `yuga-${yuga}`;
    this.yugaIndicator.innerText = `◉ ${yuga.toUpperCase()} YUGA`;
    
    if (this.vfx) this.vfx.setYuga(yuga);
    
    this.audio.playProceduralYuga(yuga);
  }

  setBackground(bgName) {
    if (!bgName) return;
    this.currentBg = bgName;

    // CSS gradient backgrounds — no image files required
    const gradients = {
      'act1':         'radial-gradient(ellipse at 20% 85%, #2a0f05 0%, #0f060a 45%, #050308 100%)',
      'act2':         'radial-gradient(ellipse at 75% 25%, #061505 0%, #030a04 45%, #020403 100%)',
      'act3':         'radial-gradient(ellipse at 50% 60%, #1e0802 0%, #0d0306 45%, #040206 100%)',
      'act4':         'radial-gradient(ellipse at 50% 0%, #110020 0%, #070010 50%, #030009 100%)',
      'act5':         'radial-gradient(ellipse at 50% 50%, #200005 0%, #0d0004 45%, #040003 100%)',
      'kalki_strike': 'radial-gradient(ellipse at 50% 50%, rgba(255,250,200,0.9) 0%, rgba(255,215,0,0.7) 18%, rgba(180,80,0,0.6) 40%, #100020 70%, #050010 100%)',
      'shambhala':    'radial-gradient(ellipse at 40% 30%, #1a1205 0%, #0e0c04 45%, #060504 100%)',
      'valley':       'radial-gradient(ellipse at 60% 70%, #0a1402 0%, #060c02 45%, #030602 100%)',
      'fortress':     'radial-gradient(ellipse at 50% 10%, #18001c 0%, #0a0012 50%, #04000a 100%)',
    };

    const bg = gradients[bgName] || gradients['act1'];
    this.bgLayer.classList.add('fading');
    setTimeout(() => {
      this.bgLayer.style.background = bg;
      this.bgLayer.classList.remove('fading');
    }, 800);
  }

  // Returns a thematic CSS gradient for companion/villain portrait slots
  _getPortraitGradient(id, isVillain = false) {
    const companionGradients = {
      'parashurama': 'radial-gradient(circle at 40% 30%, #8b1a1a 0%, #3d0a0a 50%, #1a0505 100%)',
      'hanuman':     'radial-gradient(circle at 50% 20%, #d4630a 0%, #7a3800 50%, #2a1200 100%)',
      'vibhishana':  'radial-gradient(circle at 60% 40%, #1a4a8b 0%, #0d2550 50%, #050f20 100%)',
      'vyasa':       'radial-gradient(circle at 50% 30%, #8b7a1a 0%, #4a4010 50%, #1a1805 100%)',
      'bali':        'radial-gradient(circle at 40% 50%, #2a8b1a 0%, #154a0d 50%, #071d05 100%)',
      'kripacharya': 'radial-gradient(circle at 55% 25%, #6b8b1a 0%, #384a0d 50%, #151d05 100%)',
      'ashwatthama': 'radial-gradient(circle at 50% 40%, #1a1a8b 0%, #0d0d50 50%, #05051a 100%)',
    };
    const villainGradients = {
      'adharmendra': 'radial-gradient(circle at 50% 30%, #4a1a00 0%, #250d00 50%, #0f0500 100%)',
      'koka':        'radial-gradient(circle at 40% 20%, #1a1a1a 0%, #0a0a0a 50%, #030303 100%)',
      'vikoka':      'radial-gradient(circle at 50% 50%, #000000 0%, #0a000a 60%, #050005 100%)',
      'lobha':       'radial-gradient(circle at 60% 30%, #6b5300 0%, #3a2d00 50%, #150f00 100%)',
      'krodha':      'radial-gradient(circle at 50% 20%, #6b0000 0%, #3a0000 50%, #150000 100%)',
      'moha':        'radial-gradient(circle at 50% 40%, #3a006b 0%, #1e003a 50%, #0a0015 100%)',
      'mada':        'radial-gradient(circle at 40% 30%, #6b3a00 0%, #3a1e00 50%, #150b00 100%)',
      'matsarya':    'radial-gradient(circle at 50% 30%, #006b3a 0%, #003a1e 50%, #00150b 100%)',
      'kali':        'radial-gradient(circle at 50% 10%, #3a006b 0%, #1e0038 35%, #0a0020 60%, #030010 100%)',
    };
    const map = isVillain ? villainGradients : companionGradients;
    return map[id] || 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0d0d1a 100%)';
  }

  getState() {
    return {
      title: this.currentTitle,
      yuga: this.currentYuga,
      bg: this.currentBg
    };
  }

  restoreState(state) {
    if (!state) return;
    if (state.title) this.setTitle(state.title);
    if (state.yuga) this.setYugaTheme(state.yuga);
    if (state.bg) {
      setTimeout(() => this.setBackground(state.bg), 500); // delay so CSS resolves
    }
  }

  updateStats(stats) {
    const keys = ['karma', 'dharma', 'adharma', 'essence'];
    keys.forEach(key => {
      const newVal = stats[key];
      const delta = newVal - (this.lastStats[key] || 0);
      if (delta !== 0) {
          this.triggerStatAnimation(key, newVal, delta);
          if (Math.abs(delta) > 10) this.spawnEmberBurst(12);
      }
    });

    if (this.audio) {
      this.audio.updateAlignment(stats.dharma, stats.adharma);
    }

    this.lastStats = { ...stats };
  }

  triggerStatAnimation(key, newVal, delta) {
    const valEl = document.getElementById(`stat-${key}-val`);
    const barEl = document.getElementById(`bar-${key}`);
    if (!valEl) return;

    let color = 'var(--c-gold)';
    if (key === 'dharma') color = '#e07020';
    if (key === 'adharma') color = 'var(--c-adharma)';
    if (key === 'essence') color = 'var(--c-atman)';
    if (key === 'karma' && delta < 0) color = 'var(--c-kali-red)';

    valEl.textContent = newVal;
    barEl.style.width = `${Math.min(Math.max(newVal, 0), 100)}%`;
    valEl.classList.remove('val-pop');
    void valEl.offsetWidth; 
    valEl.classList.add('val-pop');
    
    // Tiny burst for every stat change
    if (Math.abs(delta) > 2) this.spawnEmberBurst(3);
  }

  initCompanionPanel() {
    this.companionsDiv.innerHTML = '';
    this.allCompanions.forEach(comp => {
      const slot = document.createElement('div');
      slot.id = `comp-slot-${comp.id}`;
      slot.className = 'companion-slot';
      slot.innerHTML = `
        <div class="companion-icon">${comp.icon}</div>
        <div class="companion-name">${comp.name}</div>
      `;
      slot.onclick = () => {
        if (slot.classList.contains('discovered')) this.showCompanionLore(comp);
      };
      this.companionsDiv.appendChild(slot);
    });
  }

  updateCompanions(activeIds) {
    activeIds.forEach(id => {
      if (!this.activeCompanions.includes(id)) this.triggerAwakening(id);
    });

    this.allCompanions.forEach(comp => {
      const slot = document.getElementById(`comp-slot-${comp.id}`);
      if (!slot) return;
      if (activeIds.includes(comp.id)) slot.classList.add('discovered');
      else slot.classList.remove('discovered');
    });
    this.activeCompanions = [...activeIds];
    this.updateCompanionCount(activeIds.length);
  }

  triggerAwakening(id) {
    const companion = this.allCompanions.find(c => c.id === id);
    if (!companion) return;

    // Toast Notification
    const toast = document.createElement('div');
    toast.className = 'awakening-toast';
    toast.textContent = `AWAKENED: ${companion.name.toUpperCase()}`;
    document.getElementById('notification-overlay').appendChild(toast);
    setTimeout(() => toast.remove(), 3500);

    // Sidebar Pop
    const slot = document.getElementById(`comp-slot-${id}`);
    if (slot) {
        slot.classList.remove('awakened-pop');
        void slot.offsetWidth;
        slot.classList.add('awakened-pop');
    }

    // Heavy Ember Burst
    this.spawnEmberBurst(20);
  }

  pulseCompanion(id) {
    const slot = document.getElementById(`comp-slot-${id}`);
    if (slot && slot.classList.contains('discovered')) {
      slot.classList.remove('companion-pulsing');
      void slot.offsetWidth; // Force reflow
      slot.classList.add('companion-pulsing');
    }
  }

  showCompanionLore(comp) {
    this.modalOverlay.classList.remove('hidden-fade');
    const portrait = this._getPortraitGradient(comp.id, false);
    this.modalBody.innerHTML = `
      <div class="modal-content-split">
        <div class="modal-portrait" style="background:${portrait}; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:0.5rem;">
          <span style="font-size:3.5rem; filter:drop-shadow(0 0 20px var(--c-gold));">${comp.icon}</span>
          <span style="font-family:var(--font-main); font-size:0.6rem; letter-spacing:4px; color:var(--c-gold); opacity:0.6;">CHIRANJEEVI</span>
        </div>
        <div class="modal-text-side">
          <h2 class="modal-title">${comp.name.toUpperCase()}</h2>
          <div class="modal-section">
            <h3>THE IMMORTAL'S BURDEN</h3>
            <p>${comp.bio}</p>
          </div>
          <div class="modal-section" style="font-size:0.7rem; color:var(--c-gold); line-height:2;">
            BOND LEVEL: AWAKENED<br>
            STATUS: ETERNAL GUARDIAN
          </div>
        </div>
      </div>
    `;
  }

  showEncounter(villain) {
    this.modalOverlay.classList.remove('hidden-fade');
    const portrait = this._getPortraitGradient(villain.id, true);
    this.modalBody.innerHTML = `
      <div class="modal-content-split">
        <div class="modal-portrait" style="background:${portrait}; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:0.5rem;">
          <span style="font-size:3.5rem; filter:drop-shadow(0 0 20px var(--c-kali-red)); opacity:0.9;">💀</span>
          <span style="font-family:var(--font-main); font-size:0.55rem; letter-spacing:3px; color:var(--c-kali-red); opacity:0.7;">KALI'S FORCE</span>
        </div>
        <div class="modal-text-side">
          <h2 class="modal-title" style="color:var(--c-kali-red)">${villain.name.toUpperCase()}</h2>
          <div class="modal-section">
            <h3 style="color:var(--c-adharma)">VICE: ${villain.vice || 'THE MARK OF KALI'}</h3>
            <p>${villain.bio}</p>
          </div>
          <div class="modal-section" style="font-size:0.7rem; color:var(--c-kali-red); line-height:2;">
            THREAT LEVEL: OMEGA<br>
            ADHARMA AURA: ${villain.aura}
          </div>
        </div>
      </div>
    `;
  }

  renderProse(paragraphs) {
    // Route to vision overlay if inside a memory vision
    const target = (this.inVision && this._visionContentEl)
      ? this._visionContentEl
      : this.contentDiv;

    const isVision = this.inVision;

    paragraphs.forEach((text, i) => {
      const p = document.createElement('p');
      p.className = isVision ? 'story-paragraph vision-prose-para' : 'story-paragraph';
      p.innerHTML = text
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="prose-name">$1</strong>')
        .replace(/_([^_]+)_/g, '<em>$1</em>');
      p.style.animationDelay = `${i * 0.4}s`;
      target.appendChild(p);
    });

    // Auto-scroll prose column to reveal new content
    const proseCol = document.getElementById('prose-column');
    if (proseCol) {
      const delay = paragraphs.length * 0.4 * 1000 + 200;
      setTimeout(() => {
        proseCol.scrollTo({ top: proseCol.scrollHeight, behavior: 'smooth' });
      }, delay);
    }
  }

  renderChoices(choices) {
    // Route to vision overlay if inside a memory vision
    const target = (this.inVision && this._visionChoicesEl)
      ? this._visionChoicesEl
      : this.choicesDiv;

    if (choices.length === 0) {
      const btn = document.createElement('button');
      btn.className = 'choice-btn reveal';
      btn.textContent = 'THE END: CLAIM YOUR DESTINY';
      btn.style.animationDelay = '1s';
      btn.onclick = () => {
        const stats = {
          karma: parseInt(document.getElementById('stat-karma-val').textContent),
          dharma: parseInt(document.getElementById('stat-dharma-val').textContent),
          adharma: parseInt(document.getElementById('stat-adharma-val').textContent)
        };
        this.showEndSummary(stats, this.activeCompanions);
      };
      target.appendChild(btn);
      return;
    }

    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = this.inVision ? 'choice-btn vision-choice-btn' : 'choice-btn';
      btn.textContent = choice.text;
      btn.setAttribute('aria-label', `Choice ${idx + 1}: ${choice.text}`);
      const delay = (this.contentDiv.children.length * 0.4) + (idx * 0.2);
      btn.style.animationDelay = `${delay}s`;
      btn.classList.add('reveal');
      btn.onclick = () => {
        this.playChoiceImpact();
        if (this.onChoiceSelected) this.onChoiceSelected(choice.index);
      };
      target.appendChild(btn);
    });

    // Auto-focus first choice after animations settle (keyboard navigation)
    const totalDelay = (this.contentDiv.children.length * 0.4) + (choices.length * 0.2) + 0.3;
    setTimeout(() => {
      const firstBtn = target.querySelector('.choice-btn');
      if (firstBtn && document.activeElement === document.body) firstBtn.focus();
    }, totalDelay * 1000);
  }

  returnToLanding() {
    this.hideModal();
    const gc = document.getElementById('game-container');
    const lp = document.getElementById('landing-page');
    if (gc) { gc.style.transition = 'opacity 1.2s ease'; gc.style.opacity = '0'; }
    setTimeout(() => {
      if (gc) gc.style.display = 'none';
      if (lp) {
        lp.classList.remove('hidden-fade');
        lp.style.display = '';
        lp.style.opacity = '1';
      }
    }, 1200);
  }

  toggleMobileCompanions() {
    const panel    = document.getElementById('companion-panel');
    const btn      = document.getElementById('companion-drawer-btn');
    const backdrop = document.getElementById('drawer-backdrop');
    if (!panel) return;
    const isOpen = panel.classList.contains('drawer-open');
    panel.classList.toggle('drawer-open', !isOpen);
    if (btn)      btn.setAttribute('aria-expanded', String(!isOpen));
    if (backdrop) backdrop.style.display = isOpen ? 'none' : 'block';
  }

  updateCompanionCount(count) {
    const countEl = document.getElementById('companion-count');
    if (countEl) countEl.textContent = count;
  }
}
