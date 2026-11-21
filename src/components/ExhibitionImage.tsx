import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Upload, Volume2, VolumeX } from 'lucide-react';

interface ExhibitionImageProps {
  src: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  fallbackSrc?: string;
  alt: string;
  plateLabel: string;
  recommendedSize?: string;
  className?: string;
  allowUpload?: boolean;
  showVideoControls?: boolean;
  onUploadFile?: (dataUrl: string) => void;
}

export function ExhibitionImage({
  src,
  mediaType = 'image',
  poster,
  fallbackSrc,
  alt,
  plateLabel,
  recommendedSize,
  className = 'w-full h-full object-cover',
  allowUpload = false,
  showVideoControls = true,
  onUploadFile,
}: ExhibitionImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setActiveSrc(src);
    setFailed(false);
    setMuted(true);
    setPaused(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && activeSrc !== fallbackSrc) {
      setActiveSrc(fallbackSrc);
    } else {
      setFailed(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadFile(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setPaused(false);
    } else {
      vid.pause();
      setPaused(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  const isVideo =
    mediaType === 'video' ||
    activeSrc.endsWith('.mp4') ||
    activeSrc.endsWith('.webm') ||
    activeSrc.startsWith('data:video');

  if (failed || !activeSrc) {
    return (
      <div
        className="w-full h-full bg-[#121212] relative flex flex-col justify-between p-6 sm:p-8 border border-[#BFC1C5]/15 select-none overflow-hidden"
        role="img"
        aria-label={alt}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#BFC1C5" strokeWidth="0.6" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#BFC1C5" strokeWidth="0.6" />
          <rect
            x="8%"
            y="8%"
            width="84%"
            height="84%"
            fill="none"
            stroke="#BFC1C5"
            strokeWidth="0.6"
          />
        </svg>

        <div className="relative z-10 flex items-center justify-between gap-4 text-[10px] tracking-[0.24em] text-[#777777] font-mono-tabular">
          <span>EXHIBITION PLATE</span>
          {recommendedSize && <span>{recommendedSize}</span>}
        </div>

        <div className="relative z-10 my-auto py-6 text-center space-y-2">
          <div className="font-display text-sm sm:text-base font-medium tracking-[0.14em] text-[#F4F4F1]">
            {plateLabel}
          </div>
          <div className="font-mono-tabular text-[11px] text-[#777777] break-all max-w-md mx-auto">
            {src}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.2em] text-[#777777]">
            EXHIBITION MEDIA SLOT
          </span>
          {allowUpload && onUploadFile && (
            <label
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#BFC1C5]/35 text-[10px] tracking-[0.18em] text-[#F4F4F1] hover:bg-[#F4F4F1] hover:text-[#080808] transition-colors cursor-pointer"
            >
              <Upload className="w-3 h-3" />
              <span>PREVIEW FILE</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="relative w-full h-full bg-[#0A0A0A]">
        <video
          ref={videoRef}
          src={activeSrc}
          poster={poster}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="metadata"
          onError={handleError}
          className={className}
        />

        {showVideoControls && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 inline-flex items-center justify-center bg-[#080808]/85 border border-[#BFC1C5]/30 text-[#F4F4F1] hover:bg-[#F4F4F1] hover:text-[#080808] transition-colors cursor-pointer"
              aria-label={paused ? 'Play video' : 'Pause video'}
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="w-8 h-8 inline-flex items-center justify-center bg-[#080808]/85 border border-[#BFC1C5]/30 text-[#F4F4F1] hover:bg-[#F4F4F1] hover:text-[#080808] transition-colors cursor-pointer"
              aria-label={muted ? 'Unmute audio' : 'Mute audio'}
            >
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
}
