
import React, { useEffect, useRef, useState } from 'react';
import { RESUME_DATA } from '../constants';

const ExperienceSection: React.FC = () => {
  const { experience } = RESUME_DATA;
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const jobs = containerRef.current.querySelectorAll('[data-job-id]');
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.7; // Point where highlighting starts (70% down screen)

      let currentActiveId: string | null = null;
      const newProgress: Record<string, number> = {};

      jobs.forEach((job) => {
        const rect = job.getBoundingClientRect();
        const id = job.getAttribute('data-job-id') || '';

        // Calculate progress based on element position relative to viewport
        // Start highlighting when element top hits triggerPoint
        // Complete highlighting when element bottom hits triggerPoint
        const elementHeight = rect.height;
        const start = triggerPoint;
        const end = start - elementHeight;

        // Calculate normalized progress (0 to 1)
        // 0 = just entering trigger zone
        // 1 = fully passed trigger zone
        let progress = (start - rect.top) / elementHeight;

        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        newProgress[id] = progress;

        // Determine active section (the one currently crossing the trigger point)
        if (progress > 0 && progress < 1) {
          currentActiveId = id;
        } else if (progress === 1 && !currentActiveId) {
          // Keep previous section active if we haven't hit the next one yet
          // But actually, we want strictly one active. 
          // Let's say active is the one with highest progress < 1, or the last one fully visible?
          // The requirement says "Only highlight one experience section at a time"
        }
      });

      // Refined active logic: Find the first one that is currently "reading" (progress > 0 && < 1)
      // If none are reading, maybe none are active, or the last fully read one?
      // "activate highlight word by word... Scrolling back up should reverse"

      // Let's just pass the progress to each item and let it handle the word highlighting.
      // The "active" state might be useful for opacity of the whole block.

      // Find the job that is most central or currently being processed
      jobs.forEach((job) => {
        const id = job.getAttribute('data-job-id') || '';
        const p = newProgress[id];
        if (p > 0 && p < 1) {
          currentActiveId = id;
        }
      });

      // Check if we've scrolled to the bottom
      const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10;

      // If scrolled to bottom, force the last item to complete
      if (scrolledToBottom && jobs.length > 0) {
        const lastJob = jobs[jobs.length - 1];
        const lastId = lastJob.getAttribute('data-job-id') || '';
        newProgress[lastId] = 1;
        currentActiveId = lastId;
      }

      // If we are between sections, maybe keep the last one active? 
      // Or just strictly use the window.

      setActiveJobId(currentActiveId);
      setScrollProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="experience" className="p-6 h-full scroll-mt-8" ref={containerRef}>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-[0.2em]">Experience</h2>
      </div>

      <div className="space-y-12 pb-32"> {/* Reduced spacing from 24 to 12 */}
        {experience.filter(job => !job.hidden).map((job) => {
          const progress = scrollProgress[job.id] || 0;

          // Calculate opacity based on progress
          // 0-1: fading in (0.3 to 1.0)
          // >1: fading out (1.0 to 0.3)
          let opacity = 1;
          if (progress < 1) {
            opacity = progress > 0 ? 1 : 0.3;
          } else {
            // Fade out when scrolled past (progress > 1)
            const fadeOutProgress = Math.min((progress - 1) / 0.5, 1); // Fade over 0.5 progress units
            opacity = 1 - (fadeOutProgress * 0.7); // Fade from 1.0 to 0.3
          }
          // A job is "active" if it has started highlighting but not finished, 
          // OR if it's the most recently finished one and the next hasn't started?
          // Requirement: "Only highlight one experience section at a time"
          // Let's make it simple: It's active if progress > 0. 
          // But we want to dim others.

          const isActive = progress > 0 && progress < 1;
          // Or maybe we just dim everything that isn't the "current" one.
          // Let's use the calculated activeJobId.
          const isFocused = activeJobId === job.id || (progress === 1 && !activeJobId);
          // If nothing is "reading", the one fully read stays focused? 
          // Or maybe just opacity based on progress?

          // Let's try: Opacity is high if it's the active one being read.
          // If it's fully read (progress 1), it stays visible until it scrolls far off?

          return (
            <div
              key={job.id}
              data-job-id={job.id}
              className={`relative group transition-opacity duration-500`}
              style={{ opacity }}
            >
              {/* Job Header */}
              <div className="mb-4">
                <h3 className={`text-xl font-bold transition-colors duration-300 ${progress > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
                  {job.role}
                </h3>

                <div className="flex flex-wrap items-baseline justify-between text-sm mt-1">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{job.company}</span>
                  {job.period && (
                    <span className="text-gray-500 font-medium">{job.period}</span>
                  )}
                </div>
              </div>

              {/* Job Description with Word Highlighting */}
              <ul className="space-y-3 mt-3">
                {job.description.map((point, idx) => (
                  <li key={idx} className="text-sm leading-relaxed flex items-start">
                    <span className={`mr-2 mt-1.5 block w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${progress > 0 ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                    <p className="inline">
                      {point.split(' ').map((word, wordIdx, arr) => {
                        // Calculate global index of this word in the entire description to map to progress
                        // This is tricky because we have multiple bullet points.
                        // We need a way to map 0-1 progress to all words in the job.

                        // Let's assume uniform distribution of progress across all words in the job.
                        // We need the total word count for this job first? 
                        // Or we can just calculate it on the fly if we memoize.

                        // Simpler approach: 
                        // Total words in this job
                        const totalWords = job.description.reduce((acc, val) => acc + val.split(' ').length, 0);

                        // Count words before this current word
                        let wordsBefore = 0;
                        for (let i = 0; i < idx; i++) {
                          wordsBefore += job.description[i].split(' ').length;
                        }
                        wordsBefore += wordIdx;

                        const wordProgressThreshold = wordsBefore / totalWords;
                        const isHighlighted = progress > wordProgressThreshold;

                        return (
                          <span
                            key={wordIdx}
                            className={`transition-colors duration-200 ${isHighlighted ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-400 dark:text-gray-600'} print:text-black print:font-normal`}
                          >
                            {word}{wordIdx < arr.length - 1 ? ' ' : ''}
                          </span>
                        );
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceSection;
