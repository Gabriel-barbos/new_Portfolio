import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Github, Linkedin } from 'lucide-react';
import { LiquidGlass } from '@/components/ui/liquid-glass';
import prof from '../assets/profile.jpeg';

const About = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent relative overflow-hidden transition-colors duration-500"
    >
      {/* Background ambient lighting for liquid glass refraction */}
      <div className="pointer-events-none absolute inset-0 bg-g7-grid bg-g7-grid-fade opacity-15 dark:opacity-25" />
      <div className="pointer-events-none absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 -right-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="container-section relative z-10">
        <h2 className="section-title">{t('about.title')}</h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center mt-12 max-w-5xl mx-auto">
          {/* Profile image with subtle glass frame */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="relative group mx-auto h-72 w-72 sm:h-80 sm:w-80">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
              
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/30 dark:border-white/15 bg-white/20 dark:bg-slate-900/40 backdrop-blur-md">
                <img
                  src={prof}
                  alt="Profile"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* About content */}
          <div className="lg:w-2/3">
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-primary font-semibold">
                  Software Engineer & AI Enthusiast
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                  Gabriel Barbosa
                </h3>
              </div>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {t('about.description')}
              </p>

              {/* Thematic Liquid Glass Connect Buttons */}
              <div className="pt-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-5">
                  {t('about.connect')}
                </h4>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {/* ─── GitHub Liquid Glass Button ────────── */}
                  <a
                    href="https://github.com/Gabriel-barbos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
                  >
                    <LiquidGlass
                      radius={999}
                      bevelDepth={12}
                      scale={32}
                      aberration={3}
                      frost={1.2}
                      tint={isDark ? 0.12 : 0.4}
                      contentClassName="flex items-center gap-3 px-7 py-3.5"
                      className={`transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.7)] ${
                        isDark
                          ? 'bg-neutral-900/60 border border-white/15 text-white hover:border-white/30'
                          : 'bg-neutral-900/10 border border-neutral-300/80 text-neutral-900 hover:border-neutral-400'
                      }`}
                    >
                      <Github className="h-5 w-5" />
                      <span className="font-semibold text-base tracking-tight">GitHub</span>
                    </LiquidGlass>
                  </a>

                  {/* ─── LinkedIn Liquid Glass Button ──────── */}
                  <a
                    href="https://www.linkedin.com/in/gabriel-barbosa-da-silva-35bb19256/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
                  >
                    <LiquidGlass
                      radius={999}
                      bevelDepth={12}
                      scale={32}
                      aberration={3}
                      frost={1.2}
                      tint={isDark ? 0.15 : 0.45}
                      contentClassName="flex items-center gap-3 px-7 py-3.5"
                      className={`transition-all duration-300 shadow-[0_8px_24px_rgba(10,102,194,0.2),inset_0_1px_0_rgba(255,255,255,0.7)] ${
                        isDark
                          ? 'bg-[#0a66c2]/20 border border-sky-400/30 text-white hover:border-sky-400/50'
                          : 'bg-blue-600/10 border border-blue-400/50 text-[#0a66c2] hover:border-blue-500'
                      }`}
                    >
                      <Linkedin className="h-5 w-5 text-[#0a66c2] dark:text-[#38bdf8]" />
                      <span className="font-semibold text-base tracking-tight text-slate-900 dark:text-white">LinkedIn</span>
                    </LiquidGlass>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
