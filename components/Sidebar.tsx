

import React, { useState, useEffect, useRef } from 'react';
import { RESUME_DATA } from '../constants';
import { MapPin, Mail, Phone, Linkedin, Github, Download } from 'lucide-react';
import ExperienceSection from './ExperienceSection';
import EncryptedText from './EncryptedText';

interface SidebarProps {
  handlePrint: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handlePrint }) => {
  const { personal, socials, education, certificates, skills, languages, clearance } = RESUME_DATA;
  const [showAlternate, setShowAlternate] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // About section scroll progress for word reveal
  const [aboutProgress, setAboutProgress] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Scroll listener for About section
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;

      const rect = aboutRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.8; // Trigger slightly earlier/later? 0.8 seems good for bottom of sidebar

      const elementHeight = rect.height;

      // Calculate progress: 0 when top enters trigger, 1 when bottom leaves trigger?
      // Actually we want it to fill up as we scroll past it.
      // Standard intersection logic:
      const start = triggerPoint;
      // const end = start - elementHeight; 

      // Progress calculation
      // We want 0 -> 1 as the element passes through the viewport "sweet spot"
      let progress = (start - rect.top) / (elementHeight * 0.8); // 0.8 factor to make it complete faster

      progress = Math.max(0, Math.min(1, progress));

      // "Once it appears it should not dissapear" -> Only update if new progress is higher
      setAboutProgress(prev => Math.max(prev, progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate profile picture every 4 seconds (unless paused)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Skip blur transition if user is hovering
      if (isHovering || isPaused) {
        setShowAlternate(prev => !prev);
        return;
      }

      // Start transition (fade out with blur)
      setIsTransitioning(true);

      // After 500ms, switch image and fade back in
      setTimeout(() => {
        setShowAlternate(prev => !prev);
        setIsTransitioning(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, isHovering]);

  const handleImageInteraction = () => {
    // On mobile (touch), toggle pause state
    // On desktop (mouse), just pause while hovering
    setIsPaused(prev => !prev);
    setIsHovering(true);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // On desktop, resume rotation when mouse leaves
    // Check if device supports hover (desktop)
    if (window.matchMedia('(hover: hover)').matches) {
      setIsPaused(false);
    }
  };

  const getDisplayImage = () => {
    if ((isHovering || isPaused) && personal.avatarHoverUrl) {
      return personal.avatarHoverUrl;
    }
    if (showAlternate && personal.avatarHoverUrl) {
      return personal.avatarHoverUrl;
    }
    return personal.avatarUrl;
  };

  return (
    <div className="flex flex-col space-y-8 p-6 md:pr-8 text-center md:text-left h-full relative">
      {/* Header Profile */}
      <div id="home" className="flex flex-col items-center md:items-start space-y-4 pt-4 md:pt-0 scroll-mt-8">
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Print-only static human image */}
          <div className="hidden print:block w-full h-full rounded-full overflow-hidden border-4 border-gray-300 shadow-lg relative z-20">
            <img
              src={personal.avatarHoverUrl || personal.avatarUrl}
              alt={personal.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Screen-only interactive image */}
          <div
            className="print:hidden w-full h-full rounded-full overflow-hidden border-4 border-matrix-green shadow-[0_0_20px_rgba(0,255,0,0.3)] relative z-10 cursor-pointer transition-transform duration-500 hover:scale-105"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleImageInteraction}
          >
            {/* Main Image (with fade transition) */}
            <img
              src={getDisplayImage()}
              alt={personal.name}
              className={`w-full h-full object-cover transition-all duration-700 ${isTransitioning ? 'blur-md opacity-80 scale-110' : 'blur-0 opacity-100 scale-100'}`}
            />

            {/* Pause Indicator overlay */}
            {isPaused && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
            )}
          </div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold underline decoration-2 underline-offset-4 decoration-gray-900 dark:decoration-white mb-2 uppercase tracking-wide">
            <span className="bg-gradient-to-r from-green-400 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              {personal.name}
            </span>
          </h1>
          <h2 className="text-sm font-semibold whitespace-nowrap">
            {/* Screen: Encrypted Effect */}
            <span className="print:hidden">
              <EncryptedText
                text={personal.title}
                initialColor="text-purple-500"
                finalColor="text-orange-500"
                duration={2500}
              />
            </span>
            {/* Print: Static Text */}
            <span className="hidden print:block text-black">
              {personal.title}
            </span>
          </h2>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="hidden md:flex mt-4 border-2 border-gray-900 dark:border-white w-40 py-2 text-lg font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-300 rounded-sm items-center justify-center gap-2 no-print"
          aria-label="Download Resume (Print to PDF)"
          title="Print to PDF"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Contact & Social */}
      <div className="space-y-2 text-sm md:text-base">
        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400">
          <MapPin size={18} />
          <span>{personal.location}</span>
        </div>
        <a href={`mailto:${personal.email}`} className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors print:text-black">
          <Mail size={18} />
          <span className="group-hover:underline">{personal.email}</span>
        </a>
        <a href={`tel:${personal.phone.replace(/\D/g, '')}`} className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors print:text-black">
          <Phone size={18} />
          <span>{personal.phone}</span>
        </a>
      </div>

      <div className="flex flex-col space-y-2 items-center md:items-start">
        <h3 className="font-bold uppercase tracking-widest mb-1 text-gray-500 dark:text-gray-500 text-xs">Social</h3>
        {socials.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {social.platform === 'LinkedIn' && <Linkedin size={18} />}
            {social.platform === 'GitHub' && <Github size={18} />}
            <span>{social.username}</span>
          </a>
        ))}
      </div>

      {/* About */}
      {/* About */}
      <div id="about" className="scroll-mt-16" ref={aboutRef}>
        <h3 className="font-bold uppercase tracking-widest mb-4 text-lg border-b-2 border-gray-200 dark:border-gray-700 pb-1">About</h3>
        <p className="text-sm leading-relaxed">
          {personal.about.split(' ').map((word, idx, arr) => {
            // Calculate threshold for this word (0 to 1)
            const threshold = idx / arr.length;
            const isRevealed = aboutProgress > threshold;

            return (
              <span
                key={idx}
                className={`transition-colors duration-500 ${isRevealed ? 'text-cyan-400 font-medium drop-shadow-[0_0_2px_rgba(34,211,238,0.5)]' : 'text-transparent opacity-10'} print:text-black print:opacity-100 print:drop-shadow-none print:font-normal`}
              >
                {word}{idx < arr.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </p>
      </div>

      {/* Experience (Mobile Only) */}
      <div className="md:hidden">
        <ExperienceSection />
      </div>

      {/* Clearance */}
      <div id="clearance" className="scroll-mt-16">
        <h3 className="font-bold uppercase tracking-widest mb-4 text-lg border-b-2 border-gray-200 dark:border-gray-700 pb-1">Clearance</h3>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {clearance}
        </p>
      </div>

      {/* Education */}
      <div id="education" className="scroll-mt-16">
        <h3 className="font-bold uppercase tracking-widest mb-6 text-lg border-b-2 border-gray-200 dark:border-gray-700 pb-1">Education</h3>
        <div className="space-y-6 relative border-l-2 border-gray-200 dark:border-gray-700 ml-1 pl-6">
          {education.map((edu) => (
            <div key={edu.id} className="relative">
              {/* Timeline Dot */}
              <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-gray-900"></span>
              <h4 className="font-bold text-sm">{edu.degree}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{edu.school}</p>
              <p className="text-xs text-gray-500 mt-0.5 italic">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div id="certificates" className="scroll-mt-16">
        <h3 className="font-bold uppercase tracking-widest mb-4 text-lg border-b-2 border-gray-200 dark:border-gray-700 pb-1">Certificates</h3>
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div key={cert.id}>
              <h4 className="font-bold text-sm">{cert.name}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-snug">{cert.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div id="skills" className="scroll-mt-16">
        <h3 className="font-bold uppercase tracking-widest mb-4 text-lg border-b-2 border-gray-200 dark:border-gray-700 pb-1">Skills</h3>
        <div className="space-y-3 text-sm">
          {skills.map((skill, idx) => (
            <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {skill}
            </p>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div id="languages" className="scroll-mt-16">
        <h3 className="font-bold uppercase tracking-widest mb-4 text-lg border-b-2 border-gray-200 dark:border-gray-700 pb-1">Languages</h3>
        <p className="text-sm">{languages.join(', ')}</p>
      </div>

      {/* Bottom Padding for mobile scrolling */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Sidebar;
