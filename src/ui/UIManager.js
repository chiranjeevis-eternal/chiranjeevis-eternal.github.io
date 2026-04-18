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
    this.vfx = null;
    this.inVision = false;
    this.pendingVision = {}; // accumulates vision_* tags before overlay fires
    
    this.visionOverlay = document.getElementById('memory-vision-overlay');
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

  showSettings() {
    this.modalOverlay.classList.remove('hidden-fade');
    this.modalBody.innerHTML = `
      <h2 class="modal-title">SETTINGS</h2>
      <div class="modal-section">
        <h3>AUDIO</h3>
        <div class="setting-row"><span class="setting-label">Master Volume</span> <span>[||||||||--]</span></div>
        <div class="setting-row"><span class="setting-label">Atmosphere Loops</span> <span>ON</span></div>
      </div>
      <div class="modal-section">
        <h3>VISUAL</h3>
        <div class="setting-row"><span class="setting-label">Film Grain</span> <span>ON</span></div>
        <div class="setting-row"><span class="setting-label">Fly Ash & Embers</span> <span>ON</span></div>
      </div>
    `;
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
      <div style="text-align:center; color: var(--c-gold); margin-bottom: 10px; font-family: var(--font-title)">${config.title}</div>
      <svg viewBox="0 0 600 400" style="background: rgba(40,30,20,0.4); border: 2px solid var(--c-gold); border-radius: 5px;">
        <path d="${config.paths}" fill="none" stroke="rgba(212, 175, 55, 0.3)" stroke-width="2" />
        ${config.nodes.map(n => `
          <g>
            <circle cx="${n.x}" cy="${n.y}" r="8" fill="var(--c-background)" stroke="var(--c-gold)" stroke-width="2">
                <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="${n.x}" y="${n.y + 25}" text-anchor="middle" fill="var(--c-gold)" style="font-size: 12px; font-family: var(--font-main)">${n.name}</text>
          </g>
        `).join('')}
      </svg>
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
    document.getElementById('scene-title').textContent = title;
  }

  setYugaTheme(yuga) {
    document.body.className = `yuga-${yuga}`;
    this.container.className = `yuga-${yuga}`;
    this.yugaIndicator.innerText = `◉ ${yuga.toUpperCase()} YUGA`;
    
    if (this.vfx) this.vfx.setYuga(yuga);
    
    const colors = {
      kali: 'https://assets.mixkit.co/music/preview/mixkit-atmospheric-darkness-ambient-162.mp3',
      satya: 'https://assets.mixkit.co/music/preview/mixkit-ethereal-meditation-ambient-563.mp3',
      treta: 'https://assets.mixkit.co/music/preview/mixkit-epic-battle-drums-671.mp3',
      dvapara: 'https://assets.mixkit.co/music/preview/mixkit-mysterious-forest-ambient-1212.mp3'
    };
    
    this.audio.playLoop(colors[yuga] || colors.kali);
  }

  setBackground(bgName) {
    if (!bgName) return;
    const url = `assets/backgrounds/${bgName}.png`;
    
    // Smooth transition logic
    this.bgLayer.classList.add('fading');
    setTimeout(() => {
        this.bgLayer.style.backgroundImage = `url(${url})`;
        this.bgLayer.classList.remove('fading');
    }, 1500);
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
      p.innerHTML = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="prose-link">$1</a>');
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
