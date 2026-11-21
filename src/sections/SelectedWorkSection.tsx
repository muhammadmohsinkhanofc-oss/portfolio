import { ArrowUpRight } from 'lucide-react';
import { PortfolioProject } from '../data/projects';
import { ExhibitionImage } from '../components/ExhibitionImage';
import { BrandLogo } from '../components/BrandLogo';

interface SelectedWorkSectionProps {
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
}

export function SelectedWorkSection({
  projects,
  onSelectProject,
}: SelectedWorkSectionProps) {
  return (
    <section
      id="work"
      className="py-24 lg:py-36 border-t border-[#BFC1C5]/15 bg-[#080808]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 space-y-20 lg:space-y-28">
        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#BFC1C5]/15"
          data-reveal
        >
          <div className="space-y-3">
            <p className="text-[11px] tracking-[0.28em] text-[#777777]">
              02 · SELECTED EXHIBITION
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[#F4F4F1]"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
            >
              SELECTED WORK.
            </h2>
          </div>

          <p className="text-xs tracking-[0.22em] text-[#777777] max-w-xs md:text-right">
            CURATED EXHIBITION · CLICK ANY BODY OF WORK TO INSPECT FULLSCREEN
          </p>
        </div>

        {/* Distinct Editorial Layouts per Project */}
        <div className="space-y-28 lg:space-y-36">
          {projects.map((project) => {
            if (project.layout === 'kashees-showcase') {
              const heroReelsAndKey = project.gallery.slice(0, 4);
              const campaignStills = project.gallery.slice(4);

              return (
                <article
                  key={project.id}
                  data-reveal
                  className="space-y-10"
                >
                  {/* Header Row */}
                  <div
                    onClick={() => onSelectProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProject(project);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open case study for ${project.title}`}
                    className="group cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 focus-visible:outline-none"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono-tabular text-xs text-[#777777]">
                        {project.index}
                      </span>
                      <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F4F4F1] group-hover:text-[#BFC1C5] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] tracking-[0.22em] text-[#777777]">
                      <span>{project.category}</span>
                      <span className="inline-flex items-center gap-1 text-[#F4F4F1]">
                        <span>FULL EXHIBITION</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Main Hero Video Film (kashees_main_hero) */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="group cursor-pointer space-y-3"
                  >
                    <div className="aspect-[16/9] w-full bg-[#121212] border border-[#BFC1C5]/15 overflow-hidden">
                      <ExhibitionImage
                        src={project.coverSlot.src}
                        mediaType={project.coverSlot.mediaType}
                        poster={project.coverSlot.poster}
                        alt={project.title}
                        plateLabel={project.coverSlot.caption}
                        recommendedSize={project.coverSlot.recommendedSize}
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] tracking-[0.22em] text-[#777777] font-mono-tabular">
                      <span>{project.coverSlot.caption}</span>
                      <span>{project.description}</span>
                    </div>
                  </div>

                  {/* Hero 2, Hero 3, Couture Reel 4 & Key Thumbnail Showcase */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {heroReelsAndKey.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectProject(project)}
                        className="group cursor-pointer space-y-2.5"
                      >
                        <div className="aspect-[9/14] w-full bg-[#121212] border border-[#BFC1C5]/15 overflow-hidden">
                          <ExhibitionImage
                            src={item.src}
                            mediaType={item.mediaType}
                            poster={item.poster}
                            alt={item.caption}
                            plateLabel={item.caption}
                            recommendedSize={item.recommendedSize}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        </div>
                        <div className="text-[10px] tracking-[0.2em] text-[#777777] font-mono-tabular truncate">
                          {item.caption}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Campaign Editorial Stills Filmstrip */}
                  {campaignStills.length > 0 && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between text-[10px] tracking-[0.24em] text-[#777777]">
                        <span>CAMPAIGN STILLS & PORTRAIT PLATES</span>
                        <span>{campaignStills.length} FRAMES</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {campaignStills.map((still) => (
                          <div
                            key={still.id}
                            onClick={() => onSelectProject(project)}
                            className="group cursor-pointer aspect-[4/5] bg-[#121212] border border-[#BFC1C5]/15 overflow-hidden"
                          >
                            <ExhibitionImage
                              src={still.src}
                              mediaType={still.mediaType}
                              alt={still.caption}
                              plateLabel={still.caption}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            }

            if (project.layout === 'split-left') {
              return (
                <article
                  key={project.id}
                  data-reveal
                  onClick={() => onSelectProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open case study for ${project.title}`}
                  className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch focus-visible:outline-none"
                >
                  <div className="lg:col-span-6">
                    <div className="aspect-[4/5] w-full h-full bg-[#121212] border border-[#BFC1C5]/15 overflow-hidden">
                      <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                        <ExhibitionImage
                          src={project.coverSlot.src}
                          mediaType={project.coverSlot.mediaType}
                          alt={project.title}
                          plateLabel={project.coverSlot.caption}
                          recommendedSize={project.coverSlot.recommendedSize}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex flex-col justify-between py-2 border-t lg:border-t-0 border-[#BFC1C5]/15">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between text-[11px] tracking-[0.24em] text-[#777777] font-mono-tabular">
                        <span>
                          {project.index} · {project.year}
                        </span>
                        <span>{project.gallery.length + 1} PLATES</span>
                      </div>

                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F4F4F1] leading-[1.02] group-hover:text-[#BFC1C5] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-[11px] tracking-[0.22em] text-[#777777]">
                        {project.category}
                      </p>

                      <p className="text-base text-[#BFC1C5] leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-8 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        {project.gallery.slice(0, 2).map((sub) => (
                          <div
                            key={sub.id}
                            className="aspect-[4/5] bg-[#121212] border border-[#BFC1C5]/15 overflow-hidden"
                          >
                            <ExhibitionImage
                              src={sub.src}
                              mediaType={sub.mediaType}
                              alt={sub.caption}
                              plateLabel={sub.caption}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#BFC1C5]/15">
                        <span className="text-[11px] tracking-[0.22em] text-[#BFC1C5]">
                          OPEN CASE STUDY
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#F4F4F1] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            if (project.layout === 'triptych') {
              return (
                <article
                  key={project.id}
                  data-reveal
                  onClick={() => onSelectProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open case study for ${project.title}`}
                  className="group cursor-pointer space-y-8 focus-visible:outline-none"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#BFC1C5]/15 pb-6">
                    <div className="space-y-2">
                      <span className="font-mono-tabular text-xs text-[#777777]">
                        {project.index} · {project.category}
                      </span>
                      <h3 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F1] group-hover:text-[#BFC1C5] transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-6">
                      <p className="text-sm text-[#BFC1C5]">{project.description}</p>
                      <ArrowUpRight className="w-5 h-5 text-[#F4F4F1] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.gallery.slice(0, 3).map((plate) => (
                      <div
                        key={plate.id}
                        className="aspect-[4/5] bg-[#121212] border border-[#BFC1C5]/15 overflow-hidden"
                      >
                        <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                          <ExhibitionImage
                            src={plate.src}
                            mediaType={plate.mediaType}
                            alt={plate.caption}
                            plateLabel={plate.caption}
                            recommendedSize={plate.recommendedSize}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            }

            // Monolith layout for MAD DESIGNS
            return (
              <article
                key={project.id}
                data-reveal
                onClick={() => onSelectProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open case study for ${project.title}`}
                className="group cursor-pointer border border-[#BFC1C5]/15 bg-[#111111] p-6 sm:p-10 lg:p-14 space-y-10 focus-visible:outline-none hover:border-[#F4F4F1]/40 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono-tabular text-xs text-[#777777]">
                      {project.index}
                    </span>
                    <h3 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F1]">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] tracking-[0.22em] text-[#BFC1C5]">
                    <span>{project.category}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-[#080808] border border-[#BFC1C5]/15 p-10 sm:p-14 flex items-center justify-center min-h-[240px]">
                    <BrandLogo
                      variant="wordmark"
                      tone="light"
                      className="w-full max-w-md h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="lg:col-span-5 bg-[#F4F4F1] p-10 sm:p-14 flex items-center justify-center min-h-[240px]">
                    <BrandLogo
                      variant="monogram"
                      tone="dark"
                      className="h-24 w-auto transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs text-[#BFC1C5]">
                  <span>{project.description}</span>
                  <span className="tracking-[0.2em] text-[#777777]">
                    MONOCHROME GEOMETRIC IDENTITY · SVG & TRANSPARENT PNG
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
