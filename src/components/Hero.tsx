import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Hook: Scramble Text ───────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function useScramble(target, { delay = 0, duration = 1200, active = true } = {}) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    let startTime = null;
    let timeoutId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * target.length);

      const scrambled = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };

    timeoutId = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, delay, duration, active]);

  return display;
}

// ─── Hook: Magnetic Button ─────────────────────────────────────────────────────
function useMagnetic(strength = 0.4) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setTransform({ x: dx, y: dy });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return { ref, transform, handleMouseMove, handleMouseLeave };
}

// ─── Component: Magnetic Button Wrapper ───────────────────────────────────────
function MagneticWrapper({ children, strength = 0.4 }) {
  const { ref, transform, handleMouseMove, handleMouseLeave } = useMagnetic(strength);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transform.x === 0 && transform.y === 0
          ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'transform 0.15s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// ─── Component: SVG Underline ──────────────────────────────────────────────────
function AnimatedUnderline({ active }) {
  return (
    <svg
      viewBox="0 0 340 14"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs md:max-w-sm lg:max-w-md"
      style={{ display: 'block', marginTop: '-4px', overflow: 'visible' }}
      aria-hidden="true"
    >
      <path
        d="M4 9 C60 4, 160 12, 220 7 S300 3, 336 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-primary"
        style={{
          strokeDasharray: 340,
          strokeDashoffset: active ? 0 : 340,
          transition: active
            ? 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.8s'
            : 'none',
        }}
      />
    </svg>
  );
}

// ─── Component: Dot Grid with Parallax ────────────────────────────────────────
function DotGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const SPACING = 36;
    const RADIUS = 1.2;
    const MAX_SHIFT = 6;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * SPACING - SPACING / 2;
          const baseY = r * SPACING - SPACING / 2;

          const dx = mouseRef.current.x - baseX;
          const dy = mouseRef.current.y - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 280);

          const shiftX = dx * influence * 0.08;
          const shiftY = dy * influence * 0.08;
          const clampedX = Math.sign(shiftX) * Math.min(Math.abs(shiftX), MAX_SHIFT);
          const clampedY = Math.sign(shiftY) * Math.min(Math.abs(shiftY), MAX_SHIFT);

          const opacity = 0.08 + influence * 0.22;

          ctx.beginPath();
          ctx.arc(baseX + clampedX, baseY + clampedY, RADIUS + influence * 1.4, 0, Math.PI * 2);

          const isDark = document.documentElement.classList.contains('dark');
          ctx.fillStyle = isDark
            ? `rgba(255,255,255,${opacity})`
            : `rgba(0,0,0,${opacity})`;
          ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}

// ─── Component: Grain Overlay ──────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.035, mixBlendMode: 'overlay' }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}

// ─── Component: Scroll Progress ───────────────────────────────────────────────
function ScrollProgress({ sections = [] }) {
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
      className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
      style={{ zIndex: 50 }}
      aria-label="Navegação por seções"
    >
      {/* Linha de progresso */}
      <div
        className="relative flex flex-col items-center"
        style={{ height: `${sections.length * 28 + 24}px` }}
      >
        {/* Track */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-foreground/10 rounded-full"
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
                background: activeSection === i ? 'hsl(var(--primary))' : 'hsl(var(--foreground) / 0.2)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: activeSection === i ? '0 0 0 3px hsl(var(--primary) / 0.2)' : 'none',
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrambledName = useScramble('Gabriel Barbosa', {
    delay: 300,
    duration: 1400,
    active: mounted,
  });

  const socialLinks = {
    github: 'https://github.com/Gabriel-barbos',
    linkedin: 'https://www.linkedin.com/in/gabriel-barbosa-da-silva-35bb19256/',
    email: 'mailto:gabriel.barbosa79@outlook.com',
    cv: 'docs/CV_GABRIEL-BARBOSA 09.07.pdf',
  };

  const sections = ['home', 'skills', 'projects', 'contact'];

  return (
    <>
      {/* Scroll progress sidebar */}
      <ScrollProgress sections={sections} />

      <section
        id="home"
        className="min-h-screen flex items-center py-20 relative overflow-hidden"
      >
        {/* Dot grid parallax background */}
        <DotGrid />

        {/* Grain texture */}
        <GrainOverlay />

        {/* Content */}
        <div className="container-section relative" style={{ zIndex: 10 }}>
          <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-4xl mx-auto md:mx-0">

            {/* Greeting */}
            <p
              className="text-xl md:text-2xl font-medium text-primary mb-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
              }}
            >
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>👋</span>
              <span className="ml-2">{t('hero.greeting')}</span>
            </p>

            {/* Nome com scramble + underline SVG */}
            <div className="relative mb-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                {/* Nome com scramble */}
                <span
                  className="block font-mono tracking-tight"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.2s',
                    background: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--primary)) 50%, hsl(var(--foreground)) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  aria-label="Gabriel Barbosa"
                >
                  {mounted ? scrambledName || 'Gabriel Barbosa' : 'Gabriel Barbosa'}
                </span>

                {/* SVG underline desenhando */}
                <AnimatedUnderline active={mounted} />

                {/* Role */}
                <span
                  className="block mt-3"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
                    background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t('hero.role')}
                </span>
              </h1>
            </div>

            {/* Descrição */}
            <div
              className="relative mb-10"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s',
              }}
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                <span className="font-semibold text-foreground">{t('description.part1')}</span>
                {t('description.part2')}
                <span className="text-primary font-medium">{t('description.highlight')}</span>
                {t('description.part3')}
              </p>
            </div>

            {/* CTAs com efeito magnético */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.9s, transform 0.7s ease 0.9s',
              }}
            >
              <MagneticWrapper strength={0.35}>
                <Button
                  size="lg"
                  className="group relative overflow-hidden px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <a href="#projects">
                    <span className="relative z-10">{t('hero.cta')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </a>
                </Button>
              </MagneticWrapper>

              <MagneticWrapper strength={0.35}>
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <a href={socialLinks.cv} target="_blank" download rel="noopener noreferrer">
                    <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full" />
                    <span className="relative flex items-center">
                      <FileDown className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                      {t('hero.download')}
                    </span>
                  </a>
                </Button>
              </MagneticWrapper>
            </div>

            {/* Social links */}
            <div
              className="flex gap-4"
              style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.7s ease 1.1s',
              }}
            >
              {[
                { href: socialLinks.github, Icon: Github, label: 'Perfil no GitHub', target: '_blank' },
                { href: socialLinks.linkedin, Icon: Linkedin, label: 'Perfil no LinkedIn', target: '_blank' },
                { href: socialLinks.email, Icon: Mail, label: 'Enviar E-mail', target: undefined },
              ].map(({ href, Icon, label, target }) => (
                <a
                  key={label}
                  href={href}
                  target={target}
                  rel={target ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-3 rounded-full hover:scale-110 hover:bg-primary/10 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" style={{ zIndex: 10 }}>
          <a href="#skills" aria-label="Scroll down" className="group">
            <div className="flex flex-col items-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm text-muted-foreground mb-2">Role para baixo</span>
              <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center items-start pt-2">
                <div className="w-1 h-2 bg-primary rounded-full animate-[bounce_1.5s_infinite]" />
              </div>
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;