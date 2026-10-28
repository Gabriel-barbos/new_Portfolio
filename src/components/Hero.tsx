import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from './ui/button';
import GradientASCII from './ui/gradient-ascii';
import { FileDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

// ─── Hook: Magnetic Button ─────────────────────────────────────────────────────
function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      setTransform({ x: dx, y: dy });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return { ref, transform, handleMouseMove, handleMouseLeave };
}

// ─── Component: Magnetic Button Wrapper ───────────────────────────────────────
function MagneticWrapper({
  children,
  strength = 0.4,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const { ref, transform, handleMouseMove, handleMouseLeave } = useMagnetic(strength);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition:
          transform.x === 0 && transform.y === 0
            ? 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)'
            : 'transform 0.15s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// ─── Component: Animated Horizon Underline ────────────────────────────────────
function AnimatedUnderline({ active }: { active: boolean }) {
  return (
    <div className="relative flex justify-center w-full mt-1 mb-2" aria-hidden="true">
      <svg
        viewBox="0 0 380 18"
        xmlns="http://www.w3.org/2000/svg"
        className="w-64 sm:w-80 md:w-96 lg:w-[440px] overflow-visible"
      >
        <defs>
          <linearGradient id="horizon-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="75%" stopColor="#2563eb" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e3fd8" stopOpacity="0" />
          </linearGradient>
          <filter id="horizon-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 10 13 Q 190 2 370 13"
          fill="none"
          stroke="url(#horizon-line-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#horizon-glow)"
          style={{
            strokeDasharray: 380,
            strokeDashoffset: active ? 0 : 380,
             opacity: active ? 1 : 0,
            transition: active
              ? 'stroke-dashoffset 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.75s, opacity 0.5s ease 0.75s'
              : 'none',
          }}
        />
      </svg>
    </div>
  );
}

// ─── Component: Bottom-to-Top Horizon Name Reveal ─────────────────────────────
function HorizonNameReveal({
  name,
  isDark,
}: {
  name: string;
  isDark: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo(() => name.split(' '), [name]);

  // Smooth custom cubic-bezier that mimics emerging from the horizon curve
  const horizonEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  let globalCharIndex = 0;

  return (
    <span
      className="relative inline-flex flex-wrap justify-center gap-x-3 sm:gap-x-4 md:gap-x-6 font-mono tracking-tight select-none"
      aria-label={name}
      style={{ perspective: '900px' }}
    >
      {/* Ambient horizon glow behind the name */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.75, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.35, ease: horizonEase }}
        className="pointer-events-none absolute -inset-x-8 -inset-y-4 rounded-full blur-3xl -z-10"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 70%, rgba(56, 189, 248, 0.28) 0%, rgba(30, 63, 216, 0.18) 45%, transparent 75%)'
            : 'radial-gradient(ellipse at 50% 70%, rgba(37, 99, 235, 0.18) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 75%)',
        }}
      />

      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-flex overflow-hidden py-1.5 px-1 -my-1.5"
        >
          {word.split('').map((char, charIdx) => {
            const idx = globalCharIndex++;
            const delay = prefersReducedMotion ? 0 : 0.22 + idx * 0.042;

            return (
              <motion.span
                key={`${wordIdx}-${charIdx}`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: '0%' }
                    : {
                        y: '118%',
                        opacity: 0,
                        rotateX: 42,
                        scale: 0.9,
                        filter: 'blur(10px)',
                      }
                }
                animate={{
                  y: '0%',
                  opacity: 1,
                  rotateX: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 1.05,
                  delay,
                  ease: horizonEase,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.06,
                  transition: { duration: 0.22, ease: 'easeOut' },
                }}
                className="inline-block will-change-transform cursor-default"
                style={{
                  transformOrigin: '50% 100%',
                  backgroundImage: isDark
                    ? 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 48%, #7dd3fc 88%, #38bdf8 100%)'
                    : 'linear-gradient(180deg, #090d16 0%, #1e3a8a 52%, #1d4ed8 85%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: isDark
                    ? 'drop-shadow(0 8px 24px rgba(56, 189, 248, 0.28))'
                    : 'drop-shadow(0 6px 18px rgba(30, 63, 216, 0.16))',
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

// ─── Component: Scroll Progress ───────────────────────────────────────────────
function ScrollProgress({ sections = [] }: { sections?: string[] }) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const sectionEls = sections.map((id) => document.getElementById(id));
      let current = 0;
      sectionEls.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          current = i;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-3"
      style={{ zIndex: 50 }}
      aria-label="Navegação por seções"
    >
      <div
        className="relative flex flex-col items-center"
        style={{ height: `${sections.length * 28 + 24}px` }}
      >
        {/* Track */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-foreground/15 rounded-full"
          style={{ top: 12, bottom: 12 }}
          aria-hidden="true"
        />
        {/* Fill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-primary rounded-full"
          style={{
            top: 12,
            bottom: 12,
            transformOrigin: 'top',
            transform: `scaleY(${progress})`,
            transition: 'transform 0.1s linear',
          }}
          aria-hidden="true"
        />

        {/* Dots */}
        {sections.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Ir para ${id}`}
            className="relative z-10 flex items-center justify-center"
            style={{ height: 28, width: 20 }}
          >
            <div
              style={{
                width: activeSection === i ? 8 : 5,
                height: activeSection === i ? 8 : 5,
                borderRadius: '50%',
                background:
                  activeSection === i
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--foreground) / 0.25)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow:
                  activeSection === i ? '0 0 0 3px hsl(var(--primary) / 0.2)' : 'none',
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Main Hero Component ───────────────────────────────────────────────────────
const Hero = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-adaptive palettes for GradientASCII
  const asciiColors = useMemo(
    () =>
      isDark
        ? ['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']
        : ['#93c5fd', '#3b82f6', '#1d4ed8', '#1e3fd8'],
    [isDark]
  );

  const socialLinks = {
    github: 'https://github.com/Gabriel-barbos',
    linkedin: 'https://www.linkedin.com/in/gabriel-barbosa-da-silva-35bb19256/',
    email: 'mailto:gabriel.barbosa79@outlook.com',
    cv: 'docs/CV_GABRIEL-BARBOSA 09.07.pdf',
  };

  const sections = ['home', 'skills', 'projects', 'contact'];
  const horizonEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <>
      {/* Scroll progress sidebar */}
      <ScrollProgress sections={sections} />

      <section
        id="home"
        className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden transition-colors duration-700 bg-[#eef4ff] dark:bg-[#03050c]"
      >
        {/* ─── GradientASCII WebGL2 Background ────────────────────────────── */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <GradientASCII
            colors={asciiColors}
            shape="horizon"
            characters=" =+xX0S8#@"
            cellSize={18}
            density={0.8}
            glyphOpacity={isDark ? 0.85 : 0.72}
            gradientOpacity={isDark ? 0.9 : 0.6}
            glow={isDark ? 0.24 : 0.16}
            flicker={0.2}
            softness={0.5}
            scale={1}
            flow={0.5}
            speed={1}
            grain={0.08}
            mouseInteraction={true}
            scrambleRadius={0.11}
            clickEffect="wave"
            intro={true}
            lightMode={!isDark}
          />
        </div>

        {/* ─── Atmospheric Overlays for Contrast & Seamless Theme Blending ── */}
        {/* Top subtle vignette to keep Header navigation crystal clear */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 transition-colors duration-700"
          style={{
            zIndex: 1,
            background: isDark
              ? 'linear-gradient(to bottom, rgba(3, 5, 12, 0.72) 0%, rgba(3, 5, 12, 0.25) 55%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(233, 238, 248, 0.82) 0%, rgba(233, 238, 248, 0.3) 55%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Center soft radial contrast veil behind typography */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            zIndex: 1,
            background: isDark
              ? 'radial-gradient(ellipse 65% 55% at 50% 54%, rgba(3, 6, 18, 0.52) 0%, rgba(3, 6, 18, 0.18) 60%, transparent 100%)'
              : 'radial-gradient(ellipse 65% 55% at 50% 54%, rgba(245, 248, 255, 0.68) 0%, rgba(245, 248, 255, 0.25) 60%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Bottom seamless transition into the next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/60 to-transparent"
          style={{ zIndex: 2 }}
          aria-hidden="true"
        />

        {/* ─── Hero Content (Coordinated Bottom-to-Top Horizon Emergence) ─── */}
        <div className="container-section relative w-full" style={{ zIndex: 10 }}>
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Greeting Pill - Rises from bottom */}
            <div className="overflow-hidden mb-5 p-1">
              <motion.div
                initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.1, ease: horizonEase }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm sm:text-base font-medium backdrop-blur-md border transition-colors duration-500
                  bg-white/75 text-blue-700 border-blue-500/25 shadow-[0_4px_20px_rgba(37,99,235,0.12)]
                  dark:bg-slate-950/60 dark:text-sky-300 dark:border-sky-400/25 dark:shadow-[0_0_25px_rgba(56,189,248,0.18)]"
              >
                <span
                  className="inline-block animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                >
                  👋
                </span>
                <span>{t('hero.greeting')}</span>
                <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400 animate-pulse" />
              </motion.div>
            </div>

            {/* Name + Horizon Underline + Role */}
            <div className="relative mb-6 w-full">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.08] tracking-tight">
                {/* Bottom-to-Top Character Stagger Reveal */}
                <HorizonNameReveal name="Gabriel Barbosa" isDark={isDark} />

                {/* Horizon Curved Glowing Underline */}
                <AnimatedUnderline active={mounted} />

                {/* Role rising from bottom with clip-mask */}
                <span className="block overflow-hidden mt-2 py-1">
                  <motion.span
                    initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.95, delay: 0.72, ease: horizonEase }}
                    className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                    style={{
                      backgroundImage: isDark
                        ? 'linear-gradient(90deg, #93c5fd 0%, #38bdf8 50%, #e0f2fe 100%)'
                        : 'linear-gradient(90deg, #1e3fd8 0%, #2563eb 50%, #0284c7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {t('hero.role')}
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* Description rising from bottom */}
            <motion.div
              initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.9, ease: horizonEase }}
              className="relative mb-10 px-4 py-2 rounded-2xl"
            >
              <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-200/90 max-w-2xl leading-relaxed font-normal drop-shadow-sm">
                <span className="font-semibold text-slate-950 dark:text-white">
                  {t('description.part1')}
                </span>
                {t('description.part2')}
                <span className="text-blue-700 dark:text-sky-300 font-semibold">
                  {t('description.highlight')}
                </span>
                {t('description.part3')}
              </p>
            </motion.div>

            {/* CTAs with Magnetic Effect & Bottom-to-Top Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 1.05, ease: horizonEase }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-9"
            >
              <MagneticWrapper strength={0.35}>
                <Button
                  size="lg"
                  className="group relative overflow-hidden px-8 py-6 text-base sm:text-lg font-semibold rounded-xl
                    bg-gradient-to-r from-[#1e3fd8] via-blue-600 to-sky-500 text-white
                    shadow-[0_8px_30px_rgba(30,63,216,0.35)] hover:shadow-[0_12px_36px_rgba(56,189,248,0.45)]
                    border border-white/15 transition-all duration-300 hover:scale-[1.02]"
                  asChild
                >
                  <a href="#projects">
                    <span className="relative z-10">{t('hero.cta')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </a>
                </Button>
              </MagneticWrapper>

              <MagneticWrapper strength={0.35}>
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden px-8 py-6 text-base sm:text-lg font-semibold rounded-xl
                    backdrop-blur-md bg-white/75 dark:bg-slate-950/55
                    border-slate-300/80 dark:border-sky-400/30
                    text-slate-900 dark:text-white
                    hover:border-blue-500/60 dark:hover:border-sky-400/60
                    shadow-sm transition-all duration-300 hover:scale-[1.02]"
                  asChild
                >
                  <a
                    href={socialLinks.cv}
                    target="_blank"
                    download
                    rel="noopener noreferrer"
                  >
                    <span className="absolute inset-0 w-0 bg-blue-500/10 dark:bg-sky-400/15 transition-all duration-300 ease-out group-hover:w-full" />
                    <span className="relative flex items-center">
                      <FileDown className="mr-2 h-5 w-5 text-blue-600 dark:text-sky-400 group-hover:animate-bounce" />
                      {t('hero.download')}
                    </span>
                  </a>
                </Button>
              </MagneticWrapper>
            </motion.div>

            {/* Social Links with Staggered Upward Reveal */}
            <div className="flex items-center gap-4">
              {[
                {
                  href: socialLinks.github,
                  Icon: Github,
                  label: 'Perfil no GitHub',
                  target: '_blank',
                },
                {
                  href: socialLinks.linkedin,
                  Icon: Linkedin,
                  label: 'Perfil no LinkedIn',
                  target: '_blank',
                },
                {
                  href: socialLinks.email,
                  Icon: Mail,
                  label: 'Enviar E-mail',
                  target: undefined,
                },
              ].map(({ href, Icon, label, target }, idx) => (
                <motion.a
                  key={label}
                  href={href}
                  target={target}
                  rel={target ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  initial={{ opacity: 0, y: 24, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 1.2 + idx * 0.08,
                    ease: horizonEase,
                  }}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3.5 rounded-full backdrop-blur-md transition-colors duration-300 inline-flex items-center justify-center
                    bg-white/75 text-slate-800 border border-slate-300/70 hover:border-blue-500/50 hover:text-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]
                    dark:bg-slate-900/65 dark:text-slate-200 dark:border-white/10 dark:hover:border-sky-400/50 dark:hover:text-sky-300 dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator emerging from the horizon base */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.45, ease: horizonEase }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ zIndex: 10 }}
        >
          <a href="#skills" aria-label="Scroll down" className="group">
            <div className="flex flex-col items-center opacity-75 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300/80 mb-2">
                Role para baixo
              </span>
              <div className="w-6 h-10 border-2 border-slate-400/50 dark:border-slate-400/35 rounded-full flex justify-center items-start pt-2 backdrop-blur-sm bg-white/30 dark:bg-slate-950/30">
                <div className="w-1 h-2 bg-blue-600 dark:bg-sky-400 rounded-full animate-[bounce_1.5s_infinite]" />
              </div>
            </div>
          </a>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;