import { Story } from 'inkjs';

export class InkWrapper {
  constructor(storyJson, uiManager) {
    this.story = new Story(storyJson);
    this.ui = uiManager;
    this.bound = false;
    this.companionIds = [
      'parashurama', 'hanuman', 'vibhishana', 'vyasa', 'bali', 'kripacharya', 'ashwatthama'
    ];
  }

  start() {
    if (!this.bound) {
      this.ui.bindChoiceHandler((index) => this.makeChoice(index));
      this.bound = true;
    }
    
    // Only continue if we aren't already at a choice point (loaded state)
    if (this.story.canContinue) {
      this.continueStory();
    } else {
      // If we loaded into a choice point, we need to refresh the UI stats/companions/choices
      this.refreshUI();
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
    tags.forEach(tag => {
      if (!tag.includes(':')) return;
      const [key, value] = tag.split(':').map(s => s.trim());
      if (key === 'title') this.ui.setTitle(value);
      if (key === 'yuga') this.ui.setYugaTheme(value);
    });
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
