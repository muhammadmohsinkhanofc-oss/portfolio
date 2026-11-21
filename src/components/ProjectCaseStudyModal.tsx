import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Edit3, Maximize2, Upload, X } from 'lucide-react';
import { PortfolioProject, ProjectImageSlot } from '../data/projects';
import { ExhibitionImage } from './ExhibitionImage';

interface ProjectCaseStudyModalProps {
  project: PortfolioProject | null;
  projects: PortfolioProject[];
  onClose: () => void;
  onSelectProject: (project: PortfolioProject) => void;
  onUpdateProject: (updated: PortfolioProject) => void;
}

export function ProjectCaseStudyModal({
  project,
  projects,
  onClose,
  onSelectProject,
  onUpdateProject,
}: ProjectCaseStudyModalProps) {
  const [fullscreenPlate, setFullscreenPlate] = useState<ProjectImageSlot | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draftDescription, setDraftDescription] = useState('');
  const [draftBrief, setDraftBrief] = useState('');

  useEffect(() => {
    if (!project) return;
    setIsEditing(false);
    setFullscreenPlate(null);
    setDraftDescription(project.description);
    setDraftBrief(project.brief);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const idx = projects.findIndex((p) => p.id === project.id);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenPlate) {
          setFullscreenPlate(null);
        } else {
          onClose();
        }
      } else if (!fullscreenPlate && !isEditing) {
        if (e.key === 'ArrowRight') {
          onSelectProject(projects[(idx + 1) % projects.length]);
        } else if (e.key === 'ArrowLeft') {
          onSelectProject(projects[(idx - 1 + projects.length) % projects.length]);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, projects, fullscreenPlate, isEditing, onClose, onSelectProject]);

  if (!project) return null;

  const currentIdx = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIdx - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIdx + 1) % projects.length];

  const handleSaveText = () => {
    onUpdateProject({
      ...project,
      description: draftDescription.trim() || project.description,
      brief: draftBrief.trim() || project.brief,
    });
    setIsEditing(false);
  };

  const handleUploadCover = (dataUrl: string) => {
    const isVideo = dataUrl.startsWith('data:video');
    onUpdateProject({
      ...project,
      coverSlot: { ...project.coverSlot, src: dataUrl, mediaType: isVideo ? 'video' : 'image' },
    });
  };

  const handleUploadGalleryPlate = (slotId: string, dataUrl: string) => {
    const isVideo = dataUrl.startsWith('data:video');
    onUpdateProject({
      ...project,
      gallery: project.gallery.map((item) =>
        item.id === slotId
          ? { ...item, src: dataUrl, mediaType: isVideo ? 'video' : 'image' }
          : item
      ),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#080808]/95 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-heading"
    >
      {/* Top Sticky Exhibition Bar */}
      <div className="sticky top-0 z-20 bg-[#080808]/95 border-b border-[#BFC1C5]/15 px-6 sm:px-10 lg:px-14 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-[11px] tracking-[0.22em] text-[#BFC1C5] font-mono-tabular truncate">
          <span>{project.index}</span>
          <span className="text-[#777777]">/</span>
          <span className="truncate">{project.title}</span>
          <span className="hidden sm:inline text-[#777777]">· {project.year}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#BFC1C5]/25 text-[10px] tracking-[0.2em] text-[#BFC1C5] hover:text-[#F4F4F1] hover:border-[#F4F4F1] transition-colors cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditing ? 'CANCEL EDIT' : 'EDIT ENTRY'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 inline-flex items-center justify-center text-[#F4F4F1] hover:text-[#BFC1C5] transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Case Study Content */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12 border-b border-[#BFC1C5]/15">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[11px] tracking-[0.26em] text-[#777777]">
              {project.category}
            </p>
            <h2
              id="case-study-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F4F4F1] leading-[1.02]"
            >
              {project.title}
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-5">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={draftDescription}
                  onChange={(e) => setDraftDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#191919] border border-[#BFC1C5]/25 text-sm text-[#F4F4F1] focus:outline-none focus:border-[#F4F4F1]"
                  aria-label="Short project description"
                />
                <textarea
                  rows={3}
                  value={draftBrief}
                  onChange={(e) => setDraftBrief(e.target.value)}
                  className="w-full px-3 py-2 bg-[#191919] border border-[#BFC1C5]/25 text-xs text-[#BFC1C5] focus:outline-none focus:border-[#F4F4F1]"
                  aria-label="Project brief"
                />
                <button
                  type="button"
                  onClick={handleSaveText}
                  className="px-4 py-2 bg-[#F4F4F1] text-[#080808] text-[11px] font-semibold tracking-[0.2em] cursor-pointer"
                >
                  SAVE CHANGES
                </button>
              </div>
            ) : (
              <>
                <p className="text-base text-[#F4F4F1] leading-relaxed">
                  {project.description}
                </p>
                <p className="text-sm text-[#777777] leading-relaxed">{project.brief}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] tracking-[0.18em] text-[#BFC1C5]">
                  {project.deliverables.map((d, i) => (
                    <span key={d} className="inline-flex items-center gap-4">
                      <span>{d.toUpperCase()}</span>
                      {i < project.deliverables.length - 1 && (
                        <span className="text-[#777777]">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Cover Plate */}
        <div className="space-y-3">
          <div className="relative group aspect-[16/9] w-full bg-[#121212] border border-[#BFC1C5]/15 overflow-hidden">
            <ExhibitionImage
              src={project.coverSlot.src}
              mediaType={project.coverSlot.mediaType}
              poster={project.coverSlot.poster}
              alt={project.title}
              plateLabel={project.coverSlot.caption}
              recommendedSize={project.coverSlot.recommendedSize}
              allowUpload
              onUploadFile={handleUploadCover}
              className={`w-full h-full ${
                project.coverSlot.src.endsWith('.svg')
                  ? 'object-contain p-12'
                  : 'object-contain bg-[#0A0A0A]'
              }`}
            />

            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#080808]/90 border border-[#BFC1C5]/30 text-[10px] tracking-[0.18em] text-[#F4F4F1] cursor-pointer">
                <Upload className="w-3 h-3" />
                <span>REPLACE</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === 'string') handleUploadCover(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="sr-only"
                />
              </label>
              <button
                type="button"
                onClick={() => setFullscreenPlate(project.coverSlot)}
                className="p-2 bg-[#080808]/90 border border-[#BFC1C5]/30 text-[#F4F4F1] cursor-pointer"
                aria-label="Inspect cover fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] tracking-[0.22em] text-[#777777] font-mono-tabular">
            <span>{project.coverSlot.caption}</span>
            <span>{project.coverSlot.recommendedSize}</span>
          </div>
        </div>

        {/* Editable Exhibition Gallery Grid */}
        <div className="space-y-6">
          <div className="text-[11px] tracking-[0.24em] text-[#777777]">
            EXHIBITION PLATES · CLICK ANY PLATE TO INSPECT FULLSCREEN
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((plate) => (
              <div key={plate.id} className="space-y-2.5">
                <div
                  onClick={() => setFullscreenPlate(plate)}
                  className="relative group bg-[#121212] border border-[#BFC1C5]/15 overflow-hidden cursor-pointer"
                  style={{ aspectRatio: plate.aspect }}
                >
                  <ExhibitionImage
                    src={plate.src}
                    mediaType={plate.mediaType}
                    poster={plate.poster}
                    alt={plate.caption}
                    plateLabel={plate.caption}
                    recommendedSize={plate.recommendedSize}
                    allowUpload
                    onUploadFile={(dataUrl) => handleUploadGalleryPlate(plate.id, dataUrl)}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
                      plate.src.endsWith('.svg') ? 'object-contain p-10' : 'object-cover'
                    }`}
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#080808]/90 border border-[#BFC1C5]/30 text-[10px] tracking-[0.16em] text-[#F4F4F1] cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>LOAD</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              handleUploadGalleryPlate(plate.id, reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] tracking-[0.18em] text-[#777777] font-mono-tabular">
                  <span className="truncate">{plate.caption}</span>
                  <span className="shrink-0">{plate.recommendedSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next / Previous Exhibition Navigation */}
        <div className="pt-10 border-t border-[#BFC1C5]/15 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectProject(prevProject)}
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#BFC1C5] hover:text-[#F4F4F1] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{prevProject.title}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectProject(nextProject)}
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#BFC1C5] hover:text-[#F4F4F1] transition-colors cursor-pointer"
          >
            <span>{nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {fullscreenPlate && (
        <div
          className="fixed inset-0 z-60 bg-[#080808] flex items-center justify-center p-6 sm:p-12"
          onClick={() => setFullscreenPlate(null)}
        >
          <button
            type="button"
            onClick={() => setFullscreenPlate(null)}
            className="fixed top-6 right-6 z-20 w-11 h-11 inline-flex items-center justify-center border border-[#BFC1C5]/25 text-[#F4F4F1] hover:bg-[#F4F4F1] hover:text-[#080808] transition-colors cursor-pointer"
            aria-label="Exit fullscreen plate viewer"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="w-full max-w-5xl max-h-[85vh] aspect-[16/10] bg-[#0A0A0A] border border-[#BFC1C5]/15 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <ExhibitionImage
              src={fullscreenPlate.src}
              mediaType={fullscreenPlate.mediaType}
              poster={fullscreenPlate.poster}
              alt={fullscreenPlate.caption}
              plateLabel={fullscreenPlate.caption}
              className={`w-full h-full ${
                fullscreenPlate.src.endsWith('.svg') ? 'object-contain p-16' : 'object-contain'
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
