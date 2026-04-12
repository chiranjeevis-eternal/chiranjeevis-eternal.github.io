export class UIManager {
  constructor() {
    this.contentDiv = document.getElementById('story-content');
    this.choicesDiv = document.getElementById('choices-container');
    this.companionsDiv = document.getElementById('companions-list');
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalBody = document.getElementById('modal-body');
    this.onChoiceSelected = null;
    
    this.lastStats = { karma: 50, dharma: 0, adharma: 10 };

    this.allCompanions = [
      { id: 'parashurama', name: 'Parashurama', icon: '🪓' },
      { id: 'hanuman', name: 'Hanuman', icon: '🟠' },
      { id: 'vibhishana', name: 'Vibhishana', icon: '🛡️' },
      { id: 'vyasa', name: 'Vyasa', icon: '📜' },
      { id: 'bali', name: 'Mahabali', icon: '🏺' },
      { id: 'kripacharya', name: 'Kripacharya', icon: '🏹' },
      { id: 'ashwatthama', name: 'Ashwatthama', icon: '👁️' }
    ];
    
    this.initCompanionPanel();
    this.initModalHandlers();
  }

  initModalHandlers() {
    document.getElementById('settings-btn').onclick = () => this.showSettings();
    document.getElementById('help-btn').onclick = () => this.showHelp();
    document.getElementById('modal-close').onclick = () => this.hideModal();
    this.modalOverlay.onclick = (e) => { if (e.target === this.modalOverlay) this.hideModal(); };
  }

  showSettings() {
    this.modalOverlay.classList.remove('hidden-fade');
    this.modalBody.innerHTML = `
      <h2 class="modal-title">SETTINGS</h2>
      <div class="modal-section">
        <h3>AUDIO</h3>
        <div class="setting-row"><span class="setting-label">Master Volume</span> <span>[||||||||--]</span></div>
        <div class="setting-row"><span class="setting-label">Narration Chants</span> <span>ON</span></div>
      </div>
      <div class="modal-section">
        <h3>VISUAL</h3>
        <div class="setting-row"><span class="setting-label">Font Size</span> <span>NORMAL</span></div>
        <div class="setting-row"><span class="setting-label">High Contrast</span> <span>OFF</span></div>
      </div>
      <div class="modal-section">
        <h3>GAME</h3>
        <div class="setting-row"><span class="setting-label">Text Speed</span> <span>80ms</span></div>
        <div class="setting-row"><span class="setting-label">Auto-Save</span> <span>ACTIVE</span></div>
      </div>
    `;
  }

  showHelp() {
    this.modalOverlay.classList.remove('hidden-fade');
    this.modalBody.innerHTML = `
      <h2 class="modal-title">PILGRIM'S GUIDE</h2>
      <div class="modal-section">
        <h3>CURRENT STAGE: SHAMBHALA</h3>
        <p>You have awakened in the sacred village of Shambhala. The disciples of Adharmendra have breached the sanctuary. You must find the Elder and make your way to the Mahendra Mountains.</p>
      </div>
      <div class="modal-section">
        <h3>WORLD MAP</h3>
        <div id="world-map">
          [SHAMBHALA] ----(Valley of Ash)----> [MAHENDRA PEAKS]<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[?? LANKA ??]
        </div>
      </div>
      <div class="modal-section">
        <h3>DHARMIC PATHS</h3>
        <div class="help-guide-entry"><span class="help-guide-title">KARMA:</span> Your soul's vibration. High karma unlocks divine interventions.</div>
        <div class="help-guide-entry"><span class="help-guide-title">DHARMA:</span> Your alignment with the cosmic order. Grows as you find Chiranjeevis.</div>
        <div class="help-guide-entry"><span class="help-guide-title">ADHARMA:</span> The corruption within. High adharma darkens the world and your choices.</div>
      </div>
    `;
  }

  hideModal() {
    this.modalOverlay.classList.add('hidden-fade');
  }

  bindChoiceHandler(callback) {
    this.onChoiceSelected = callback;
  }

  clearUI() {
    this.contentDiv.innerHTML = '';
    this.choicesDiv.innerHTML = '';
  }

  setTitle(title) {
    document.getElementById('scene-title').textContent = title;
  }

  setYugaTheme(yuga) {
    document.body.className = `yuga-${yuga}`;
    document.getElementById('yuga-indicator').textContent = `◉ ${yuga.toUpperCase()} YUGA`;
  }

  updateStats(stats) {
    const keys = ['karma', 'dharma', 'adharma'];
    keys.forEach(key => {
      const newVal = stats[key];
      const oldVal = this.lastStats[key];
      const delta = newVal - oldVal;
      if (delta !== 0) this.triggerStatAnimation(key, newVal, delta);
    });
    this.lastStats = { ...stats };
  }

  triggerStatAnimation(key, newVal, delta) {
    const valEl = document.getElementById(`stat-${key}-val`);
    const barEl = document.getElementById(`bar-${key}`);
    
    let color = 'var(--c-gold)';
    if (key === 'dharma') color = '#e07020';
    if (key === 'adharma') color = 'var(--c-adharma)';
    if (key === 'karma' && delta < 0) color = 'var(--c-kali-red)';

    valEl.textContent = newVal;
    barEl.style.width = `${Math.min(Math.max(newVal, 0), 100)}%`;
    valEl.style.color = color;
    barEl.style.color = color;

    valEl.classList.remove('val-pop');
    barEl.classList.remove('stat-pulse');
    void valEl.offsetWidth; 
    valEl.classList.add('val-pop');
    barEl.classList.add('stat-pulse');

    const deltaEl = document.createElement('div');
    deltaEl.className = 'float-delta';
    deltaEl.textContent = delta > 0 ? `+${delta}` : delta;
    deltaEl.style.color = color;
    
    const rect = valEl.getBoundingClientRect();
    deltaEl.style.left = `${rect.left}px`;
    deltaEl.style.top = `${rect.top}px`;
    
    document.body.appendChild(deltaEl);
    setTimeout(() => {
      deltaEl.remove();
      valEl.style.color = '';
    }, 1200);
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
      this.companionsDiv.appendChild(slot);
    });
  }

  updateCompanions(activeIds) {
    this.allCompanions.forEach(comp => {
      const slot = document.getElementById(`comp-slot-${comp.id}`);
      if (activeIds.includes(comp.id)) {
        slot.classList.add('discovered');
      } else {
        slot.classList.remove('discovered');
      }
    });
  }

  renderProse(paragraphs) {
    const isVision = document.body.classList.contains('yuga-satya') || 
                     document.body.classList.contains('yuga-treta') || 
                     document.body.classList.contains('yuga-dvapara');

    paragraphs.forEach((text, i) => {
      const p = document.createElement('p');
      p.className = 'story-paragraph';
      if (isVision) p.classList.add('vision-text');
      let parsedText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="prose-link">$1</a>');
      p.innerHTML = parsedText;
      p.style.animationDelay = `${i * 0.4}s`; 
      this.contentDiv.appendChild(p);
    });
  }

  renderChoices(choices) {
    if (choices.length === 0) return;
    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      const delay = (this.contentDiv.children.length * 0.4) + (idx * 0.2);
      btn.style.animationDelay = `${delay}s`;
      btn.classList.add('reveal');
      btn.onclick = () => { if (this.onChoiceSelected) this.onChoiceSelected(choice.index); };
      this.choicesDiv.appendChild(btn);
    });
  }
}
