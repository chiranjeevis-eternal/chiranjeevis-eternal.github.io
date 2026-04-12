import { Story } from 'inkjs';

export class InkWrapper {
  constructor(storyJson, uiManager) {
    this.story = new Story(storyJson);
    this.ui = uiManager;
    this.companionIds = [
      'parashurama', 'hanuman', 'vibhishana', 'vyasa', 'bali', 'kripacharya', 'ashwatthama'
    ];
  }

  start() {
    this.ui.bindChoiceHandler((index) => this.makeChoice(index));
    this.continueStory();
  }

  continueStory() {
    let prose = [];
    let tags = [];

    // Advance story until we hit a choice or end
    while (this.story.canContinue) {
      const line = this.story.Continue().trim();
      if (line) prose.push(line);
      if (this.story.currentTags) {
        tags = tags.concat(this.story.currentTags);
      }
    }

    this.processTags(tags);
    
    // Read stats from Ink state
    const stats = {
      karma: this.story.variablesState["karma"] || 50,
      dharma: this.story.variablesState["dharma"] || 0,
      adharma: this.story.variablesState["adharma"] || 10
    };
    
    // Update active companions
    const activeCompanions = this.companionIds.filter(id => {
      // Check for variables named 'comp_[id]'
      return this.story.variablesState[`comp_${id}`] === true;
    });

    this.ui.updateStats(stats);
    this.ui.updateCompanions(activeCompanions);
    this.ui.renderProse(prose);
    this.ui.renderChoices(this.story.currentChoices);
    
    // Auto-save on each turn
    this.save();
  }

  processTags(tags) {
    tags.forEach(tag => {
      const [key, value] = tag.split(':').map(s => s.trim());
      if (key === 'title') this.ui.setTitle(value);
      if (key === 'yuga') this.ui.setYugaTheme(value);
    });
  }

  makeChoice(index) {
    this.story.ChooseChoiceIndex(index);
    this.ui.clearUI();
    this.continueStory();
  }

  save() {
    const state = this.story.state.toJson();
    localStorage.setItem('chiranjeevis_eternal_save', state);
  }

  load() {
    const savedState = localStorage.getItem('chiranjeevis_eternal_save');
    if (savedState) {
      this.story.state.LoadJson(savedState);
      this.ui.clearUI();
      this.continueStory();
    }
  }
}
