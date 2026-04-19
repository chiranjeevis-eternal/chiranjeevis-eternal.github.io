/**
 * AudioEngine - Handles ambient loops and SFX crossfading.
 */
export class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.layers = {
      base: null,   // Always-on ambient (e.g. Tanpura drone)
      yuga: null,   // Era-specific loop (e.g. Kali Rain)
      scene: null   // Scene-specific accent
    };
    this.masterVolume = 0.5;
    this.isMuted = false;
  }

  init() {
    if (this.audioContext) return;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log("Audio Engine initialized.");
    this.startTanpuraDrone();
  }

  startTanpuraDrone() {
    if (!this.audioContext) return;
    // Procedural Tanpura (C2, G2, C3, C4) using Web Audio API
    const freqs = [65.41, 98.00, 130.81, 261.63]; 
    const masterGain = this.audioContext.createGain();
    masterGain.gain.value = 0.15 * this.masterVolume;
    masterGain.connect(this.audioContext.destination);

    freqs.forEach((freq, idx) => {
      const osc = this.audioContext.createOscillator();
      const lfo = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      // Triangle wave with slight detuning for string-like richness
      osc.type = 'triangle';
      osc.frequency.value = freq + (Math.random() * 0.4 - 0.2);

      // Tremolo LFO for the distinct tanpura swelling sound
      lfo.type = 'sine';
      lfo.frequency.value = 0.2 + (idx * 0.05); // Slow, overlapping swells
      
      const lfoGain = this.audioContext.createGain();
      lfoGain.gain.value = 0.5;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      
      gain.gain.value = 0.5;

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      lfo.start();
    });

    this.layers.base = { type: 'procedural', masterGain };
  }

  playProceduralYuga(yuga) {
    if (!this.audioContext) this.init();
    if (this.layers.yuga && this.layers.yuga.name === yuga) return;

    if (this.layers.yuga && this.layers.yuga.masterGain) {
      // Fade out previous procedural layer
      const oldGain = this.layers.yuga.masterGain;
      oldGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 1.0);
      setTimeout(() => { if (oldGain) { oldGain.disconnect(); } }, 2000);
    } else if (this.layers.yuga && this.layers.yuga.pause) {
      // Clean up old file-based layer if it exists
      this.fadeOut(this.layers.yuga);
    }

    const masterGain = this.audioContext.createGain();
    masterGain.gain.value = 0; // Start silenced
    masterGain.connect(this.audioContext.destination);

    // Fade in
    masterGain.gain.setTargetAtTime(0.20 * this.masterVolume, this.audioContext.currentTime + 0.1, 2.0);

    const osc = this.audioContext.createOscillator();
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    lfo.type = 'sine';
    
    if (yuga === 'kali') {
      // Dark roaring sub-bass
      osc.type = 'sawtooth';
      osc.frequency.value = 40; 
      filter.type = 'lowpass';
      filter.frequency.value = 100;
      lfo.frequency.value = 0.5;
      lfoGain.gain.value = 30;
    } else if (yuga === 'satya') {
      // High pure singing bowl
      osc.type = 'sine';
      osc.frequency.value = 432;
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      lfo.frequency.value = 0.2;
      lfoGain.gain.value = 20;
    } else if (yuga === 'treta') {
      // Tense mid-range battle anticipation
      osc.type = 'triangle';
      osc.frequency.value = 110;
      filter.type = 'bandpass';
      filter.frequency.value = 200;
      lfo.frequency.value = 2.0; 
      lfoGain.gain.value = 30;
    } else { // dvapara
      // Melancholic wind-like hum
      osc.type = 'sine';
      osc.frequency.value = 82.4; // E2
      filter.type = 'lowpass';
      filter.frequency.value = 150;
      lfo.frequency.value = 0.1;
      lfoGain.gain.value = 25;
    }

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    osc.connect(filter);
    filter.connect(masterGain);
    
    osc.start();
    lfo.start();

    this.layers.yuga = { name: yuga, masterGain, type: 'procedural' };
  }

  async playLoop(layer, url) {
    if (!this.audioContext) this.init();

    // If already playing this URL, skip
    if (this.layers[layer] && this.layers[layer].dataset.url === url) return;

    // Fade out previous
    if (this.layers[layer]) {
      this.fadeOut(this.layers[layer]);
    }

    const audio = new Audio(url);
    audio.loop = true;
    audio.dataset.url = url;
    audio.volume = 0;
    this.layers[layer] = audio;

    try {
      await audio.play();
      this.fadeIn(audio);
    } catch (e) {
      console.warn("Autoplay blocked or audio failed:", e);
    }
  }

  fadeIn(audio) {
    let vol = 0;
    const interval = setInterval(() => {
      vol += 0.05;
      if (vol >= this.masterVolume) {
        audio.volume = this.masterVolume;
        clearInterval(interval);
      } else {
        audio.volume = vol;
      }
    }, 100);
  }

  fadeOut(audio) {
    let vol = audio.volume;
    const interval = setInterval(() => {
      vol -= 0.05;
      if (vol <= 0) {
        audio.pause();
        audio.remove();
        clearInterval(interval);
      } else {
        audio.volume = vol;
      }
    }, 100);
  }

  setVolume(val) {
    this.masterVolume = val;
    Object.values(this.layers).forEach(audio => {
      if (audio && audio.volume !== undefined) audio.volume = val;
      if (audio && audio.masterGain) audio.masterGain.gain.value = 0.15 * val;
    });
  }
}
