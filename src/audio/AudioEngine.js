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
      if (audio) audio.volume = val;
    });
  }
}
