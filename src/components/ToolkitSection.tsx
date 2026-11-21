import { SITE_CONFIG } from '../config/siteConfig';

export function ToolkitSection() {
  return (
    <section className="py-20 lg:py-28 border-t border-[#BFC1C5]/15 bg-[#080808]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 space-y-3" data-reveal>
            <p className="text-[11px] tracking-[0.26em] text-[#777777]">04 · CREATIVE TOOLKIT</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F1]">
              INSTRUMENTS OF EXECUTION.
            </h2>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#BFC1C5]/15 border-t border-b border-[#BFC1C5]/15">
            {SITE_CONFIG.toolkit.map((tool) => (
              <div
                key={tool.index}
                data-reveal
                className="py-7 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono-tabular text-xs text-[#777777]">{tool.index}</span>
                  <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#F4F4F1] group-hover:text-[#BFC1C5] transition-colors">
                    {tool.name}
                  </span>
                </div>
                <span className="text-[11px] tracking-[0.2em] text-[#777777] uppercase">
                  {tool.discipline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
