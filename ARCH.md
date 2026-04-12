# 🏗️ Chiranjeevis Eternal: The Age of Kali
## Architecture Document — Tech Stack: Ink + Vanilla JS

---

## 1. TECH STACK DECISION

### Why Ink (`inkjs`) + Vanilla JS

| Consideration | Decision | Rationale |
|---|---|---|
| **Narrative Engine** | **Ink** (`inkjs`) | Industry standard for branching logic (used in *80 Days*). Native variable tracking, loops, and weaves without writing JSON. |
| **UI Framework** | **Vanilla JS** | Zero framework overhead. We need to build a custom, highly animated cinematic UI, which is easier to control via pure DOM/CSS. |
| **Distribution** | Single HTML + assets | Itch.io requires a zip of static files. Ink compiles to a single `.json` file that JS loads. |
| **Dev Experience** | Vite | HMR, bundling, and local dev server. |
| **State Management** | **Ink Engine** | Ink handles *everything* narrative (Karma, logic, visited scenes). JS just reads `story.variablesState`. |
| **UI / Tags Sync** | Ink Tags | We will use `# tags` in Ink to trigger UI changes (e.g., `# yuga: satya`, `# sound: gong`). |

---

## 2. FINAL TECH STACK

```
Runtime:       Browser (Chrome 110+, Firefox 110+, Safari 16+)
Build Tool:    Vite 5.x
Language:      Vanilla JavaScript (ES2022 modules)
Story Script:  Ink + inkjs (npm package)
Styling:       Vanilla CSS (custom properties)
Fonts:         Google Fonts (Cinzel, Cormorant Garamond)
Audio:         Web Audio API (native browser)
Persistence:   localStorage API
```

---

## 3. REPOSITORY STRUCTURE

```
chiranjeevis-if/
│
├── index.html                    # Entry point — single page shell
├── package.json                  # Vite & inkjs dependencies
├── vite.config.js                
│
├── src/
│   │
│   ├── main.js                   # Bootstrap — loads story.json, starts UI
│   │
│   ├── engine/
│   │   ├── InkController.js      # Wraps inkjs. Controls flow, reads tags, bridges to UI
│   │   └── SaveManager.js        # Handles inkjs save/load state strings to localStorage
│   │
│   ├── ui/
│   │   ├── UIManager.js          # Orchestrator
│   │   ├── TypewriterEngine.js   # Word-by-word prose reveal
│   │   ├── ChoiceRenderer.js     # Buttons for Ink choices
│   │   ├── CompanionPanel.js     # Reads Ink state to show active companions
│   │   ├── StatsPanel.js         # Reads Ink variable state (Karma, etc.)
│   │   └── SceneTransition.js    # Visual transitions based on tags
│   │
│   ├── audio/
│   │   └── AudioEngine.js        # Reads `# audio` tags from Ink and triggers sounds
│   │
│   └── style.css                 # All UI styling
│
├── story/                        # Raw Ink files (written by narrative designer)
│   ├── main.ink                  # Master file that INCLUDEs everything else
│   ├── prologue.ink              # P1–P3
│   ├── act1.ink                  # Act 1 scenes
│   ├── act2.ink                  # Act 2 scenes
│   ├── act3.ink                  # Act 3 scenes
│   ├── act4.ink                  # Act 4 + Endings
│   └── story.json                # Compiled Ink file loaded by the game at runtime
│
└── blueprints/                   # Design documentation
```

---

## 4. CORE MODULE DESIGN: HOW WE USE INK

### 4.1 Ink as the Single Source of Truth
Instead of maintaining a JS state object, we declare variables in `main.ink`:

```ink
// main.ink
VAR karma = 50
VAR dharma = 0
VAR adharma = 10
VAR yuga = "kali"

// Companions (booleans instead of arrays makes checking easier in Ink)
VAR comp_parashurama = false
VAR comp_hanuman = false

INCLUDE prologue.ink
INCLUDE act1.ink

-> prologue_p1
```

### 4.2 Writing Scenes with Tags
Ink supports `# tags`. We use these to command the UI from inside the script.

```ink
// act1.ink
=== act1_scene_3 ===
# title: The First Violence
# yuga: kali
# audio_scene: tension_low

They came at dusk. No banner. No declaration. 

Three soldiers in foreign armour moved through Shambhala's eastern edge like water through cracks.

+ [Rush into the street. You will fight them.]
    ~ karma -= 5
    ~ adharma += 5
    # stat_change: karma_down
    You rush forward, unarmed and angry. It ends quickly. 
    -> act1_scene_4_defeat

+ [Wake the nearest family quietly.]
    ~ karma += 10
    ~ dharma += 5
    # stat_change: karma_up
    You duck low, moving from shadow to shadow.
    -> act1_scene_4_protected
```

### 4.3 InkController.js (JS Side)
This JS module wraps `inkjs`. It calls `story.Continue()` to get the next line of text, reads the `# tags`, and passes data to the UI.

```js
import { Story } from 'inkjs';
import storyContent from '../story/story.json';

export class InkController {
  constructor(ui, audio) {
    this.story = new Story(storyContent);
    this.ui = ui;
    this.audio = audio;
  }

  continueStory() {
    let prose = [];
    let tags = [];

    // Advance story until we hit a choice or end
    while (this.story.canContinue) {
      prose.push(this.story.Continue());
      tags = tags.concat(this.story.currentTags || []);
    }

    this.processTags(tags);                     // e.g. change UI color, play sound
    this.ui.renderProse(prose);                 // Send text to typewriter
    this.ui.updateStats({                       // Fetch live variables
      karma: this.story.variablesState["karma"],
      dharma: this.story.variablesState["dharma"]
    });
    this.ui.renderChoices(this.story.currentChoices); 
  }

  makeChoice(choiceIndex) {
    this.story.ChooseChoiceIndex(choiceIndex);
    this.continueStory();
  }

  save() {
    const jsonState = this.story.state.toJson();
    localStorage.setItem('chiranjeevis_save', jsonState);
  }
}
```

---

## 5. UI SPECIFICS VIA TAGS

To build the cinematic UI without messing up the clean Ink logic, the JS engine will "listen" for specific tag patterns on a scene:

| Tag | Purpose in UI |
|---|---|
| `# title: [Text]` | Updates the top header title |
| `# yuga: [satya/treta/dvapara/kali]` | Triggers CSS color palette crossfade |
| `# audio_layer: [bgm/sfx]` | Starts/stops ambient tracks or fires SFX |
| `# companion_pulse: [name]` | Makes the companion portrait pulse on the sidebar |
| `# overlay: memory_vision` | Triggers the specific full-screen Yuga effect |

---

## 6. DATA FLOW DIAGRAM

```
User Clicks Choice Button
    │
    ▼
InkController.makeChoice(index)
    │
    ▼
[ inkjs Engine evaluates logic & stats ]
    │
    ▼
InkController.continueStory()
    ├─► Extracts paragraph text
    ├─► Extracts #tags
    ├─► Reads variablesState (Karma, etc.)
    │
    ▼
UIManager
    ├─► Plays Audio (from #tags)
    ├─► Changes CSS theme (from #tags)
    ├─► Animates Stat Bars (from variable read)
    ├─► Typewriter reveals text
    └─► Renders new Choices
```

---

## 7. DEVELOPMENT WORKFLOW

1. Writer writes in `.ink` using the **Inky editor** (which supports instant playtesting).
2. The `.ink` script is compiled into `story.json`.
3. The Vite dev server automatically hot-reloads `story.json` into the browser.
4. The JS frontend simply acts as a gorgeous "projector" for the logic running inside Ink.
