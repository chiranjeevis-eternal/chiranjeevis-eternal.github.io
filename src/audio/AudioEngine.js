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
    this.alignmentNodes = {
      filter: null,
      distortion: null
    };
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
    
    // Alignment Resonance Nodes
    const masterFilter = this.audioContext.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.value = 2000;
    
    const masterDist = this.audioContext.createWaveShaper();
    masterDist.curve = this._makeDistortionCurve(0);
    masterDist.oversample = '4x';

    masterFilter.connect(masterDist);
    masterDist.connect(masterGain);
    masterGain.connect(this.audioContext.destination);

    this.alignmentNodes.filter = masterFilter;
    this.alignmentNodes.distortion = masterDist;

    freqs.forEach((freq, idx) => {
      const osc = this.audioContext.createOscillator();
      const lfo = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq + (Math.random() * 0.4 - 0.2);

      lfo.type = 'sine';
      lfo.frequency.value = 0.2 + (idx * 0.05); 
      
      const lfoGain = this.audioContext.createGain();
      lfoGain.gain.value = 0.5;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      
      gain.gain.value = 0.5;

      osc.connect(gain);
      gain.connect(masterFilter); // Connect to alignment chain

      osc.start();
      lfo.start();
    });

    this.layers.base = { type: 'procedural', masterGain };
  }

  updateAlignment(dharma, adharma) {
    if (!this.audioContext || !this.alignmentNodes.filter) return;

    // Dharma brightens (High-pass style)
    // Adharma darkens/distorts (Low-pass + Overdrive)
    const dFactor = Math.min(dharma / 100, 1);
    const aFactor = Math.min(adharma / 100, 1);

    const freq = 2000 - (aFactor * 1800) + (dFactor * 1000);
    this.alignmentNodes.filter.frequency.setTargetAtTime(freq, this.audioContext.currentTime, 1.5);
    
    const distAmount = (aFactor * 100);
    this.alignmentNodes.distortion.curve = this._makeDistortionCurve(distAmount);
  }

  _makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
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
