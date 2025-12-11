
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Home, User, GraduationCap, Briefcase, FileText, Award, LayoutGrid, Medal, Download, Shield, Globe, Play, Pause } from 'lucide-react';
import QRCode from 'react-qr-code';
import MatrixBackground from './components/MatrixBackground';
import Sidebar from './components/Sidebar';
import ExperienceSection from './components/ExperienceSection';

function App() {
  // State for dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or system preference
    const savedMode = localStorage.getItem('theme');
    if (savedMode) return savedMode === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollIntervalRef = useRef<number | null>(null);
  const [showStartOverlay, setShowStartOverlay] = useState(false);

  // Check device type for behavior
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: Show "Launch Experience" overlay (Vignette)
      setShowStartOverlay(true);
    } else {
      // Desktop: No overlay, just auto-start scrolling after intro animations
      // Wait for EncryptedText (2.5s) + buffer = 3.5s
      const timer = setTimeout(() => {
        startAutoScroll();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStartExperience = () => {
    // 1. Hide overlay (reveals resume)
    setShowStartOverlay(false);

    // 2. Start scrolling after EncryptedText effect finishes (2.5s) + buffer
    setTimeout(() => {
      startAutoScroll();
    }, 3500);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Pech, Jacob Resume";
    window.print();
    document.title = originalTitle;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for the header if needed, but default smooth scroll is usually fine
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Auto-scroll logic with scroll-behavior fix
  const startAutoScroll = () => {
    console.log(`[Auto-scroll DEBUG] startAutoScroll called. Current intervalRef: ${autoScrollIntervalRef.current}`);

    if (autoScrollIntervalRef.current) {
      return;
    }

    // CRITICAL FIX: Disable smooth scrolling on HTML element during auto-scroll
    // iOS fights between CSS smooth scroll and JS scroll updates
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    console.log('[Auto-scroll DEBUG] Setting isAutoScrolling to true');
    setIsAutoScrolling(true);

    // Resume is now visible, give it a moment to layout then start scrolling
    console.log('[Auto-scroll DEBUG] Creating setInterval...');
    let scrollCount = 0;

    const intervalId = window.setInterval(() => {
      scrollCount++;
      const beforeScroll = window.scrollY;

      // Try specific iOS scroll fix: window.scrollTo
      window.scrollTo(0, window.scrollY + 1);

      const afterScroll = window.scrollY;

      if (scrollCount % 50 === 0) {
        console.log(`[Auto-scroll DEBUG] Tick #${scrollCount}: ${beforeScroll} -> ${afterScroll}`);
      }
    }, 20);

    autoScrollIntervalRef.current = intervalId;
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    // Restore smooth scrolling for user
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    setIsAutoScrolling(false);
  };

  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };



  // Stop auto-scroll on user touch/interaction
  useEffect(() => {
    const lastTouchY = { current: 0 };

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isAutoScrolling) return;

      const currentY = e.touches[0].clientY;
      const deltaY = Math.abs(currentY - lastTouchY.current);

      // If user moves finger more than 5px threshold, stop auto-scroll
      if (deltaY > 5) {
        console.log('[Auto-scroll] User touch detected, stopping auto-scroll');
        stopAutoScroll();
      }
    };

    const handleWheel = () => {
      if (isAutoScrolling) {
        console.log('[Auto-scroll] Wheel event detected, stopping auto-scroll');
        stopAutoScroll();
      }
    };

    // Listen for touch and wheel events with passive:true for iOS performance
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isAutoScrolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative font-sans selection:bg-green-300 selection:text-green-900">
      {/* Matrix Background - Visible in both modes, style adapts. Hidden in print via CSS in component */}
      <MatrixBackground mode={darkMode ? 'dark' : 'light'} />

      {/* Print-safe container setup */}
      {/* In screen mode: centered container with shadow. In print mode: simple full width div. */}
      <div className="relative z-10 min-h-screen p-0 md:p-8 lg:p-12 flex justify-center items-start print:p-0">

        {/* The "Paper" - Resume Card - HIDDEN WHEN OVERLAY IS ACTIVE */}
        {!showStartOverlay && (
          <div className="resume-container w-full max-w-6xl bg-white/40 md:bg-white/85 dark:bg-[#121212]/60 md:dark:bg-[#121212]/90 backdrop-blur-sm shadow-2xl rounded-none md:rounded-lg overflow-hidden transition-colors duration-300 border border-transparent dark:border-gray-800 print:border-none print:shadow-none print:rounded-none print:bg-white print:text-black pb-16 md:pb-0 animate-in fade-in zoom-in-95 duration-700 relative">

            {/* Print-Only QR Code - Top Right of Page 1 - Table Layout for Invincibility */}
            <div className="hidden print:block absolute top-4 right-4 z-50 bg-white p-2">
              <table style={{ borderCollapse: 'collapse', width: 'auto' }}>
                <tbody>
                  <tr>
                    <td align="center" style={{ paddingBottom: '4px' }}>
                      <a
                        href="https://pechjacob.github.io/live-resume/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-black font-semibold no-underline hover:underline"
                        style={{ display: 'block', width: '100%', textAlign: 'center' }}
                      >
                        Live Resume
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <div className="bg-white p-1 inline-block">
                        <QRCode
                          value="https://pechjacob.github.io/live-resume/"
                          size={64}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Desktop Theme Toggle - Absolute Top Right - Hidden in Print */}


            <div className="flex flex-col md:flex-row min-h-full print:block relative">

              {/* Left Column: Sidebar (Profile, Skills, Edu) */}
              {/* Force white bg in print, full height */}
              <div className="w-full md:w-1/3 lg:w-[30%] bg-white/50 md:bg-white/90 dark:bg-[#1a1a1a]/80 md:dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 print:w-[30%] print:float-left print:bg-white print:border-r print:border-gray-300 print:min-h-screen order-1" id="sidebar">
                <Sidebar handlePrint={handlePrint} />
              </div>

              {/* Right Column: Experience */}
              {/* Darker background in print (gray-400 hex equivalent) as requested */}
              <div
                className="hidden md:block w-full md:w-2/3 lg:w-[70%] bg-gray-50/50 md:bg-gray-50/90 dark:bg-transparent print:w-[70%] print:float-right print:!bg-[#e5e7eb] print:text-black print:block order-2"
                id="experience"
                style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
              >
                <ExperienceSection />
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation - Glassmorphism Updated */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/30 dark:bg-white/30 backdrop-blur-xl border-t border-gray-700/30 dark:border-gray-200/30 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] z-[100] h-16 flex items-center justify-between px-6 no-print transition-colors duration-300">
        <div className="flex items-center gap-2">
          {/* Download Button */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-100 transition-colors"
            aria-label="Download Resume"
          >
            <Download size={20} className="text-white dark:text-black" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-100 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun size={20} className="text-green-600" />
            ) : (
              <Moon size={20} className="text-green-400" />
            )}
          </button>

          {/* Auto-Scroll Play/Pause */}
          <button
            onClick={toggleAutoScroll}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-100 transition-colors"
            aria-label={isAutoScrolling ? "Pause Auto-Scroll" : "Play Auto-Scroll"}
          >
            {isAutoScrolling ? (
              <Pause size={20} className="text-red-500" />
            ) : (
              <Play size={20} className="text-green-500" />
            )}
          </button>
        </div>

        <span className="font-bold text-lg tracking-tight text-white dark:text-black">
          LIVE RESUME
        </span>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md hover:bg-white/10 dark:hover:bg-gray-100 transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          <LayoutGrid size={24} className="text-white dark:text-black" />
        </button>
      </div>

      {/* Mobile Menu Overlay (Expanded) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-16 z-[90] bg-[#333333] text-gray-200 rounded-t-3xl p-8 shadow-2xl transform transition-transform duration-300 no-print animate-in slide-in-from-bottom-10 fade-in">
          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
            <button onClick={() => scrollToSection('about')} className="flex flex-col items-center gap-2 hover:text-white transition-colors">
              <User size={32} className="opacity-80" />
              <span className="text-sm font-medium tracking-wide">About</span>
            </button>

            <button onClick={() => scrollToSection('experience')} className="flex flex-col items-center gap-2 hover:text-white transition-colors">
              <Briefcase size={32} className="opacity-80" />
              <span className="text-sm font-medium tracking-wide">Experience</span>
            </button>

            <button onClick={() => scrollToSection('clearance')} className="flex flex-col items-center gap-2 hover:text-white transition-colors">
              <Shield size={32} className="opacity-80" />
              <span className="text-sm font-medium tracking-wide">Clearance</span>
            </button>

            <button onClick={() => scrollToSection('education')} className="flex flex-col items-center gap-2 hover:text-white transition-colors">
              <GraduationCap size={32} className="opacity-80" />
              <span className="text-sm font-medium tracking-wide">Education</span>
            </button>

            <button onClick={() => scrollToSection('certificates')} className="flex flex-col items-center gap-2 hover:text-white transition-colors">
              <Award size={32} className="opacity-80" />
              <span className="text-sm font-medium tracking-wide">Certificates</span>
            </button>

            <button onClick={() => scrollToSection('skills')} className="flex flex-col items-center gap-2 hover:text-white transition-colors">
              <FileText size={32} className="opacity-80" />
              <span className="text-sm font-medium tracking-wide">Skills</span>
            </button>

            <button onClick={() => scrollToSection('languages')} className="flex flex-col items-center gap-2 hover:text-white transition-colors">
              <Globe size={32} className="opacity-80" />
              <span className="text-sm font-medium tracking-wide">Languages</span>
            </button>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-[80] md:hidden no-print"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Tap-to-Start Overlay (iOS Unlock) - VIGNETTE STYLE */}
      {showStartOverlay && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center no-print animate-in fade-in duration-500">
          {/* Vignette Background: Transparent center, Dark edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_60%,rgba(0,0,0,0.95)_100%)]" />

          <div className="max-w-md w-full p-8 text-center relative z-10">
            <div className="flex flex-col items-center gap-8">
              {/* Floating/Bouncing Icon */}
              <div className="p-6 rounded-full bg-matrix-green/5 ring-1 ring-matrix-green/20 animate-bounce-slight backdrop-blur-sm">
                <Play size={40} className="text-matrix-green fill-current drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white tracking-[0.2em] font-mono drop-shadow-md">
                  RESUME INITIALIZED
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-matrix-green/50 to-transparent mx-auto" />

              </div>

              {/* Enhanced Button */}
              <button
                onClick={handleStartExperience}
                className="group relative py-4 px-10 bg-transparent overflow-hidden rounded-sm transition-all hover:scale-105 active:scale-95"
              >
                {/* Button Background/Border Glow */}
                <div className="absolute inset-0 border border-matrix-green/80 bg-matrix-green/10 shadow-[0_0_20px_rgba(0,255,0,0.2)] group-hover:bg-matrix-green/20 group-hover:shadow-[0_0_30px_rgba(0,255,0,0.4)] transition-all duration-300" />

                {/* Button Text */}
                <span className="relative z-10 flex items-center justify-center gap-2 text-matrix-green font-bold text-sm tracking-widest uppercase group-hover:text-white transition-colors font-mono">
                  Launch Experience
                  <span className="flex items-center gap-1 ml-2 normal-case">
                    <span className="text-blue-400">~</span>
                    <span className="text-white">$</span>
                    <span className="w-2.5 h-5 bg-white animate-cursor-blink inline-block align-middle" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Floating Badge - Glass Style - Integrated Controls */}
      <div className="hidden md:flex fixed bottom-12 right-0 z-50 items-center justify-center w-auto min-w-[380px] pl-10 pr-10 py-4 bg-white/40 dark:bg-black/40 backdrop-blur-xl border-l border-t border-b border-white/20 dark:border-white/10 shadow-2xl rounded-l-full no-print">
        <div className="flex items-center gap-6">
          {/* Download */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors"
            title="Download Resume"
            aria-label="Download Resume"
          >
            <Download size={24} />
          </button>

          {/* Play/Pause */}
          <button
            onClick={toggleAutoScroll}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title={isAutoScrolling ? "Pause Auto-Scroll" : "Resume Auto-Scroll"}
          >
            {isAutoScrolling ? <Pause size={24} className="text-red-500" /> : <Play size={24} className="text-green-500" />}
          </button>

          {/* Text */}
          <span className="font-bold text-xl tracking-widest text-shadow-sm text-black dark:text-white uppercase font-mono whitespace-nowrap">
            LIVE RESUME
          </span>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={24} className="text-matrix-green" /> : <Moon size={24} className="text-matrix-green" />}
          </button>
        </div>
      </div>

      {/* Desktop Quick Actions (Optional) */}
      <div className="fixed bottom-8 right-8 z-50 hidden md:block no-print">
        {/* Placeholder for additional tool menu if needed */}
      </div>

    </div >
  );
}

export default App;
