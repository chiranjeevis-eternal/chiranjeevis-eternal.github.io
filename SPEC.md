# 📋 Chiranjeevis Eternal: The Age of Kali
## Product Specification — Phased Build Plan v1.0

---

## 1. PROJECT GOALS

| Goal | Description |
|---|---|
| **Primary** | A premium, browser-playable text-based interactive fiction experience |
| **Audience** | Adults 25–45 with interest in Indian mythology, narrative games, literary fiction |
| **Platform** | Desktop-first web (Chrome/Firefox/Safari), fully responsive to mobile |
| **Distribution** | itch.io (primary), self-hosted (secondary), potential Hosted Games submission |
| **Tone** | Cinematic, literary, spiritual — not casual. Every word earns its place. |
| **Benchmark UX** | Inkle's *80 Days*, Failbetter's *Fallen London*, *Disco Elysium* (text density) |

---

## 2. VISUAL DESIGN SPECIFICATION

### 2.1 Design Philosophy

> **"Sacred Text meets Cinematic Dark Mode"**

The interface must feel like reading an ancient illuminated manuscript — but rendered in
the language of premium modern dark UI. Every element reinforces the mythological gravity
of the story. No element is decorative without purpose.

Three guiding rules:
1. **Restraint over decoration** — whitespace is sacred. Do not fill it.
2. **Typography is the art** — with no images, type carries the visual weight.
3. **Colour signals meaning** — each Yuga has its own palette; the UI visibly shifts.

---

### 2.2 Typography System

| Usage | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Game Title / Act Headings | `Cinzel Decorative` | 700 | 2rem–4rem | All-caps. Letterspacing 0.15em. |
| Scene Titles | `Cinzel` | 600 | 1.2rem | Caps. Subtle gold underline. |
| Body Prose | `Cormorant Garamond` | 400 | 1.2rem | Line height 2.0. Max width 680px. |
| Memory Vision Prose | `Cormorant Garamond` | 400 italic | 1.1rem | Slightly smaller. Softer glow. |
| Choice Labels | `Cinzel` | 500 | 0.95rem | All-caps. Letterspacing 0.1em. |
| Companion Voice | `Cormorant Garamond` | 400 italic | 1.05rem | Left border accent in companion's colour. |
| UI Labels / Stats | `Cinzel` | 400 | 0.75rem | All-caps. Muted opacity. |
| Villain Dialogue | `Cormorant Garamond` | 400 | 1.1rem | Dark red accent. No quote marks — just width indent. |

**Font loading:** Google Fonts. Load Cinzel, Cinzel Decorative, Cormorant Garamond.
**Fallback stack:** `Georgia, 'Times New Roman', serif`

---

### 2.3 Color System (CSS Custom Properties)

#### Base Palette (Kali Yuga — Default)
```css
--c-bg:           #0a0a0f;   /* Deep obsidian */
--c-surface:      #111118;   /* Card / panel background */
--c-border:       #2a2a3a;   /* Subtle border */
--c-text:         #e8e0d0;   /* Warm off-white prose */
--c-text-muted:   #7a7080;   /* Labels, hints */
--c-gold:         #c9a84c;   /* Primary accent — dharma, choice hover */
--c-gold-dim:     #7a6530;   /* Muted gold — inactive states */
--c-adharma:      #6b21a8;   /* Adharma violet */
--c-kali-red:     #8b1a1a;   /* Villain / danger */
--c-kali-fog:     rgba(107,33,168,0.15); /* Adharma fog overlay */
```

#### Satya Yuga Palette (Memory Visions)
```css
--c-yuga-bg:      #1c180f;   /* Deep amber-black */
--c-yuga-surface: #262115;   /* Dark gold-tinted surface */
--c-yuga-accent:  #e6b840;   /* Bright gold */
--c-yuga-text:    #f5eedc;   /* Warm parchment text */
--c-yuga-glow:    rgba(230, 184, 64, 0.3);
```

#### Treta Yuga Palette (Memory Visions)
```css
--c-yuga-bg:      #1a0800;   /* Burnt amber dark */
--c-yuga-surface: #2a1200;
--c-yuga-accent:  #e07020;   /* Saffron flame */
--c-yuga-text:    #f5d0a0;
--c-yuga-glow:    rgba(224, 112, 32, 0.3);
```

#### Dvapara Yuga Palette (Memory Visions)
```css
--c-yuga-bg:      #0d0d12;   /* Cold ash-steel dark */
--c-yuga-surface: #15151c;
--c-yuga-accent:  #8a9aba;   /* Cold blue-steel */
--c-yuga-text:    #c8c0b0;
--c-yuga-glow:    rgba(138, 154, 186, 0.25);
```

---

### 2.4 Layout Specification

```
┌─────────────────────────────────────────────────────────┐
│  HEADER BAR  [Act / Scene Title]         [Stats Strip]  │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  ┌──────────────────────────────────┐  ┌────────────┐  │
│  │                                  │  │ COMPANION  │  │
│  │   PROSE COLUMN                   │  │  PANEL     │  │
│  │   (max 680px, centered)          │  │            │  │
│  │                                  │  │ [portrait] │  │
│  │   Typewriter text reveals        │  │ [name]     │  │
│  │   word by word...                │  │ [voice]    │  │
│  │                                  │  │            │  │
│  │   ─────────────────              │  │ scrollable │  │
│  │                                  │  │ as more    │  │
│  │   CHOICE AREA (fades in after)   │  │ join       │  │
│  │   [ Choice 1 ]                   │  └────────────┘  │
│  │   [ Choice 2 ]                   │                  │
│  │   [ Choice 3 ]                   │  ┌────────────┐  │
│  │                                  │  │ KARMA BAR  │  │
│  └──────────────────────────────────┘  │ FOG BAR    │  │
│                                        │ DHARMA BAR │  │
│  FOOTER: [Yuga Indicator] [Save] [?]   └────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Mobile Layout (< 768px):**
- Single column. Stats strip collapses to a thin top bar (icon-only).
- Companion panel becomes a swipe-up drawer.
- Choice area anchors to bottom of screen.
- Header hides on scroll-down, reveals on scroll-up.

---

### 2.5 Key UI Components

#### A. Prose Area
- Max width: 680px, horizontally centered
- Line height: 2.0 (breathing room is essential)
- Paragraph spacing: 1.5em between paragraphs
- New paragraphs appear after previous one fully reveals

#### B. Typewriter Engine (word-by-word, not character)
- Speed: 80ms per word (default), 120ms in Memory Visions (slower, more weight)
- Player can click/tap to complete the current paragraph instantly
- No skipping entire scenes — only "complete current paragraph"
- After all prose reveals: 600ms pause → choice area fades in

#### C. Choice Buttons
- Each choice is a full-width block button
- Hover: gold left border, text brightens, background lifts slightly
- Locked choices (requires companion not yet recruited): shown greyed with a lock icon
  and tooltip: *"Requires [Chiranjeevi Name]"*
- Choices fade in one at a time (150ms stagger)
- Selected choice: brief gold flash, prose area clears, next scene loads

#### D. Companion Panel (Desktop Sidebar)
- Each recruited companion has a slot: icon glyph + name + status
- When a companion has reactive dialogue for the current scene:
  their panel slot pulses with their accent colour
- Clicking a pulsing companion slot reveals their voice line in the prose area
  as an indented, italic, bordered block
- Companion slots stagger-animate in as they are recruited

#### E. Stats Bars (Right Column Desktop / Top Strip Mobile)
```
KARMA      [▓▓▓▓▓▓▓░░░]  68  (Gold fill — shifts red below 30)
DHARMA     [▓▓▓▓░░░░░░]  42  (Saffron fill — grows with companions)
ADHARMA    [▓▓░░░░░░░░]  20  (Violet fill — enemy; player wants low)
```
- Bars animate smoothly when values change (+/- effects)
- On change: floating "+10 KARMA" text pulses at the bar, fades up

#### F. Yuga Indicator (Footer)
- A small glowing orb showing the current Yuga: `◉ KALI YUGA`
- During Memory Visions: shifts to the Yuga colour + label
- Subtle pulse animation

#### G. Memory Vision Overlay
- Full-screen crossfade to the Yuga's palette
- "MEMORY VISION" label appears top-centre in a faded stamp style
- Prose column narrows slightly (560px) — feels more intimate
- A thin "← VISION" breadcrumb shows path back to present
- Ambient audio shifts immediately with a 2s crossfade

---

### 2.6 Animations & Transitions

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Scene Load | Fade in from black | 800ms | ease-out |
| Prose Paragraphs | Word-by-word typewriter | ~80ms/word | linear |
| Choice Buttons | Stagger fade-in from below | 150ms each | ease-out |
| Choice Hover | Left border slides in, bg lifts | 150ms | ease |
| Scene Exit | Prose column fades + slides up slightly | 500ms | ease-in |
| Memory Vision Entry | Full screen crossfade to Yuga palette | 1200ms | ease |
| Memory Vision Exit | Reverse crossfade | 1000ms | ease |
| Companion Pulse | Soft glow ring on companion icon | 1000ms loop | sine |
| Stat Change | Bar fill animates, floating text | 400ms | ease-out |
| Karma Shift (dramatic) | Screen edge flicker in karma colour | 600ms | ease |
| Act Title Card | Fade in, hold 3s, fade out | Total 5s | ease |

**No parallax. No scroll animations. No page transitions with movement.**
The prose is the experience. Visual effects support; they do not compete.

---

## 3. UX GUIDELINES

### 3.1 Core Principles

1. **Never surprise the player punitively** — locked choices show reason; consequences feel earned.
2. **The text must breathe** — resist adding more UI. Every element earns its place.
3. **Progress is always visible** — Act position shown; scene count visible. The player always knows where they are.
4. **State must be persistent** — autosave after every choice. The player cannot lose progress.
5. **Repetition must be skippable** — on second playthrough, a "I've read this" mode that speeds up typewriter 5x.

### 3.2 Interaction Flow Per Scene

```
Scene Load
    → Header updates: Act name + Scene title
    → Yuga indicator updates
    → Background colour/texture shifts to current Yuga (subtle)
    → Prose fades in
    → Typewriter begins (paragraph by paragraph)
    → After each paragraph: 300ms pause before next begins
    → If companion voice exists: companion panel pulses
    → [Player can click companion to see their reaction]
    → All prose complete → 600ms pause → choice buttons stagger in
    → Player clicks choice → stat changes animate → brief flash → scene exit
    → Next scene loads
```

### 3.3 Save System
- **Autosave** after every choice (localStorage key: `chiranjeevis_save_v1`)
- **Save slot display**: "Last save: Act II, Scene 2.7 — The Thousand Names"
- **New Game** always warns if a save exists
- **Export save** (JSON download) for players who want to backup progress
- On load: player sees the last scene's title and a "Continue Journey" button

### 3.4 Settings Panel (accessible via `?` icon)
- Text speed: Slow / Normal / Fast / Instant
- Font size: Small / Medium / Large
- Audio: Master volume, Music volume, SFX volume, Mute all
- Colour: Standard (dark) / High Contrast mode (for accessibility)
- Language: English (v1 only; Hindi planned for v2)

### 3.5 Accessibility
- All text meets WCAG AA contrast minimums
- High Contrast mode uses pure black/white with no gradients
- Font size controls (1rem base, scales to 1.25rem and 1.5rem)
- Keyboard navigable: Tab to next choice, Enter to select, Spacebar to skip typewriter
- Screen reader labels on all interactive elements
- `prefers-reduced-motion` respected — all animations disabled if set

---

## 4. AUDIO SPECIFICATION

### 4.1 Audio Architecture

The audio system uses **Web Audio API** for layered ambient composition.
No external audio libraries. Pure native browser audio.

Each "scene" has an ambient state. The audio engine crossfades between states smoothly.

### 4.2 Ambient Layer System

The audio system has **3 simultaneous layers**:

| Layer | Description | Behaviour |
|---|---|---|
| **Base** | Tanpura drone (continuous) | Always present. Volume 0.3. Never stops. |
| **Yuga Layer** | Era-specific ambient texture | Crossfades on Yuga change. Volume 0.5. |
| **Scene Layer** | Specific mood accent for key scenes | Fades in/out per scene. Volume 0.4. |

### 4.3 Yuga Ambient Profiles

| Yuga / State | Yuga Layer | Scene Layer Examples |
|---|---|---|
| **Kali Yuga** (default) | Heavy rain, low distant drums, fractured reverb | Kali speaks: deep sub-bass drone, silence pockets |
| **Satya Vision** | Silver flute raga, temple bells, stillness | Liberation scene: pure sine tone pad |
| **Treta Vision** | Ocean waves, conch shell horn, distant chanting | Lanka burns: crackle texture layer |
| **Dvapara Vision** | Veena plucks, wind over ash fields | Brahmastra scene: low tension string drone |
| **Memory Vision (any)** | Cross-fades to Yuga layer + slight LPF (warmer) | Entry: gentle bell strike. Exit: reverse bell |

### 4.4 SFX Events

| Event | Sound |
|---|---|
| Scene load | Subtle gong strike (low, short decay) |
| Choice hover | Soft click (like a bead on wood) |
| Choice select | Deeper wooden click |
| Companion voice unlocks | Soft bell shimmer |
| Karma increase | Rising tone (short, warm) |
| Karma decrease | Low thud with brief reverb |
| Adharma increase | Dissonant low drone pulse (brief) |
| Memory Vision entry | Crystalline strike, LPF sweep |
| Memory Vision exit | Reverse crystalline, LPF sweep reverses |
| Act Title Card | Single resonant temple bell |
| Villain scene | No SFX change — music darkens |

### 4.5 Audio Files Required

All audio is procedurally layered from short looping samples.
Target: < 5MB total audio payload.

```
assets/audio/
├── base_tanpura.mp3          (~300KB, 30s loop)
├── kali_rain.mp3             (~400KB, 60s loop)
├── kali_drums_distant.mp3    (~200KB, 30s loop)
├── satya_flute.mp3           (~300KB, 45s loop)
├── satya_bells.mp3           (~150KB, 20s loop)
├── treta_ocean.mp3           (~350KB, 60s loop)
├── treta_conch.mp3           (~150KB, 15s loop)
├── dvapara_veena.mp3         (~250KB, 40s loop)
├── dvapara_wind.mp3          (~200KB, 30s loop)
├── sfx_gong.mp3              (~80KB)
├── sfx_click_light.mp3       (~20KB)
├── sfx_click_deep.mp3        (~20KB)
├── sfx_bell_shimmer.mp3      (~40KB)
├── sfx_karma_up.mp3          (~30KB)
├── sfx_karma_down.mp3        (~30KB)
├── sfx_adharma.mp3           (~40KB)
└── sfx_vision_entry.mp3      (~60KB)
```

**Note:** For Phase 1 build, placeholder silence files are acceptable.
Audio assets sourced from CC0 libraries (freesound.org, freemusicarchive.org).

---

## 5. PHASED BUILD PLAN

### Phase 0 — Foundation (Est. 3–4 days)
**Goal:** Working scaffold to run an Ink script via inkjs.

| Task | Output |
|---|---|
| Project scaffold (Vite + vanilla JS + inkjs) | Repo structure, `package.json`, dev server |
| Base HTML shell (`index.html`) | Single-page layout skeleton |
| CSS design system (`style.css`) | All CSS variables, typography, base layout |
| Ink logic setup (`story/main.ink`) | Ink variables, test scene, JSON compile step |
| Ink Controller (`engine/InkWrapper.js`) | Wrap `inkjs`, parse text, extract tags |
| UI shell (`ui/UIManager.js`) | Typewriter engine, choice renderer stubs |
| Audio engine stub (`audio.js`) | Web Audio context, layer system stub |
| Git init + `.gitignore` | Version control ready |

**Deliverable:** App loads an `.ink` file compiled to `.json`, displays typewriter text, renders choices, handles a selection, and updates state.

---

### Phase 1 — Prologue + Act I (Est. 5–7 days)
**Goal:** Playable from start through Act I Scene 1.8. Core loop proven.

| Task | Output |
|---|---|
| Modular Ink Structure | `main.ink`, `prologue.ink`, `act1_birth.ink`, `visions.ink`, `variables.ink` |
| Companion panel (visuals) | Animated slot system for the 7 immortals |
| Stats Progress Bars | Visual bars for Karma, Dharma, and Adharma in UI |
| Ink logic gates | Verify branch triggers based on Prologue choices |
| Cinematic Transitions | Smooth crossfades for Yuga shifts (all dark themed) |
| Save/load system | Auto-save `story.state.toJson()` after every choice |

**Deliverable:** Play through Prologue → Act I compiled from across 5 modular Ink files. Choices affect state seamlessly. Stats animate. Save/load works.

---

### Phase 2, 3, & 4 — Acts II through IV (Est. 22–32 days)
**Goal:** Complete writing and tag-hooking for the remaining acts.

| Task | Output |
|---|---|
| Act II Ink scripting | `act2.ink` — 4 Chiranjeevis, Memory Visions |
| UI: Memory Vision Overlay | Listens for `# overlay: memory_vision` from Ink |
| Act III Ink scripting | `act3.ink` — Trials, Ashwatthama logic |
| Act IV \& Endings Ink scripting | `act4.ink` — Final battle, resolution logic within Ink |
| Ending condition resolver | Now completely handled natively inside Ink variables |
| Credits + replay prompt | Final UI state once Ink logic reports story end |

**Deliverable:** Full game playable end-to-end via the `story.json` payload.

---

### Phase 5 — Audio (Est. 3–5 days)
**Goal:** Full audio system live. Ambient layers. SFX. Memory Vision shifts.

| Task | Output |
|---|---|
| Base audio engine (Web Audio API) | Layer system, crossfade, volume control |
| All ambient loops integrated | Per-Yuga layers playing |
| Memory Vision audio crossfade | Smooth ambient transition |
| SFX events wired | All 10 SFX events trigger correctly |
| Settings audio controls | Master/music/SFX sliders working |
| Audio fallback if blocked | "Click to enable audio" prompt |

**Deliverable:** Full ambient soundscape. SFX on every interaction. Settings work.

---

### Phase 6 — Polish & QA (Est. 4–6 days)
**Goal:** Ship-quality. No rough edges.

| Task | Output |
|---|---|
| Full playthrough QA (all paths) | All scene IDs resolve, no dead ends |
| Ending condition QA | All 8 endings reachable and correct |
| Mobile QA | Layout correct on iOS Safari + Android Chrome |
| Keyboard navigation | Full Tab/Enter/Space support |
| High contrast mode | Working, tested |
| `prefers-reduced-motion` | All animations disabled when set |
| Font loading performance | `font-display: swap`, no FOUT |
| Save/load edge cases | Fresh load, corrupted save, version mismatch |
| itch.io packaging | HTML zip, metadata, screenshots, game page copy |

**Deliverable:** Game ready for itch.io release.

---

## 6. CONTENT REQUIREMENTS SUMMARY

| Content Type | Count | Owner |
|---|---|---|
| Scene prose blocks (avg 4 paragraphs) | 200 prose blocks | Writer |
| Choice labels | ~180 choices | Writer |
| Companion voice lines (per scene reactivity) | ~300 lines | Writer |
| Villain dialogue lines | ~100 lines | Writer |
| Memory Vision prose | ~56 paragraphs (7 visions × 8 paragraphs) | Writer |
| Ending prose (avg 6 paragraphs each) | 48 ending paragraphs | Writer |
| UI copy (labels, tooltips, settings) | ~50 strings | Writer |
| Audio assets (CC0 sourced) | 17 files | Audio |

---

## 7. DEFINITION OF DONE (Per Phase)

A phase is complete when:
- [ ] All scenes load without errors in Chrome and Firefox
- [ ] All choice branches resolve to a valid next scene ID
- [ ] All MEMORIES keys are set correctly and readable by later scenes
- [ ] Stats animate correctly on every choice
- [ ] Save/load works across browser sessions
- [ ] Layout is correct at 1440px, 1024px, 768px, and 375px
- [ ] No console errors
- [ ] Phase deliverable can be shown as a working demo
