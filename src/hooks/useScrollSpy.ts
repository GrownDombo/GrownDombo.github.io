import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= documentHeight - 2) {
        setActiveSection(sectionIds[sectionIds.length - 1] ?? '');
        return;
      }

      const anchorY = Math.min(150, window.innerHeight * 0.18);
      let nextActiveSection = sectionIds[0] ?? '';

      for (const sectionId of sectionIds) {
        const sectionElement = document.getElementById(sectionId);

        if (!sectionElement) {
          continue;
        }

        if (sectionElement.getBoundingClientRect().top <= anchorY) {
          nextActiveSection = sectionId;
        }
      }

      setActiveSection(nextActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sectionIds]);

  return [activeSection, setActiveSection] as const;
}
