import { Story } from 'inkjs';

export class InkWrapper {
  constructor(storyJson, uiManager) {
    this.story = new Story(storyJson);
    this.ui = uiManager;
    this.bound = false;
    this.companionIds = [
      'parashurama', 'hanuman', 'vibhishana', 'vyasa', 'bali', 'kripacharya', 'ashwatthama'
    ];
    this._pendingVisionMeta = {};
  }

  start() {
    if (!this.bound) {
      this.ui.bindChoiceHandler((index) => this.makeChoice(index));
      this.bound = true;
    }
    if (this.story.canContinue) {
      this.continueStory();
    } else {
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
      if (this.story.currentTags) tags = tags.concat(this.story.currentTags);
    }
    this.processTags(tags);
    localStorage.setItem('chiranjeevis_last_prose', JSON.stringify(prose));
    this.refreshUI(prose);
    this.save();
  }

  refreshUI(newProse = []) {
    const stats = {
      karma:   this.story.variablesState["karma"]   || 50,
      dharma:  this.story.variablesState["dharma"]  || 0,
      adharma: this.story.variablesState["adharma"] || 10,
      essence: this.story.variablesState["essence"] ?? 100
    };
    const activeCompanions = this.companionIds.filter(id =>
      this.story.variablesState[`comp_${id}`] === true
    );
    this.ui.updateStats(stats);
    this.ui.updateCompanions(activeCompanions);
    if (newProse.length > 0) this.ui.renderProse(newProse);
    this.ui.renderChoices(this.story.currentChoices);
  }

  // Parse tag into { key, value } — handles both "key:value" and bare "key" forms
  _parseTag(tag) {
    const colonIdx = tag.indexOf(':');
    if (colonIdx === -1) return { key: tag.trim(), value: 'true' };
    return { key: tag.slice(0, colonIdx).trim(), value: tag.slice(colonIdx + 1).trim() };
  }

  processTags(tags) {
    // First pass: collect vision metadata
    tags.forEach(tag => {
      const { key, value } = this._parseTag(tag);
      if (key === 'vision_yuga')        this._pendingVisionMeta.yuga = value;
      if (key === 'vision_title')       this._pendingVisionMeta.title = value;
      if (key === 'vision_chiranjeevi') this._pendingVisionMeta.chiranjeevi = value;
    });

    // Second pass: execute commands
    tags.forEach(tag => {
      const { key, value } = this._parseTag(tag);

      if (key === 'title')      this.ui.setTitle(value);
      if (key === 'yuga')       this.ui.setYugaTheme(value);
      if (key === 'background') this.ui.setBackground(value);
      if (key === 'encounter')  this.processEncounter(value);
      if (key === 'actMap')     this.ui.showMap(value);
      if (key === 'companion_pulse')  this.ui.pulseCompanion(value);
      if (key === 'companion_joined') {
        const comp = this.ui.allCompanions.find(c => c.id === value);
        if (comp) this.ui.showCompanionLore(comp);
      }
      if (key === 'shake')  this.ui.shakeScene(value);
      if (key === 'flash' && value === 'red') this.ui.flashRed();
      if (key === 'distortion') this.ui.setDistortion(value === 'start');

      if (key === 'audio') {
        const sceneAudioMap = {
          'thunder_march':    'kali',
          'absolute_silence': 'kali',
          'victory_bells':    'satya',
          'battle_hymn':      'treta',
          'ancient_drone':    'dvapara'
        };
        const yugaLayer = sceneAudioMap[value];
        if (yugaLayer && this.ui.audio) this.ui.audio.playProceduralYuga(yugaLayer);
      }

      if (key === 'stat_change') {
        if (value.includes('dharma')) this.ui.spawnEmberBurst(8);
        if (value.includes('karma'))  this.ui.spawnEmberBurst(5);
      }

      // Both game_end (bare tag) and game_over (legacy) trigger the ending screen
      if (key === 'game_end' || key === 'game_over') {
        const stats = {
          karma:   this.story.variablesState["karma"]   || 50,
          dharma:  this.story.variablesState["dharma"]  || 0,
          adharma: this.story.variablesState["adharma"] || 0,
          title:   this.ui.currentTitle
        };
        this.ui.showEndSummary(stats, this.ui.activeCompanions);
      }

      if (key === 'calculate_betrayer') {
        let lowestAffinity = Infinity;
        let betrayer = 'vibhishana';
        this.companionIds.forEach(id => {
          if (this.story.variablesState[`comp_${id}`]) {
            const aff = this.story.variablesState[`aff_${id}`] || 0;
            if (aff < lowestAffinity) { lowestAffinity = aff; betrayer = id; }
          }
        });
        this.story.variablesState["betrayer_id"] = betrayer;
      }

      if (key === 'overlay') {
        if (value === 'memory_vision') {
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
        id: 'adharmendra', name: 'Adharmendra', vice: 'EGO / FALSE AUTHORITY',
        bio: 'A once-dharmic king who accepted Kali\'s power to protect his kingdom and became its slave. His armour is fused to his skin by violet fire. He is corruption with a conscience.',
        aura: 'TRAGIC COLLAPSE'
      },
      koka: {
        id: 'koka', name: 'Koka', vice: 'BRUTE AUTHORITY',
        bio: 'General of the Outer Wall. A giant in black mail who knows only the logic of the sword. Unlike wraiths, honour still burns in his eyes — warped, but present.',
        aura: 'ABSOLUTE COLD'
      },
      vikoka: {
        id: 'vikoka', name: 'Vikoka', vice: 'HIDDEN CONTROL',
        bio: 'Commander of Kali\'s interior agents. His face is never seen. He operates through whispers, proxies, and fear — the shadow behind every betrayal.',
        aura: 'UNSEEN HAND'
      },
      lobha: {
        id: 'lobha', name: 'Lobha', vice: 'GREED',
        bio: 'Kali\'s merchant-lord. He controls trade routes, buys kings, and turns sacred things into commodities. He does not fight — he purchases.',
        aura: 'GOLDEN CORRUPTION'
      },
      krodha: {
        id: 'krodha', name: 'Krodha', vice: 'WRATH',
        bio: 'Kali\'s warlord of internal strife. He turns warriors against each other, fans civil wars, and convinces the righteous that violence is always justified.',
        aura: 'RIGHTEOUS FIRE'
      },
      moha: {
        id: 'moha', name: 'Moha', vice: 'DELUSION',
        bio: 'The most dangerous lieutenant. He creates false religious movements and comfortable lies that serve Kali\'s agenda without followers\' knowledge.',
        aura: 'COMFORTABLE BLINDNESS'
      },
      mada: {
        id: 'mada', name: 'Mada', vice: 'ARROGANCE',
        bio: 'Kali\'s seducer of power. He offers glamour, adoration, and the intoxication of authority. Every great fall begins with his whisper.',
        aura: 'SWEET POISON'
      },
      matsarya: {
        id: 'matsarya', name: 'Matsarya', vice: 'ENVY',
        bio: 'Kali\'s illusionist. He shows companions reflections of what they could have been, seeding doubt and turning loyalty into resentment by inches.',
        aura: 'MIRROR OF WOUNDS'
      },
      kali: {
        id: 'kali', name: 'Kali', vice: 'THE AGE ITSELF',
        bio: 'Not a single demon but the personification of the Kali Yuga — the spirit of discord, ego, and impurity. He wants to rule the world at its lowest. He speaks in half-truths and has been winning for a thousand years.',
        aura: 'TOTAL OBLIVION'
      }
    };
    if (encounters[id]) this.ui.showEncounter(encounters[id]);
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
      localStorage.setItem('chiranjeevis_eternal_save', JSON.stringify({
        ink: this.story.state.toJson(),
        ui:  this.ui.getState()
      }));
    } catch (e) {
      console.warn("Save failed:", e);
    }
  }

  load() {
    const rawData = localStorage.getItem('chiranjeevis_eternal_save');
    if (!rawData) return;
    try {
      let loaded = JSON.parse(rawData);
      if (typeof loaded === 'string') {
        this.story.state.LoadJson(loaded);
      } else {
        this.story.state.LoadJson(loaded.ink);
        this.ui.restoreState(loaded.ui);
      }
      this.ui.clearUI();
    } catch (e) {
      console.error("Load failed:", e);
      localStorage.removeItem('chiranjeevis_eternal_save');
    }
  }
}
