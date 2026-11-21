import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { LabExperiment, MAD_LAB_EXPERIMENTS } from '../data/experiments';

const LabMiniScene = lazy(() => import('../three/LabMiniScene'));

function KineticTypeStudy() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        setOffset({ x: nx, y: ny });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="w-full h-full bg-[#0C0C0C] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      <div
        className="font-display font-bold text-6xl sm:text-7xl text-[#F4F4F1] transition-transform duration-200 ease-out"
        style={{
          letterSpacing: `${0.08 + Math.abs(offset.x) * 0.35}em`,
          transform: `skewX(${offset.x * -14}deg) translateY(${offset.y * 12}px)`,
        }}
      >
        MAD
      </div>
      <div className="mt-3 text-[10px] tracking-[0.35em] text-[#777777]">
        MOVE POINTER TO DISTORT
      </div>
    </div>
  );
}

function MoireCanvasStudy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let phase = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(191, 193, 197, 0.45)';
      ctx.lineWidth = 1;

      const lines = 22;
      for (let i = 0; i < lines; i++) {
        const yBase = (h / (lines + 1)) * (i + 1);
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const amp = hoverRef.current ? 18 : 8;
          const y =
            yBase +
            Math.sin(x * 0.02 + phase + i * 0.25) * amp +
            Math.cos(x * 0.01 - phase * 0.6) * (amp * 0.45);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += hoverRef.current ? 0.04 : 0.014;
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={360}
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
      className="w-full h-full block"
    />
  );
}

function PosterStudyFrame() {
  return (
    <div className="w-full h-full bg-[#F4F4F1] text-[#080808] p-6 flex flex-col justify-between group-hover:bg-[#E8E8E4] transition-colors">
      <div className="flex justify-between text-[9px] tracking-[0.26em] font-mono-tabular">
        <span>ARCHIVE · 04</span>
        <span>KARACHI</span>
      </div>
      <div className="my-auto border-y border-[#080808]/25 py-5 flex items-center justify-between">
        <span className="font-display text-4xl font-bold tracking-tighter">FORM</span>
        <span className="w-10 h-10 rounded-full bg-[#080808] transition-transform duration-500 group-hover:scale-125" />
      </div>
      <div className="flex justify-between text-[9px] tracking-[0.22em]">
        <span>MONOCHROME STUDY</span>
        <span>2026</span>
      </div>
    </div>
  );
}

function OpticalApertureStudy() {
  const [activeCell, setActiveCell] = useState<number | null>(null);
  return (
    <div className="w-full h-full bg-[#0C0C0C] p-6 grid grid-cols-4 gap-2">
      {Array.from({ length: 16 }).map((_, idx) => {
        const isActive = activeCell === idx;
        return (
          <div
            key={idx}
            onMouseEnter={() => setActiveCell(idx)}
            onMouseLeave={() => setActiveCell(null)}
            className={`border border-[#BFC1C5]/20 flex items-center justify-center transition-colors duration-200 ${
              isActive ? 'bg-[#F4F4F1]' : 'bg-[#141414]'
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                isActive ? 'bg-[#080808] scale-150' : 'bg-[#BFC1C5]/50'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

function MotionCadenceStudy() {
  const [fast, setFast] = useState(false);
  return (
    <div
      onMouseEnter={() => setFast(true)}
      onMouseLeave={() => setFast(false)}
      className="w-full h-full bg-[#0E0E0E] p-6 flex items-end justify-between gap-2"
    >
      {[0.45, 0.85, 0.35, 0.95, 0.6, 0.78, 0.4, 0.9, 0.55].map((heightRatio, idx) => (
        <div
          key={idx}
          className="flex-1 bg-[#BFC1C5]/80 transition-all ease-out"
          style={{
            height: `${fast ? ((heightRatio * 100 + idx * 17) % 75) + 20 : heightRatio * 85}%`,
            transitionDuration: `${250 + idx * 45}ms`,
          }}
        />
      ))}
    </div>
  );
}

function ExperimentVisual({ exp }: { exp: LabExperiment }) {
  switch (exp.type) {
    case '3d-form':
      return (
        <Suspense fallback={<div className="w-full h-full bg-[#0E0E0E]" />}>
          <LabMiniScene />
        </Suspense>
      );
    case 'kinetic-type':
      return <KineticTypeStudy />;
    case 'moire-canvas':
      return <MoireCanvasStudy />;
    case 'poster-study':
      return <PosterStudyFrame />;
    case 'visual-grid':
      return <OpticalApertureStudy />;
    case 'motion-frame':
      return <MotionCadenceStudy />;
  }
}

export function MadLabSection() {
  return (
    <section
      id="experiments"
      className="py-24 lg:py-36 border-t border-[#BFC1C5]/15 bg-[#080808]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 space-y-16">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#BFC1C5]/15"
          data-reveal
        >
          <div className="space-y-3">
            <p className="text-[11px] tracking-[0.28em] text-[#777777]">03 · MAD LAB</p>
            <h2
              className="font-display font-semibold tracking-tight text-[#F4F4F1]"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
            >
              BEYOND THE BRIEF.
            </h2>
          </div>

          <p className="text-xs tracking-[0.2em] text-[#777777] max-w-xs md:text-right">
            INTERACTIVE VISUAL COMPOSITIONS · HOVER OR DRAG TO ENGAGE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAD_LAB_EXPERIMENTS.map((exp) => (
            <article key={exp.id} data-reveal className="group space-y-4">
              <div className="aspect-[4/3] w-full border border-[#BFC1C5]/15 overflow-hidden bg-[#101010]">
                <ExperimentVisual exp={exp} />
              </div>

              <div className="flex items-baseline justify-between gap-4 pt-1">
                <div className="space-y-1">
                  <div className="text-[10px] tracking-[0.24em] text-[#777777] font-mono-tabular">
                    {exp.index} · {exp.discipline}
                  </div>
                  <h3 className="font-display text-lg font-medium tracking-tight text-[#F4F4F1]">
                    {exp.title}
                  </h3>
                </div>
                <span className="text-xs text-[#777777] text-right">{exp.caption}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
