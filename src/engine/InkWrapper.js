import { Story } from 'inkjs';

export class InkWrapper {
  constructor(storyJson, uiManager) {
    this.story = new Story(storyJson);
    this.ui = uiManager;
    this.bound = false;
    this.companionIds = [
      'parashurama', 'hanuman', 'vibhishana', 'vyasa', 'bali', 'kripacharya', 'ashwatthama'
    ];
    this._pendingVisionMeta = {}; // collects vision_* tags before overlay fires
  }

  start() {
    if (!this.bound) {
      this.ui.bindChoiceHandler((index) => this.makeChoice(index));
      this.bound = true;
    }
    
    if (this.story.canContinue) {
      this.continueStory();
    } else {
      // Restore last prose from storage for visual continuity
      const lastProse = JSON.parse(localStorage.getItem('chiranjeevis_last_prose') || '[]');
      this.refreshUI(lastProse);
    }
  }

  continueStory() {
    let prose = [];
    let tags = [];

    while (this.story.canContinue) {
      const line = this.story.Continue().trim();
      if (line) prose.push(line);
      if (this.story.currentTags) {
        tags = tags.concat(this.story.currentTags);
      }
    }

    this.processTags(tags);
    localStorage.setItem('chiranjeevis_last_prose', JSON.stringify(prose));
    this.refreshUI(prose);
    this.save();
  }

  refreshUI(newProse = []) {
    const stats = {
      karma: this.story.variablesState["karma"] || 50,
      dharma: this.story.variablesState["dharma"] || 0,
      adharma: this.story.variablesState["adharma"] || 10
    };
    
    const activeCompanions = this.companionIds.filter(id => {
      return this.story.variablesState[`comp_${id}`] === true;
    });

    this.ui.updateStats(stats);
    this.ui.updateCompanions(activeCompanions);
    
    if (newProse.length > 0) {
      this.ui.renderProse(newProse);
    }
    
    this.ui.renderChoices(this.story.currentChoices);
  }

  processTags(tags) {
    // First pass: harvest all metadata tags in this batch
    tags.forEach(tag => {
      if (!tag.includes(':')) return;
      const [key, value] = tag.split(':').map(s => s.trim());
      if (key === 'vision_yuga')        this._pendingVisionMeta.yuga = value;
      if (key === 'vision_title')       this._pendingVisionMeta.title = value;
      if (key === 'vision_chiranjeevi') this._pendingVisionMeta.chiranjeevi = value;
    });

    // Second pass: act on command tags
    tags.forEach(tag => {
      if (!tag.includes(':')) return;
      const [key, value] = tag.split(':').map(s => s.trim());
      if (key === 'title')      this.ui.setTitle(value);
      if (key === 'yuga')       this.ui.setYugaTheme(value);
      if (key === 'background') this.ui.setBackground(value);
      if (key === 'encounter')  this.processEncounter(value);
      if (key === 'actMap')     this.ui.showMap(value);

      if (key === 'overlay') {
        if (value === 'memory_vision') {
          // Fire the cinematic overlay with accumulated metadata
          this.ui.showMemoryVision({ ...this._pendingVisionMeta });
          this._pendingVisionMeta = {};
        } else if (value === 'end') {
          this.ui.hideMemoryVision();
        }
      }
    });
  }

  processEncounter(id) {
    const encounters = {
      adharmendra: {
        id: 'adharmendra',
        name: 'Adharmendra',
        bio: 'The Corrupted General. A man who sought to protect his kingdom by taking the power Kali offered, only to become a slave to the very darkness he feared.',
        aura: 'TRAGIC COLLAPSE'
      },
      koka: {
        id: 'koka',
        name: 'Koka',
        bio: 'The General of the Void. A monstrous entity in black plate who knows only the logic of the sword.',
        aura: 'ABSOLUTE COLD'
      },
      kali: {
        id: 'kali',
        name: 'Kali',
        bio: 'The Demon King. The personification of ego, greed, and the decay of the spiritual world.',
        aura: 'TOTAL OBLIVION'
      }
    };

    if (encounters[id]) {
      this.ui.showEncounter(encounters[id]);
    }
  }

  makeChoice(index) {
    try {
      this.story.ChooseChoiceIndex(index);
      this.ui.clearUI();
      this.continueStory();
    } catch (e) {
      console.error("Choice evaluation failed:", e);
    }
  }

  save() {
    try {
      const state = this.story.state.toJson();
      localStorage.setItem('chiranjeevis_eternal_save', state);
    } catch (e) {
      console.warn("Save failed:", e);
    }
  }

  load() {
    const savedState = localStorage.getItem('chiranjeevis_eternal_save');
    if (savedState) {
      try {
        this.story.state.LoadJson(savedState);
        this.ui.clearUI();
        // Don't call continueStory here, start() will handle it via refreshUI
      } catch (e) {
        console.error("Load failed:", e);
        localStorage.removeItem('chiranjeevis_eternal_save');
      }
    }
  }
}
