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
    
    this.lastStats = { karma: 50, dharma: 0, adharma: 10 };
    this.activeCompanions = [];
    this.currentYuga = 'kali';
    this.currentTitle = 'Chiranjeevis Eternal';
    this.currentBg = null;
    this.vfx = null;
    this.inVision = false;
    this.pendingVision = {}; // accumulates vision_* tags before overlay fires
    
    this.visionOverlay = document.getElementById('memory-vision-overlay');
    
    // Default Settings
    this.settings = {
      volume: 50,
      atmosphere: true,
      grain: true,
      vfx: true
    };
    this.loadSettings();
    
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
    this.initModalHandlers();
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
    for (let i = 0; i < 40; i++) {
        this.createParticle('ash');
    }
  }

  createParticle(type = 'ash') {
    const p = document.createElement('div');
    p.className = `particle ${type}`;
    const size = type === 'ember' ? Math.random() * 4 + 2 : Math.random() * 3 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    const duration = type === 'ember' ? 8 + Math.random() * 5 : 15 + Math.random() * 10;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    
    if (size < 2) {
        p.style.zIndex = 4;
        p.style.filter = 'blur(1px)';
        p.style.opacity = type === 'ember' ? 0.3 : 0.2;
    } else {
        p.style.zIndex = 6;
        p.style.opacity = type === 'ember' ? 0.8 : 0.5;
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
    // Audio
    if (this.audio) {
      this.audio.masterVolume = this.settings.volume / 100;
      this.audio.setVolume(this.settings.volume / 100);
    }
    
    // Visuals
    const grain = document.querySelector('.film-grain');
    if (grain) grain.style.display = this.settings.grain ? 'block' : 'none';
    
    if (this.vfx) this.vfx.active = this.settings.vfx;
    if (this.vfxLayer) this.vfxLayer.style.display = this.settings.vfx ? 'block' : 'none';
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
        <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: auto; background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/1k_Static_Grain.png/1024px-1k_Static_Grain.png'), radial-gradient(circle at center, #1a1610 0%, #0a0805 100%); mix-blend-mode: screen; border-radius: 4px;">
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
    const url = `assets/backgrounds/${bgName}.png`;
    
    // Smooth transition logic
    this.bgLayer.classList.add('fading');
    setTimeout(() => {
        this.bgLayer.style.backgroundImage = `url(${url})`;
        this.bgLayer.classList.remove('fading');
    }, 1500);
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
    const keys = ['karma', 'dharma', 'adharma'];
    keys.forEach(key => {
      const newVal = stats[key];
      const delta = newVal - (this.lastStats[key] || 0);
      if (delta !== 0) {
          this.triggerStatAnimation(key, newVal, delta);
          if (Math.abs(delta) > 10) this.spawnEmberBurst(12);
      }
    });
    this.lastStats = { ...stats };
  }

  triggerStatAnimation(key, newVal, delta) {
    const valEl = document.getElementById(`stat-${key}-val`);
    const barEl = document.getElementById(`bar-${key}`);
    if (!valEl) return;

    let color = 'var(--c-gold)';
    if (key === 'dharma') color = '#e07020';
    if (key === 'adharma') color = 'var(--c-adharma)';
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
      if (!this.activeCompanions.includes(id)) {
        this.triggerAwakening(id);
      }
    });

    this.allCompanions.forEach(comp => {
      const slot = document.getElementById(`comp-slot-${comp.id}`);
      if (activeIds.includes(comp.id)) {
        slot.classList.add('discovered');
      } else {
        slot.classList.remove('discovered');
      }
    });
    this.activeCompanions = [...activeIds];
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
    this.modalBody.innerHTML = `
      <div class="modal-content-split">
        <div class="modal-portrait" style="background-image: url('assets/companions/${comp.id}.png')"></div>
        <div class="modal-text-side">
          <h2 class="modal-title">${comp.name.toUpperCase()}</h2>
          <div class="modal-section">
            <h3>THE IMMORTAL'S BURDEN</h3>
            <p>${comp.bio}</p>
          </div>
          <div class="modal-section">
            <div id="world-map" style="font-size:0.7rem; color:var(--c-gold)">
               BOND LEVEL: AWAKENED<br>
               YUGA ORIGIN: TRETA/DVAPARA/SATYA
            </div>
          </div>
        </div>
      </div>
    `;
  }

  showEncounter(villain) {
    this.modalOverlay.classList.remove('hidden-fade');
    this.modalBody.innerHTML = `
      <div class="modal-content-split">
        <div class="modal-portrait" style="background-image: url('assets/villains/${villain.id}.png')"></div>
        <div class="modal-text-side">
          <h2 class="modal-title" style="color:var(--c-kali-red)">${villain.name.toUpperCase()}</h2>
          <div class="modal-section">
            <h3 style="color:var(--c-adharma)">THE MARK OF KALI</h3>
            <p>${villain.bio}</p>
          </div>
          <div class="modal-section">
            <div id="world-map" style="font-size:0.7rem; color:var(--c-kali-red)">
               THREAT LEVEL: OMEGA<br>
               ADHARMA AURA: ${villain.aura}
            </div>
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
      // Render **bold** → <strong> and _italic_ → <em>
      p.innerHTML = text
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="prose-name">$1</strong>')
        .replace(/_([^_]+)_/g, '<em>$1</em>');
      p.style.animationDelay = `${i * 0.4}s`;
      target.appendChild(p);
    });
  }

  renderChoices(choices) {
    // Route to vision overlay if inside a memory vision
    const target = (this.inVision && this._visionChoicesEl)
      ? this._visionChoicesEl
      : this.choicesDiv;

    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = this.inVision ? 'choice-btn vision-choice-btn' : 'choice-btn';
      btn.textContent = choice.text;
      const delay = (this.contentDiv.children.length * 0.4) + (idx * 0.2);
      btn.style.animationDelay = `${delay}s`;
      btn.classList.add('reveal');
      btn.onclick = () => { if (this.onChoiceSelected) this.onChoiceSelected(choice.index); };
      target.appendChild(btn);
    });
  }
}
