/**
 * Ambient Procedural Audio Engine for ONLY US
 * Generates lush, gentle romantic ambient piano and chime progressions using Web Audio API.
 * Ensures zero broken external audio dependencies and no copyright conflicts.
 * Supports custom audio file/stream overrides as well.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private isMuted: boolean = false;
  private timerId: number | null = null;
  private currentChordIndex: number = 0;
  private masterGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  // Miguel - "Sure Thing" signature chord progression (C# minor / E Major)
  private chords: { root: number; notes: number[]; leadRiff?: number[] }[] = [
    // C#m9
    {
      root: 69.30, // C#2
      notes: [138.59, 207.65, 246.94, 311.13, 329.63], // C#3, G#3, B3, D#4, E4
      leadRiff: [415.30, 369.99, 329.63, 277.18] // G#4, F#4, E4, C#4 ("Sure thing" vocal motif)
    },
    // G#m7 / B
    {
      root: 61.74, // B1
      notes: [123.47, 185.00, 233.08, 293.66, 369.99], // B2, F#3, A#3, D4, F#4
      leadRiff: [329.63, 369.99, 415.30] // E4, F#4, G#4
    },
    // Amaj9
    {
      root: 55.00, // A1
      notes: [110.00, 164.81, 207.65, 277.18, 329.63], // A2, E3, G#3, C#4, E4
      leadRiff: [415.30, 369.99, 329.63, 246.94] // G#4, F#4, E4, B3
    },
    // Bsus4 to B7
    {
      root: 61.74, // B1
      notes: [123.47, 185.00, 246.94, 277.18, 369.99], // B2, F#3, B3, C#4, F#4
      leadRiff: [277.18, 329.63, 369.99, 415.30] // C#4, E4, F#4, G#4
    }
  ];

  private listeners: ((playing: boolean) => void)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isRunning));
  }

  public setCustomAudioUrl(url: string | null) {
    this.customAudioUrl = url;
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (this.isRunning) {
      this.pause();
      this.play();
    }
  }

  public getCustomAudioUrl(): string | null {
    return this.customAudioUrl;
  }

  public play() {
    this.initContext();
    if (!this.ctx) return;

    if (this.customAudioUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(this.customAudioUrl);
        this.customAudio.loop = true;
        this.customAudio.volume = this.isMuted ? 0 : 0.6;
      }
      this.customAudio.play().catch(e => console.warn("Custom audio play blocked:", e));
      this.isRunning = true;
      this.notify();
      return;
    }

    if (this.isRunning) return;
    this.isRunning = true;
    this.notify();
    this.scheduleNextArpeggio();
  }

  public pause() {
    this.isRunning = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.notify();
  }

  public toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.play();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : 0.6;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public getTrackTitle(): string {
    return "Sure Thing";
  }

  public getArtist(): string {
    return "Miguel";
  }

  private scheduleNextArpeggio() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;

    const chordObj = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;

    // 1. Warm sub-bass note (R&B low groove)
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    const bassFilter = this.ctx.createBiquadFilter();

    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(chordObj.root, now);

    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(240, now);

    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.exponentialRampToValueAtTime(0.28, now + 0.1);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(this.masterGain);

    bassOsc.start(now);
    bassOsc.stop(now + 3.1);

    // 2. Play warm Rhodes chord tones with gentle arpeggiation
    chordObj.notes.forEach((freq, idx) => {
      const noteDelay = idx * 0.18;
      const noteTime = now + noteDelay;

      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      // Rhodes blend: sine with subtle harmonic richness
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, noteTime);
      filter.Q.setValueAtTime(1.2, noteTime);

      const attack = 0.08;
      const decay = 2.6;
      const vol = 0.22 / chordObj.notes.length;

      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.exponentialRampToValueAtTime(vol, noteTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + attack + decay);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(noteTime);
      osc.stop(noteTime + attack + decay + 0.1);
    });

    // 3. Play signature "Sure Thing" lead melody notes
    if (chordObj.leadRiff) {
      chordObj.leadRiff.forEach((noteFreq, riffIdx) => {
        const riffTime = now + 1.1 + riffIdx * 0.35;
        const riffOsc = this.ctx!.createOscillator();
        const riffGain = this.ctx!.createGain();
        const riffFilter = this.ctx!.createBiquadFilter();

        riffOsc.type = 'sine';
        riffOsc.frequency.setValueAtTime(noteFreq, riffTime);

        riffFilter.type = 'lowpass';
        riffFilter.frequency.setValueAtTime(1200, riffTime);

        riffGain.gain.setValueAtTime(0.0001, riffTime);
        riffGain.gain.exponentialRampToValueAtTime(0.09, riffTime + 0.06);
        riffGain.gain.exponentialRampToValueAtTime(0.0001, riffTime + 0.85);

        riffOsc.connect(riffFilter);
        riffFilter.connect(riffGain);
        riffGain.connect(this.masterGain!);

        riffOsc.start(riffTime);
        riffOsc.stop(riffTime + 0.9);
      });
    }

    // Measure timing for smooth slow-jam groove (approx. 3.2s per bar)
    const nextInterval = 3200;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextArpeggio();
    }, nextInterval);
  }

  // Sound Effects
  public playHeartFoundSfx() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.0001, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.85);
    });
  }

  public playBoxOpenSfx() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.75);
  }

  public playSealBreakSfx() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Low parchment rustle and warm chime
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.2);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.55);
  }

  public playQuizSuccessSfx() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.65);
    });
  }

  public playCelebrationSfx() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const melody = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];
    melody.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.001, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 1.3);
    });
  }
}

export const audioEngine = new RomanticAudioEngine();
