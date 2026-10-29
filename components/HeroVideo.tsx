"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type HeroVideoProps = {
  src: string;
  poster: string;
  label: string;
};

export function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    video.play().catch(() => {
      // Autoplay blocked; the play button stays visible.
    });
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next && video.paused) {
      void video.play().catch(() => undefined);
    }
  };

  return (
    <div className="absolute inset-0 bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={togglePlay}
      />
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play intro video"
          className="absolute top-1/2 left-1/2 z-40 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#10b981] text-black shadow-lg shadow-emerald-500/30 transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <Play className="ml-0.5 size-6" fill="currentColor" />
        </button>
      )}
      <div className="absolute right-3 bottom-4 z-40 flex gap-2">
        {playing && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Pause intro video"
            className="flex size-8 items-center justify-center rounded-full border border-[#10b981]/40 bg-black/60 text-[#10b981] backdrop-blur transition hover:bg-[#10b981] hover:text-black focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:outline-none"
          >
            <Pause className="size-3.5" fill="currentColor" />
          </button>
        )}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute intro video" : "Mute intro video"}
          aria-pressed={!muted}
          className="flex h-8 items-center gap-1.5 rounded-full border border-[#10b981]/40 bg-black/60 px-3 font-mono text-[10px] tracking-[0.14em] text-[#10b981] uppercase backdrop-blur transition hover:bg-[#10b981] hover:text-black focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:outline-none"
        >
          {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
          {muted ? "Sound" : "Mute"}
        </button>
      </div>
    </div>
  );
}
