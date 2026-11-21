import { useEffect, useRef, useState } from 'react';
import { initSectionAnimations } from './animations/scrollAnimations';
import { MobileMenu } from './components/MobileMenu';
import { Navbar } from './components/Navbar';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { ToolkitSection } from './components/ToolkitSection';
import { PortfolioProject, SELECTED_PROJECTS } from './data/projects';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { HeroSection } from './sections/HeroSection';
import { MadLabSection } from './sections/MadLabSection';
import { SelectedWorkSection } from './sections/SelectedWorkSection';

const PROJECTS_STORAGE_KEY = 'mad_designs_projects_v4';

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return SELECTED_PROJECTS;
  });

  useEffect(() => {
    const updateScroll = () => {
      const heroHeight = window.innerHeight || 900;
      scrollProgressRef.current = Math.min(Math.max(window.scrollY / heroHeight, 0), 2);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    return initSectionAnimations(mainRef.current);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // ignore quota limits
    }
  }, [projects]);

  const activeProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  const handleUpdateProject = (updated: PortfolioProject) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-[#080808] text-[#F4F4F1]">
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main>
        <HeroSection scrollProgressRef={scrollProgressRef} />

        {/* Subtle Exhibition Ribbon */}
        <div className="border-y border-[#BFC1C5]/15 py-3 overflow-hidden bg-[#080808]">
          <div className="animate-exhibition-marquee text-[10px] tracking-[0.34em] text-[#777777] select-none">
            {[0, 1].map((loop) => (
              <div key={loop} className="flex items-center gap-10 pr-10 whitespace-nowrap">
                <span>MOHSIN KHAN®</span>
                <span>·</span>
                <span>MAD DESIGNS™</span>
                <span>·</span>
                <span>AI CINEMATIC ADS</span>
                <span>·</span>
                <span>ANIMATED ADS</span>
                <span>·</span>
                <span>PHOTOREALISTIC PRODUCT ADS</span>
                <span>·</span>
                <span>VISUAL IDENTITIES</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>

        <AboutSection />

        <SelectedWorkSection
          projects={projects}
          onSelectProject={(project) => setSelectedProjectId(project.id)}
        />

        <MadLabSection />

        <ToolkitSection />
      </main>

      <ContactSection />

      <ProjectCaseStudyModal
        project={activeProject}
        projects={projects}
        onClose={() => setSelectedProjectId(null)}
        onSelectProject={(project) => setSelectedProjectId(project.id)}
        onUpdateProject={handleUpdateProject}
      />
    </div>
  );
}
