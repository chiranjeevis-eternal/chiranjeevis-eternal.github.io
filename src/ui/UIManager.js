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
      <h2 class="modal-title" style="margin-bottom:1.2rem;">THE GREAT CHRONICLE</h2>
      ${this.generateMapSVG(actId)}
    `;
  }

  generateMapSVG(actId) {
    const id = actId || 'act1';
    const maps = {
      act1: this._mapAct1(),
      act2: this._mapAct2(),
      act3: this._mapAct3(),
      act4: this._mapAct4(),
    };
    return maps[id] || maps.act1;
  }

  _mapShell(title, subtitle, bgGrad, content, legend) {
    return `
      <div style="font-family:'Cinzel',serif; color:#c9a84c; text-align:center; font-size:1.1rem; letter-spacing:6px; margin-bottom:6px; text-shadow:0 0 12px rgba(201,168,76,0.4);">${title}</div>
      <div style="font-family:'Cormorant Garamond',serif; color:rgba(201,168,76,0.5); text-align:center; font-size:0.75rem; letter-spacing:3px; margin-bottom:12px; font-style:italic;">${subtitle}</div>
      <div style="position:relative; border:1px solid rgba(201,168,76,0.25); border-radius:6px; overflow:hidden; box-shadow:0 0 40px rgba(0,0,0,0.9), inset 0 0 30px rgba(201,168,76,0.04);">
        <svg viewBox="0 0 700 440" preserveAspectRatio="xMidYMid meet" style="width:100%; height:auto; display:block; background:${bgGrad};">
          <defs>
            <filter id="glow${actId||''}">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="softGlow${actId||''}">
              <feGaussianBlur stdDeviation="8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <pattern id="grid${actId||''}" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M50 0L0 0 0 50" fill="none" stroke="rgba(201,168,76,0.04)" stroke-width="1"/>
            </pattern>
            <style>
              .march${actId||''}{stroke-dasharray:8 8;animation:flow${actId||''} 3s linear infinite}
              @keyframes flow${actId||''}{to{stroke-dashoffset:-32}}
              .pulse${actId||''}{animation:ping${actId||''} 2s ease-out infinite}
              @keyframes ping${actId||''}{0%{r:5;opacity:0.9}100%{r:22;opacity:0}}
              .fogDrift${actId||''}{animation:drift${actId||''} 8s ease-in-out infinite alternate}
              @keyframes drift${actId||''}{0%{opacity:0.18}100%{opacity:0.32}}
            </style>
          </defs>
          <rect width="700" height="440" fill="url(#grid${actId||''})"/>
          ${content}
          <!-- Decorative border -->
          <rect x="8" y="8" width="684" height="424" fill="none" stroke="rgba(201,168,76,0.2)" stroke-width="1" rx="3"/>
          <rect x="12" y="12" width="676" height="416" fill="none" stroke="rgba(201,168,76,0.08)" stroke-width="1" rx="2"/>
          <!-- Corner ornaments -->
          <g fill="none" stroke="rgba(201,168,76,0.35)" stroke-width="1.5">
            <path d="M8,28 L8,8 L28,8"/><path d="M672,8 L692,8 L692,28"/>
            <path d="M8,412 L8,432 L28,432"/><path d="M672,432 L692,432 L692,412"/>
          </g>
        </svg>
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:10px;font-size:0.7rem;color:rgba(201,168,76,0.5);font-family:'Cinzel',serif;letter-spacing:1px;">${legend}</div>
    `;
  }

  _loc(x, y, label, sub, type) {
    // type: 'current' | 'visited' | 'key' | 'distant' | 'danger'
    const colors = { current:'#c9a84c', visited:'#8a6a28', key:'#ff4040', distant:'#4a4060', danger:'#8b0000' };
    const col = colors[type] || colors.visited;
    const r = type === 'key' ? 7 : type === 'current' ? 6 : 5;
    const pulse = type === 'current' ? `<circle cx="0" cy="0" r="${r}" fill="none" stroke="${col}" class="pulseact"/>` : '';
    const glyph = type === 'key' ? '⬟' : type === 'danger' ? '◆' : '●';
    const lw = Math.max(80, label.length * 7 + 10);
    return `
      <g transform="translate(${x},${y})" filter="url(#glowact)">
        ${pulse}
        <circle cx="0" cy="0" r="${r}" fill="${col}" opacity="${type==='distant'?0.4:0.9}"/>
        <circle cx="0" cy="0" r="${r+4}" fill="none" stroke="${col}" stroke-width="1" opacity="0.3"/>
        <rect x="${-lw/2}" y="12" width="${lw}" height="${sub?30:18}" rx="2" fill="rgba(5,5,10,0.88)" stroke="${col}" stroke-width="0.5" stroke-opacity="0.4"/>
        <text x="0" y="24" text-anchor="middle" fill="${col}" font-family="Cinzel,serif" font-size="9" letter-spacing="1.5" font-weight="600">${label}</text>
        ${sub ? `<text x="0" y="36" text-anchor="middle" fill="rgba(201,168,76,0.45)" font-family="Cormorant Garamond,serif" font-size="8" font-style="italic">${sub}</text>` : ''}
      </g>`;
  }

  _road(d, col, dashed) {
    const dash = dashed ? 'stroke-dasharray="6 5"' : '';
    const cls  = dashed ? '' : 'class="marchact"';
    return `
      <path d="${d}" fill="none" stroke="${col}" stroke-width="5" opacity="0.1" filter="url(#softGlowact)"/>
      <path d="${d}" fill="none" stroke="${col}" stroke-width="1.5" opacity="0.7" ${dash} ${cls}/>`;
  }

  _mapAct1() {
    const actId = 'act1';
    const content = `
      <!-- Sky gradient -->
      <defs>
        <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0d0d18"/>
          <stop offset="60%" stop-color="#12100a"/>
          <stop offset="100%" stop-color="#0a0808"/>
        </linearGradient>
        <radialGradient id="fog1" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stop-color="#4b0082" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#200030" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="villageGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff4500" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#ff4500" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="700" height="440" fill="url(#sky1)"/>

      <!-- Stars -->
      <circle cx="80" cy="40" r="1" fill="rgba(255,255,220,0.6)"/>
      <circle cx="180" cy="25" r="1.5" fill="rgba(255,255,220,0.5)"/>
      <circle cx="320" cy="18" r="1" fill="rgba(255,255,220,0.7)"/>
      <circle cx="450" cy="30" r="1" fill="rgba(255,255,220,0.4)"/>
      <circle cx="580" cy="20" r="1.5" fill="rgba(255,255,220,0.6)"/>
      <circle cx="640" cy="45" r="1" fill="rgba(255,255,220,0.5)"/>

      <!-- Mahendra mountain range (top) -->
      <path d="M 0,160 Q 60,90 110,130 Q 160,70 210,110 Q 260,50 320,95 Q 370,45 430,85 Q 480,55 530,90 Q 580,60 630,100 Q 660,75 700,110 L 700,175 L 0,175 Z"
            fill="#1a1a2a" opacity="0.9"/>
      <path d="M 50,175 Q 90,130 120,155 Q 155,110 185,140 Q 220,95 260,130 Q 290,105 330,130 Q 360,110 400,135 Q 440,115 475,140 Q 510,120 545,145 Q 580,125 620,155 Q 655,135 690,155 L 700,175 L 0,175 Z"
            fill="#252538" opacity="0.8"/>

      <!-- Snow caps -->
      <path d="M 205,110 L 218,90 L 235,110 Z" fill="rgba(220,220,255,0.4)"/>
      <path d="M 318,95 L 330,75 L 345,95 Z" fill="rgba(220,220,255,0.45)"/>
      <path d="M 427,85 L 438,67 L 452,85 Z" fill="rgba(220,220,255,0.4)"/>

      <!-- Eastern treeline (right side) -->
      <g opacity="0.7">
        <path d="M 580,175 L 590,140 L 600,175 Z" fill="#1a3020"/>
        <path d="M 600,175 L 613,130 L 625,175 Z" fill="#1a3020"/>
        <path d="M 618,175 L 630,145 L 642,175 Z" fill="#1a3020"/>
        <path d="M 638,175 L 650,135 L 662,175 Z" fill="#142818"/>
        <path d="M 655,175 L 665,148 L 675,175 Z" fill="#1a3020"/>
        <path d="M 670,175 L 680,142 L 690,175 Z" fill="#142818"/>
        <rect x="580" y="175" width="120" height="40" fill="#0e1e14"/>
      </g>
      <text x="635" y="230" text-anchor="middle" fill="rgba(50,160,50,0.4)" font-family="Cormorant Garamond,serif" font-size="9" font-style="italic" transform="rotate(-90,635,230)">EASTERN TREELINE</text>

      <!-- River (center-left) -->
      <path d="M 220,440 Q 230,380 215,320 Q 205,270 225,230 Q 240,200 230,175" fill="none" stroke="#1a3050" stroke-width="3" opacity="0.6"/>
      <path d="M 220,440 Q 230,380 215,320 Q 205,270 225,230 Q 240,200 230,175" fill="none" stroke="#2a5080" stroke-width="1" opacity="0.4"/>

      <!-- Adharma Fog (bottom) -->
      <rect x="0" y="350" width="700" height="90" fill="url(#fog1)" class="fogDrift${actId}"/>
      <path d="M 0,380 Q 80,360 160,375 Q 240,390 320,365 Q 400,355 480,370 Q 560,380 640,360 Q 670,355 700,362 L 700,440 L 0,440 Z"
            fill="rgba(75,0,130,0.2)" class="fogDrift${actId}"/>
      <text x="350" y="435" text-anchor="middle" fill="rgba(138,43,226,0.4)" font-family="Cinzel,serif" font-size="8" letter-spacing="4">◈ ADHARMA FOG FRONT ◈</text>

      <!-- Shambhala village (burning) -->
      <circle cx="350" cy="290" r="22" fill="url(#villageGlow)" class="fogDrift${actId}"/>
      <!-- House icons -->
      <g transform="translate(335,278)" fill="none" stroke="rgba(255,180,60,0.6)" stroke-width="1.2">
        <rect x="0" y="8" width="10" height="8"/><polygon points="5,0 -2,8 12,8"/>
        <rect x="14" y="8" width="10" height="8"/><polygon points="19,0 12,8 26,8"/>
      </g>
      <!-- Smoke -->
      <path d="M 345,278 Q 340,262 343,250 Q 346,240 342,228" fill="none" stroke="rgba(100,80,60,0.5)" stroke-width="2"/>
      <path d="M 355,275 Q 352,258 356,245 Q 359,234 356,220" fill="none" stroke="rgba(100,80,60,0.4)" stroke-width="2"/>

      <!-- Ridge of Saffron path (upper route, gold) -->
      <path d="M 350,290 Q 400,265 450,240 Q 490,220 520,200 Q 550,185 575,178" fill="none" stroke="rgba(201,168,76,0.12)" stroke-width="5"/>
      <path d="M 350,290 Q 400,265 450,240 Q 490,220 520,200 Q 550,185 575,178" fill="none" stroke="rgba(201,168,76,0.7)" stroke-width="1.5" stroke-dasharray="6 4"/>
      <text x="490" y="225" text-anchor="middle" fill="rgba(201,168,76,0.45)" font-family="Cormorant Garamond,serif" font-size="8" font-style="italic" transform="rotate(-15,490,225)">Ridge of Saffron</text>

      <!-- Whispering Ravines path (lower route, blue) -->
      <path d="M 350,290 Q 305,305 270,320 Q 240,330 220,320 Q 200,305 210,280 Q 220,255 240,230 Q 265,205 300,195 Q 340,185 390,182 Q 430,180 480,178 Q 525,177 560,178" fill="none" stroke="rgba(60,100,180,0.12)" stroke-width="5"/>
      <path d="M 350,290 Q 305,305 270,320 Q 240,330 220,320 Q 200,305 210,280 Q 220,255 240,230 Q 265,205 300,195 Q 340,185 390,182 Q 430,180 480,178 Q 525,177 560,178" fill="none" stroke="rgba(80,130,220,0.55)" stroke-width="1.5" stroke-dasharray="4 5"/>
      <text x="240" y="345" text-anchor="middle" fill="rgba(80,130,220,0.4)" font-family="Cormorant Garamond,serif" font-size="8" font-style="italic" transform="rotate(10,240,345)">Whispering Ravines</text>

      <!-- Destination: Mahendra Peaks marker -->
      <g transform="translate(568,178)" filter="url(#glow${actId})">
        <circle cx="0" cy="0" r="7" fill="#c9a84c" opacity="0.85"/>
        <circle cx="0" cy="0" r="11" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.4"/>
        <circle cx="0" cy="0" r="7" fill="none" stroke="rgba(201,168,76,0.6)" class="pulse${actId}"/>
        <rect x="-55" y="-28" width="110" height="20" rx="2" fill="rgba(5,5,10,0.9)" stroke="rgba(201,168,76,0.4)" stroke-width="0.5"/>
        <text x="0" y="-14" text-anchor="middle" fill="#c9a84c" font-family="Cinzel,serif" font-size="9" letter-spacing="1.5" font-weight="600">MAHENDRA PEAKS</text>
        <rect x="-45" y="-5" width="90" height="14" rx="2" fill="rgba(5,5,10,0.85)" stroke="rgba(201,168,76,0.2)" stroke-width="0.5"/>
        <text x="0" y="6" text-anchor="middle" fill="rgba(201,168,76,0.5)" font-family="Cormorant Garamond,serif" font-size="8" font-style="italic">Parashurama awaits</text>
      </g>

      <!-- Shambhala location label -->
      ${this._loc2(350, 290, 'SHAMBHALA', 'The burning sanctuary', 'current', actId)}

      <!-- Compass rose (bottom right) -->
      ${this._compass(648, 400)}

      <!-- Region label -->
      <text x="130" y="320" text-anchor="middle" fill="rgba(201,168,76,0.12)" font-family="Cinzel,serif" font-size="22" letter-spacing="4" font-weight="700" transform="rotate(-8,130,320)">HIMALAYAS</text>
    `;
    return this._mapShell(
      'ACT I — THE ASCENT FROM SHAMBHALA',
      'Two paths lead north. Both arrive at the same mountain.',
      'radial-gradient(ellipse at 40% 30%, #12101a 0%, #0a0a0f 55%, #060608 100%)',
      content.replace(/class="(march|pulse|fogDrift)act/g, `class="$1${actId}`),
      `<span>◈ Current Position</span><span style="opacity:0.6">— Ridge of Saffron (Karma)</span><span style="color:#5080cc;opacity:0.7">-- Whispering Ravines (Shadow)</span><span style="opacity:0.4">▲ Mahendra Peaks (Destination)</span>`
    );
  }

  _mapAct2() {
    const actId = 'act2';
    const content = `
      <defs>
        <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0c1020"/>
          <stop offset="50%" stop-color="#0e0e18"/>
          <stop offset="100%" stop-color="#0a0c14"/>
        </linearGradient>
        <radialGradient id="coast2" cx="85%" cy="80%" r="30%">
          <stop offset="0%" stop-color="#0a2040" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0a2040" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="700" height="440" fill="url(#sky2)"/>

      <!-- Mountain range (left) -->
      <path d="M 0,280 Q 40,200 80,240 Q 110,180 145,220 Q 170,160 200,200 Q 225,140 255,185 Q 270,165 285,190 L 285,300 L 0,300 Z" fill="#1a1a2e" opacity="0.85"/>
      <path d="M 0,300 Q 45,255 75,275 Q 105,240 130,265 Q 160,230 185,255 Q 210,220 240,248 Q 260,235 285,255 L 285,300 Z" fill="#252545" opacity="0.7"/>
      <!-- Snow caps -->
      <path d="M 142,220 L 152,200 L 165,220 Z" fill="rgba(200,220,255,0.4)"/>
      <path d="M 222,140 L 233,122 L 248,140 Z" fill="rgba(200,220,255,0.45)"/>
      <text x="130" y="340" text-anchor="middle" fill="rgba(180,190,220,0.15)" font-family="Cinzel,serif" font-size="18" letter-spacing="2" transform="rotate(-90,130,340)">MAHENDRA</text>

      <!-- Coastline (right/bottom-right) -->
      <path d="M 520,260 Q 560,240 600,260 Q 640,250 680,270 Q 700,280 700,300 L 700,440 L 460,440 Q 480,400 500,370 Q 510,330 520,300 Q 518,280 520,260 Z" fill="#081428" opacity="0.7"/>
      <path d="M 510,280 Q 545,265 580,275 Q 615,268 650,280 Q 670,285 690,278" fill="none" stroke="#1a4060" stroke-width="2" opacity="0.6"/>
      <path d="M 508,295 Q 543,282 575,290 Q 608,283 640,292 Q 660,296 685,290" fill="none" stroke="#1a4060" stroke-width="1.5" opacity="0.4"/>
      <text x="610" y="380" text-anchor="middle" fill="rgba(30,80,140,0.3)" font-family="Cinzel,serif" font-size="14" letter-spacing="3">SOUTHERN SEA</text>

      <!-- Journey path: Shambhala entrance → Hermitage → Temple → Cave → Coast -->
      <path d="M 130,390 Q 170,340 200,310 Q 230,280 260,250 Q 285,225 300,210" fill="none" stroke="rgba(201,168,76,0.1)" stroke-width="5"/>
      <path d="M 130,390 Q 170,340 200,310 Q 230,280 260,250 Q 285,225 300,210" fill="none" stroke="rgba(201,168,76,0.6)" stroke-width="1.5" class="march${actId}"/>
      <path d="M 300,210 Q 360,195 400,210 Q 440,220 460,240" fill="none" stroke="rgba(201,168,76,0.1)" stroke-width="5"/>
      <path d="M 300,210 Q 360,195 400,210 Q 440,220 460,240" fill="none" stroke="rgba(201,168,76,0.6)" stroke-width="1.5" class="march${actId}"/>
      <path d="M 460,240 Q 490,255 500,280 Q 505,305 500,330" fill="none" stroke="rgba(201,168,76,0.1)" stroke-width="5"/>
      <path d="M 460,240 Q 490,255 500,280 Q 505,305 500,330" fill="none" stroke="rgba(201,168,76,0.6)" stroke-width="1.5" class="march${actId}"/>

      <!-- Black horse sighting -->
      <g transform="translate(220,355)" opacity="0.5">
        <ellipse cx="0" cy="0" rx="12" ry="8" fill="rgba(30,20,50,0.8)" stroke="rgba(138,43,226,0.4)" stroke-width="1"/>
        <text x="0" y="4" text-anchor="middle" fill="rgba(138,43,226,0.6)" font-family="serif" font-size="10">🐴</text>
        <rect x="-35" y="10" width="70" height="13" rx="2" fill="rgba(5,5,10,0.8)" stroke="rgba(138,43,226,0.25)" stroke-width="0.5"/>
        <text x="0" y="20" text-anchor="middle" fill="rgba(138,43,226,0.45)" font-family="Cormorant Garamond,serif" font-size="8" font-style="italic">black horse seen</text>
      </g>

      <!-- Locations -->
      ${this._loc2(130, 390, 'VALLEY ENTRANCE', 'From Shambhala', 'visited', actId)}
      ${this._loc2(300, 210, 'MAHENDRA HERMITAGE', 'Parashurama — the First Guru', 'visited', actId)}
      ${this._loc2(460, 240, 'ROCK TEMPLE IN WIND', 'Hanuman — the Vanara', 'visited', actId)}
      ${this._loc2(500, 330, 'CAVE OF THE CHRONICLE', 'Vyasa — the Chronicler', 'visited', actId)}
      ${this._loc2(530, 395, 'BLACK SAND COAST', 'Vibhishana — the Strategist', 'current', actId)}

      ${this._compass(648, 395)}
      <text x="420" y="175" text-anchor="middle" fill="rgba(201,168,76,0.08)" font-family="Cinzel,serif" font-size="20" letter-spacing="3" font-weight="700">THE GATHERING</text>
    `;
    return this._mapShell(
      'ACT II — THE GATHERING OF CHIRANJEEVIS',
      'Four immortals. Four memories. The company grows.',
      'radial-gradient(ellipse at 20% 40%, #0e1020 0%, #0a0c18 50%, #060810 100%)',
      content,
      `<span>● Visited</span><span>◈ Current</span><span style="opacity:0.5;color:#8a2be2">🐴 Black horse sighting</span>`
    );
  }

  _mapAct3() {
    const actId = 'act3';
    const content = `
      <defs>
        <linearGradient id="plain3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#100c08"/>
          <stop offset="40%" stop-color="#0e0c08"/>
          <stop offset="100%" stop-color="#080608"/>
        </linearGradient>
        <radialGradient id="lobhaGlow" cx="70%" cy="35%" r="20%">
          <stop offset="0%" stop-color="#6b5300" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#6b5300" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="fortressGlow" cx="50%" cy="5%" r="25%">
          <stop offset="0%" stop-color="#4b0082" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#4b0082" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="700" height="440" fill="url(#plain3)"/>

      <!-- Adharmendra fortress silhouette (top center, distant) -->
      <rect x="0" y="0" width="700" height="100" fill="url(#fortressGlow)"/>
      <path d="M 260,85 L 265,50 L 270,85 L 275,40 L 285,85 L 295,30 L 305,75 L 315,25 L 325,70 L 335,35 L 345,80 L 355,45 L 365,80 L 370,55 L 380,85 L 385,60 L 390,85 L 395,50 L 400,85 L 405,65 L 415,85 L 420,40 L 430,78 L 438,55 L 445,78" fill="none" stroke="rgba(75,0,130,0.5)" stroke-width="1.5"/>
      <rect x="255" y="85" width="200" height="40" fill="rgba(30,0,60,0.6)"/>
      <text x="355" y="115" text-anchor="middle" fill="rgba(138,43,226,0.35)" font-family="Cinzel,serif" font-size="8" letter-spacing="3">THE FORTRESS OF ADHARMENDRA</text>

      <!-- Adharma fog (top, behind fortress) -->
      <path d="M 200,90 Q 300,70 355,85 Q 420,70 500,85 L 500,100 Q 420,88 355,98 Q 300,88 200,100 Z" fill="rgba(75,0,130,0.15)"/>

      <!-- Shadow temples (left) -->
      <g transform="translate(95,195)">
        <path d="M -30,60 L -30,0 L -15,-30 L 0,0 L 15,-30 L 30,0 L 30,60" fill="rgba(20,15,35,0.9)" stroke="rgba(80,0,120,0.5)" stroke-width="1"/>
        <path d="M -20,60 L -20,10 L -10,-15 L 0,10 L 10,-15 L 20,10 L 20,60" fill="rgba(30,20,50,0.7)"/>
        <rect x="-30" y="60" width="60" height="20" fill="rgba(15,10,25,0.8)"/>
        <!-- Dark light -->
        <circle cx="0" cy="-40" r="4" fill="rgba(120,0,180,0.3)" class="fogDrift${actId}"/>
      </g>
      <text x="95" y="285" text-anchor="middle" fill="rgba(100,0,160,0.2)" font-family="Cormorant Garamond,serif" font-size="9" font-style="italic">Silent Temples</text>

      <!-- Merchant city (right) -->
      <circle cx="550" cy="190" r="35" fill="url(#lobhaGlow)"/>
      <g transform="translate(530,175)">
        <rect x="0" y="20" width="12" height="20" fill="rgba(80,60,0,0.8)"/>
        <polygon points="6,0 -2,20 14,20" fill="rgba(100,80,0,0.7)"/>
        <rect x="15" y="15" width="10" height="25" fill="rgba(80,60,0,0.8)"/>
        <polygon points="20,0 13,15 27,15" fill="rgba(120,95,0,0.7)"/>
        <rect x="28" y="22" width="12" height="18" fill="rgba(80,60,0,0.8)"/>
        <polygon points="34,5 26,22 42,22" fill="rgba(100,80,0,0.7)"/>
        <!-- Gold shimmer -->
        <circle cx="20" cy="-10" r="6" fill="rgba(180,140,0,0.2)" class="fogDrift${actId}"/>
      </g>
      <text x="550" y="240" text-anchor="middle" fill="rgba(180,140,0,0.2)" font-family="Cormorant Garamond,serif" font-size="9" font-style="italic">Merchant City</text>

      <!-- Black Chasm (bottom center) -->
      <path d="M 250,380 Q 300,360 355,370 Q 400,360 450,375 Q 420,420 380,440 L 320,440 Q 280,430 250,380 Z" fill="#040206" opacity="0.95"/>
      <path d="M 270,388 Q 310,372 355,378 Q 395,370 425,382" fill="none" stroke="rgba(75,0,130,0.4)" stroke-width="2"/>
      <!-- Bali's bridge (ascending) -->
      <path d="M 285,388 L 285,365 M 325,375 L 325,350 M 365,372 L 365,347 M 405,380 L 405,358" fill="none" stroke="rgba(50,180,50,0.4)" stroke-width="2.5"/>
      <path d="M 270,365 Q 340,345 420,358" fill="none" stroke="rgba(50,180,50,0.3)" stroke-width="4"/>
      <path d="M 270,365 Q 340,345 420,358" fill="none" stroke="rgba(50,180,50,0.6)" stroke-width="1.5" class="march${actId}"/>
      <text x="345" y="420" text-anchor="middle" fill="rgba(75,0,130,0.4)" font-family="Cinzel,serif" font-size="8" letter-spacing="3">THE BLACK CHASM</text>

      <!-- Crossroads (center) -->
      <circle cx="350" cy="270" r="15" fill="rgba(20,15,10,0.9)" stroke="rgba(201,168,76,0.3)" stroke-width="1"/>
      <path d="M 342,270 L 358,270 M 350,262 L 350,278" fill="none" stroke="rgba(201,168,76,0.5)" stroke-width="1.5"/>

      <!-- Krodha encounter site -->
      <g transform="translate(200,310)" opacity="0.6">
        <path d="M -18,5 L -5,-10 M 5,-10 L 18,5" fill="none" stroke="rgba(200,60,0,0.5)" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="8" fill="none" stroke="rgba(200,60,0,0.35)" stroke-width="1" stroke-dasharray="3 3"/>
        <rect x="-30" y="12" width="60" height="13" rx="2" fill="rgba(5,5,10,0.85)" stroke="rgba(200,60,0,0.25)" stroke-width="0.5"/>
        <text x="0" y="21" text-anchor="middle" fill="rgba(200,60,0,0.5)" font-family="Cormorant Garamond,serif" font-size="8" font-style="italic">Krodha — civil war</text>
      </g>

      <!-- Path: Crossroads → Lobha -->
      <path d="M 365,270 Q 420,255 480,220 Q 510,207 535,197" fill="none" stroke="rgba(180,140,0,0.1)" stroke-width="5"/>
      <path d="M 365,270 Q 420,255 480,220 Q 510,207 535,197" fill="none" stroke="rgba(180,140,0,0.55)" stroke-width="1.5" stroke-dasharray="5 4"/>

      <!-- Path: Crossroads → Moha -->
      <path d="M 335,270 Q 280,255 220,230 Q 165,215 125,208" fill="none" stroke="rgba(80,0,120,0.1)" stroke-width="5"/>
      <path d="M 335,270 Q 280,255 220,230 Q 165,215 125,208" fill="none" stroke="rgba(100,0,160,0.45)" stroke-width="1.5" stroke-dasharray="3 5"/>

      <!-- Path: Crossroads → Bali (down) -->
      <path d="M 350,285 Q 352,315 350,345 Q 349,358 348,370" fill="none" stroke="rgba(50,160,50,0.1)" stroke-width="5"/>
      <path d="M 350,285 Q 352,315 350,345 Q 349,358 348,370" fill="none" stroke="rgba(50,160,50,0.55)" stroke-width="1.5" class="march${actId}"/>

      <!-- Path: From Act 2 (enter from bottom-left) -->
      <path d="M 80,440 Q 120,400 160,360 Q 185,335 200,310 Q 218,288 240,278 Q 285,268 335,268" fill="none" stroke="rgba(201,168,76,0.08)" stroke-width="5"/>
      <path d="M 80,440 Q 120,400 160,360 Q 185,335 200,310 Q 218,288 240,278 Q 285,268 335,268" fill="none" stroke="rgba(201,168,76,0.5)" stroke-width="1.5" class="march${actId}"/>

      <!-- Locations -->
      ${this._loc2(95, 208, 'SILENT TEMPLES', 'Trial of Moha', 'visited', actId)}
      ${this._loc2(350, 270, 'THE CROSSROADS', 'The army divides', 'visited', actId)}
      ${this._loc2(548, 195, 'GILDED SPIRES', 'Trial of Lobha', 'visited', actId)}
      ${this._loc2(350, 370, 'THE BLACK CHASM', "Bali's Bridge — Act III End", 'current', actId)}

      ${this._compass(648, 395)}
      <text x="350" y="150" text-anchor="middle" fill="rgba(201,168,76,0.06)" font-family="Cinzel,serif" font-size="22" letter-spacing="4" font-weight="700">THE DARKLANDS</text>
    `;
    return this._mapShell(
      'ACT III — THE THREE TRIALS',
      'Greed. Delusion. Betrayal. Each must be faced before the march.',
      'radial-gradient(ellipse at 50% 15%, #14080a 0%, #0c0808 45%, #080608 100%)',
      content,
      `<span>◈ Current</span><span style="color:#b48c00;opacity:0.7">-- Lobha path</span><span style="color:#6400a0;opacity:0.7">-- Moha path</span><span style="color:#32a032;opacity:0.7">— Bali descent</span><span style="color:#c83c00;opacity:0.6">✕ Krodha encounter</span>`
    );
  }

  _mapAct4() {
    const actId = 'act4';
    const content = `
      <defs>
        <linearGradient id="dark4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#08000f"/>
          <stop offset="50%" stop-color="#0a0010"/>
          <stop offset="100%" stop-color="#0c0308"/>
        </linearGradient>
        <radialGradient id="mirrorGlow" cx="50%" cy="15%" r="20%">
          <stop offset="0%" stop-color="#cc00ff" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#cc00ff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="gateGlow4" cx="50%" cy="88%" r="18%">
          <stop offset="0%" stop-color="#8b0000" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#8b0000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="700" height="440" fill="url(#dark4)"/>
      <rect width="700" height="440" fill="url(#mirrorGlow)"/>
      <rect width="700" height="440" fill="url(#gateGlow4)"/>

      <!-- Fortress outer walls -->
      <path d="M 150,440 L 150,200 L 100,200 L 100,150 L 550,150 L 550,200 L 600,200 L 600,440 Z" fill="rgba(15,0,25,0.8)" stroke="rgba(75,0,130,0.3)" stroke-width="1.5"/>
      <!-- Wall battlements -->
      <path d="M 100,150 L 115,130 L 125,150 L 140,125 L 150,150 L 170,130 L 180,150 L 200,125 L 215,150 L 235,130 L 245,150 L 265,125 L 275,150 L 300,130 L 325,150 L 345,125 L 355,150 L 375,130 L 385,150 L 405,125 L 415,150 L 435,130 L 445,150 L 465,125 L 475,150 L 495,130 L 505,150 L 525,125 L 535,150 L 550,130 L 565,150" fill="rgba(20,0,35,0.9)" stroke="rgba(75,0,130,0.4)" stroke-width="1"/>

      <!-- Interior sections / floors -->
      <line x1="150" y1="330" x2="550" y2="330" stroke="rgba(75,0,130,0.25)" stroke-width="1" stroke-dasharray="8 6"/>
      <line x1="150" y1="240" x2="550" y2="240" stroke="rgba(75,0,130,0.2)" stroke-width="1" stroke-dasharray="8 6"/>
      <text x="400" y="375" fill="rgba(75,0,130,0.15)" font-family="Cormorant Garamond,serif" font-size="10" font-style="italic">Outer Courtyard</text>
      <text x="400" y="290" fill="rgba(75,0,130,0.12)" font-family="Cormorant Garamond,serif" font-size="10" font-style="italic">Inner Sanctum</text>
      <text x="400" y="200" fill="rgba(138,43,226,0.15)" font-family="Cormorant Garamond,serif" font-size="10" font-style="italic">The Mirror Chamber</text>

      <!-- The Mirror (top center) -->
      <rect x="305" y="50" width="90" height="110" rx="3" fill="rgba(20,0,40,0.95)" stroke="rgba(150,0,200,0.6)" stroke-width="1.5"/>
      <rect x="315" y="58" width="70" height="94" rx="2" fill="rgba(30,0,55,0.9)" stroke="rgba(120,0,180,0.3)" stroke-width="0.5"/>
      <!-- Kali's reflection effect -->
      <ellipse cx="350" cy="105" rx="28" ry="38" fill="rgba(100,0,160,0.15)" class="fogDrift${actId}"/>
      <text x="350" y="108" text-anchor="middle" fill="rgba(200,0,255,0.3)" font-family="serif" font-size="18">👁</text>

      <!-- Adharma fog fills from top -->
      <path d="M 150,150 Q 250,130 350,145 Q 450,130 550,150 L 550,180 Q 450,165 350,175 Q 250,162 150,180 Z" fill="rgba(75,0,130,0.12)" class="fogDrift${actId}"/>

      <!-- Path: Gate → Koka yard → Illusion field → Sanctum → Mirror -->
      <line x1="350" y1="440" x2="350" y2="390" stroke="rgba(201,168,76,0.08)" stroke-width="6"/>
      <line x1="350" y1="440" x2="350" y2="390" stroke="rgba(201,168,76,0.6)" stroke-width="1.5" class="march${actId}"/>
      <line x1="350" y1="385" x2="350" y2="335" stroke="rgba(201,168,76,0.08)" stroke-width="6"/>
      <line x1="350" y1="385" x2="350" y2="335" stroke="rgba(201,168,76,0.55)" stroke-width="1.5" class="march${actId}"/>
      <line x1="350" y1="330" x2="350" y2="245" stroke="rgba(201,168,76,0.08)" stroke-width="6"/>
      <line x1="350" y1="330" x2="350" y2="245" stroke="rgba(201,168,76,0.5)" stroke-width="1.5" class="march${actId}"/>
      <line x1="350" y1="240" x2="350" y2="165" stroke="rgba(201,168,76,0.07)" stroke-width="6"/>
      <line x1="350" y1="240" x2="350" y2="165" stroke="rgba(201,168,76,0.4)" stroke-width="1.5" class="march${actId}"/>

      <!-- Koka marker (left side, outer courtyard) -->
      <g transform="translate(215,375)">
        <circle cx="0" cy="0" r="6" fill="#8b1010" opacity="0.8"/>
        <circle cx="0" cy="0" r="10" fill="none" stroke="#8b1010" stroke-width="1" opacity="0.4"/>
        <rect x="-35" y="10" width="70" height="22" rx="2" fill="rgba(5,5,10,0.9)" stroke="rgba(140,20,20,0.4)" stroke-width="0.5"/>
        <text x="0" y="20" text-anchor="middle" fill="rgba(180,40,40,0.8)" font-family="Cinzel,serif" font-size="8" letter-spacing="1.5" font-weight="600">KOKA</text>
        <text x="0" y="29" text-anchor="middle" fill="rgba(180,40,40,0.4)" font-family="Cormorant Garamond,serif" font-size="7" font-style="italic">Single combat</text>
      </g>

      <!-- Illusion field (center, outer courtyard) -->
      <ellipse cx="450" cy="372" rx="35" ry="20" fill="rgba(40,0,80,0.3)" stroke="rgba(100,0,200,0.3)" stroke-width="1" stroke-dasharray="4 4" class="fogDrift${actId}"/>
      <text x="450" y="376" text-anchor="middle" fill="rgba(120,0,180,0.4)" font-family="Cormorant Garamond,serif" font-size="8" font-style="italic">Illusion Field</text>

      <!-- Ashwatthama door (inner sanctum side) -->
      <g transform="translate(200,285)">
        <rect x="-8" y="-15" width="16" height="25" rx="2" fill="rgba(20,10,40,0.9)" stroke="rgba(100,150,100,0.4)" stroke-width="1"/>
        <text x="0" y="-2" text-anchor="middle" fill="rgba(80,160,80,0.45)" font-family="Cormorant Garamond,serif" font-size="8">Ashwatthama</text>
        <text x="0" y="8" text-anchor="middle" fill="rgba(80,160,80,0.3)" font-family="Cormorant Garamond,serif" font-size="7" font-style="italic">holds the door</text>
      </g>

      <!-- Locations -->
      ${this._loc2(350, 400, 'GRAND GATE', 'Koka — Outer Wall', 'visited', actId)}
      ${this._loc2(350, 280, 'INNER SANCTUM', "Vikoka's domain", 'visited', actId)}
      ${this._loc2(350, 160, "THE MIRROR CHAMBER", 'Kali — Final Confrontation', 'current', actId)}

      <!-- Throne icon at very top -->
      <g transform="translate(350,25)" filter="url(#glow${actId})" opacity="0.7">
        <path d="M -15,20 L -15,0 L -8,-10 L 0,-15 L 8,-10 L 15,0 L 15,20 Z" fill="rgba(100,0,40,0.6)" stroke="rgba(150,0,60,0.6)" stroke-width="1"/>
        <text x="0" y="5" text-anchor="middle" fill="rgba(200,0,100,0.5)" font-family="serif" font-size="14">♚</text>
      </g>
      <text x="350" y="48" text-anchor="middle" fill="rgba(150,0,60,0.3)" font-family="Cormorant Garamond,serif" font-size="8" letter-spacing="3">KALI'S THRONE</text>

      ${this._compass(648, 395)}
    `;
    return this._mapShell(
      'ACT IV — THE OBSIDIAN FORTRESS',
      'What lies at the center of the Kali Yuga.',
      'radial-gradient(ellipse at 50% 50%, #0f0015 0%, #070010 45%, #040008 100%)',
      content,
      `<span>◈ Current</span><span>● Cleared</span><span style="color:#8b0000;opacity:0.7">◆ Encounter</span><span style="color:#8a2be2;opacity:0.5">~ Illusion</span>`
    );
  }

  _loc2(x, y, label, sub, type, actId) {
    const colors = { current:'#c9a84c', visited:'#7a6028', key:'#ff4040', distant:'#4a4060', danger:'#8b1010' };
    const col = colors[type] || colors.visited;
    const r = type === 'current' ? 7 : 5;
    const lw = Math.max(90, label.length * 6.5 + 14);
    const pulse = type === 'current'
      ? `<circle cx="0" cy="0" r="${r}" fill="none" stroke="${col}" class="pulse${actId}"/>`
      : '';
    return `
      <g transform="translate(${x},${y})" filter="url(#glow${actId})">
        ${pulse}
        <circle cx="0" cy="0" r="${r}" fill="${col}" opacity="${type==='distant'?0.35:0.85}"/>
        <circle cx="0" cy="0" r="${r+4}" fill="none" stroke="${col}" stroke-width="1" opacity="0.25"/>
        <rect x="${-lw/2}" y="12" width="${lw}" height="${sub?30:18}" rx="2" fill="rgba(4,4,8,0.92)" stroke="${col}" stroke-width="0.5" stroke-opacity="0.4"/>
        <text x="0" y="24" text-anchor="middle" fill="${col}" font-family="Cinzel,serif" font-size="8.5" letter-spacing="1.2" font-weight="600">${label}</text>
        ${sub ? `<text x="0" y="36" text-anchor="middle" fill="rgba(201,168,76,0.4)" font-family="Cormorant Garamond,serif" font-size="7.5" font-style="italic">${sub}</text>` : ''}
      </g>`;
  }

  _compass(cx, cy) {
    return `
      <g transform="translate(${cx},${cy})" opacity="0.55">
        <circle cx="0" cy="0" r="20" fill="rgba(4,4,8,0.7)" stroke="rgba(201,168,76,0.3)" stroke-width="1"/>
        <path d="M 0,-18 L 3,-5 L 0,-10 L -3,-5 Z" fill="#c9a84c"/>
        <path d="M 0,18 L 3,5 L 0,10 L -3,5 Z" fill="rgba(201,168,76,0.35)"/>
        <path d="M -18,0 L -5,3 L -10,0 L -5,-3 Z" fill="rgba(201,168,76,0.35)"/>
        <path d="M 18,0 L 5,3 L 10,0 L 5,-3 Z" fill="rgba(201,168,76,0.35)"/>
        <text x="0" y="-22" text-anchor="middle" fill="rgba(201,168,76,0.5)" font-family="Cinzel,serif" font-size="8" font-weight="600">N</text>
        <circle cx="0" cy="0" r="2" fill="rgba(201,168,76,0.6)"/>
      </g>`;
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
