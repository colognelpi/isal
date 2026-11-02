/**
 * Official YouTube IFrame Player API Audio Controller for ONLY US
 * Music Source: "Sure Thing" by Miguel (Lyric Video)
 * Video ID: m2gzAay1uD8
 * Embed: https://www.youtube.com/embed/m2gzAay1uD8?enablejsapi=1
 */

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface YouTubePlayerStatus {
  isPlaying: boolean;
  isMuted: boolean;
  isBuffering: boolean;
  isReady: boolean;
  hasError: boolean;
  errorMessage?: string;
  title: string;
  artist: string;
}

export type PlayerStatus = YouTubePlayerStatus;

class YouTubeAudioService {
  private player: any = null;
  private isReady: boolean = false;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private isBuffering: boolean = false;
  private hasError: boolean = false;
  private errorMessage: string | undefined = undefined;
  private pendingPlay: boolean = false;
  private containerId: string = 'youtube-audio-container';
  private videoId: string = 'm2gzAay1uD8';
  private subscribers: ((status: YouTubePlayerStatus) => void)[] = [];

  public subscribe(callback: (status: YouTubePlayerStatus) => void): () => void {
    this.subscribers.push(callback);
    callback(this.getStatus());
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  private notify() {
    const status = this.getStatus();
    this.subscribers.forEach((cb) => {
      try {
        cb(status);
      } catch (err) {
        console.error("Subscriber notification error:", err);
      }
    });
  }

  public getStatus(): YouTubePlayerStatus {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      isBuffering: this.isBuffering,
      isReady: this.isReady,
      hasError: this.hasError,
      errorMessage: this.errorMessage,
      title: "Sure Thing",
      artist: "Miguel"
    };
  }

  public init(containerId: string = 'youtube-audio-container') {
    this.containerId = containerId;
    if (this.player) return;
    if (typeof window === 'undefined') return;

    if (window.YT && window.YT.Player) {
      this.createPlayer();
    } else {
      this.loadYouTubeIframeAPI();
    }
  }

  private loadYouTubeIframeAPI() {
    if (!document.getElementById('youtube-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === 'function') prevReady();
      this.createPlayer();
    };
  }

  private createPlayer() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      setTimeout(() => this.createPlayer(), 100);
      return;
    }

    try {
      this.player = new window.YT.Player(this.containerId, {
        height: '200',
        width: '200',
        videoId: this.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            this.isReady = true;
            this.hasError = false;

            // Ensure volume is 100 and unmuted
            try {
              event.target.setVolume(100);
              event.target.unMute();
              this.isMuted = false;
            } catch (err) {
              console.warn("Could not set volume on ready:", err);
            }

            if (this.pendingPlay) {
              this.pendingPlay = false;
              this.play();
            }

            this.notify();
          },
          onStateChange: (event: any) => {
            // YT.PlayerState:
            // -1: UNSTARTED
            //  0: ENDED
            //  1: PLAYING
            //  2: PAUSED
            //  3: BUFFERING
            //  5: CUED
            const state = event.data;

            if (state === 1) {
              // PLAYING
              this.isPlaying = true;
              this.isBuffering = false;
              this.hasError = false;
            } else if (state === 2) {
              // PAUSED
              this.isPlaying = false;
              this.isBuffering = false;
            } else if (state === 3) {
              // BUFFERING
              this.isBuffering = true;
            } else if (state === 0) {
              // ENDED -> seamless loop
              this.isPlaying = true;
              this.isBuffering = false;
              try {
                this.player.seekTo(0, true);
                this.player.playVideo();
              } catch (e) {
                console.warn("Loop restart error:", e);
              }
            } else if (state === -1 || state === 5) {
              this.isBuffering = false;
            }

            this.notify();
          },
          onError: (event: any) => {
            console.warn("YouTube Audio Player error code:", event.data);
            this.hasError = true;
            this.isBuffering = false;
            this.isPlaying = false;

            let message = "Audio stream unavailable";
            if (event.data === 2) message = "Invalid video parameter";
            if (event.data === 5) message = "HTML5 player error";
            if (event.data === 100) message = "Video not found";
            if (event.data === 101 || event.data === 150) message = "Playback restricted";

            this.errorMessage = message;
            this.notify();
          }
        }
      });
    } catch (err) {
      console.error("Error creating YouTube player instance:", err);
      this.hasError = true;
      this.errorMessage = "Failed to load player";
      this.notify();
    }
  }

  public play() {
    this.hasError = false;
    this.pendingPlay = true;

    if (!this.player || !this.isReady) {
      this.isBuffering = true;
      this.notify();
      this.init();
      return;
    }

    try {
      this.pendingPlay = false;
      this.player.unMute();
      this.player.setVolume(100);
      this.player.playVideo();
      this.isMuted = false;
      this.isBuffering = true;
      this.notify();
    } catch (err) {
      console.error("Error invoking playVideo:", err);
    }
  }

  public pause() {
    this.pendingPlay = false;
    if (!this.player || !this.isReady) {
      this.isPlaying = false;
      this.isBuffering = false;
      this.notify();
      return;
    }

    try {
      this.player.pauseVideo();
      this.isPlaying = false;
      this.isBuffering = false;
      this.notify();
    } catch (err) {
      console.error("Error invoking pauseVideo:", err);
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public toggleMute(): boolean {
    if (!this.player || !this.isReady) {
      this.isMuted = !this.isMuted;
      this.notify();
      return this.isMuted;
    }

    try {
      if (this.player.isMuted()) {
        this.player.unMute();
        this.player.setVolume(100);
        this.isMuted = false;
      } else {
        this.player.mute();
        this.isMuted = true;
      }
      this.notify();
      return this.isMuted;
    } catch (err) {
      console.error("Error toggling mute on YouTube player:", err);
      this.isMuted = !this.isMuted;
      this.notify();
      return this.isMuted;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const youtubeAudio = new YouTubeAudioService();
