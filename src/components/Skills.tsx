import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import OrbitImages from './ui/OrbitImages';
import ElectricLogo from './ui/ElectricLogo';
import { PointerHighlight } from './ui/pointer-highlight';

import javascript from '../assets/icons2/javascript-svgrepo-com.svg';
import java from '../assets/icons2/java-svgrepo-com.svg';
import python from '../assets/icons2/python-svgrepo-com.svg';
import mongo from '../assets/icons2/mongodb-svgrepo-com.svg';
import next from '../assets/icons2/next-dot-js-svgrepo-com.svg';
import node from '../assets/icons2/node-js-svgrepo-com.svg';
import react from '../assets/icons2/react-svgrepo-com.svg';
import tailwind from '../assets/icons2/tailwind-svgrepo-com.svg';
import git from '../assets/icons2/git-svgrepo-com.svg';
import github from '../assets/icons2/github-142-svgrepo-com.svg';
import html from '../assets/icons2/html-5-svgrepo-com.svg';
import css from '../assets/icons2/css-svgrepo-com.svg';
import mysql from '../assets/icons2/mysql-logo-svgrepo-com.svg';
import arduino from '../assets/icons2/arduino-svgrepo-com.svg';
import kotlin from '../assets/icons2/kotlin-svgrepo-com.svg';
import typescript from '../assets/icons2/typescript-icon-svgrepo-com.svg';
import fastapi from '../assets/icons-globe/fastapi.png';
import react_native from '../assets/icons-globe/react-native.png';

interface TechItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  glowColor: string;
  tagPt: string;
  tagEn: string;
}

const TECH_STACK: TechItem[] = [
  {
    id: 'react',
    name: 'React',
    icon: react,
    color: '#bae6fd',
    glowColor: '#00d8ff',
    tagPt: 'Frontend',
    tagEn: 'Frontend',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: typescript,
    color: '#bfdbfe',
    glowColor: '#3178c6',
    tagPt: 'Linguagem',
    tagEn: 'Language',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: next,
    color: '#e2e8f0',
    glowColor: '#64748b',
    tagPt: 'Fullstack',
    tagEn: 'Fullstack',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: node,
    color: '#bbf7d0',
    glowColor: '#3c873a',
    tagPt: 'Backend',
    tagEn: 'Backend',
  },
  {
    id: 'python',
    name: 'Python',
    icon: python,
    color: '#fde68a',
    glowColor: '#3776ab',
    tagPt: 'Backend & IA',
    tagEn: 'Backend & AI',
  },
  {
    id: 'java',
    name: 'Java',
    icon: java,
    color: '#fed7aa',
    glowColor: '#ea580c',
    tagPt: 'Backend',
    tagEn: 'Backend',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    icon: kotlin,
    color: '#e9d5ff',
    glowColor: '#7f52ff',
    tagPt: 'Mobile & Backend',
    tagEn: 'Mobile & Backend',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    icon: fastapi,
    color: '#99f6e4',
    glowColor: '#059669',
    tagPt: 'API',
    tagEn: 'API',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: javascript,
    color: '#fef08a',
    glowColor: '#eab308',
    tagPt: 'Linguagem',
    tagEn: 'Language',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: tailwind,
    color: '#a5f3fc',
    glowColor: '#06b6d4',
    tagPt: 'UI / Styling',
    tagEn: 'UI / Styling',
  },
  {
    id: 'react-native',
    name: 'React Native',
    icon: react_native,
    color: '#bae6fd',
    glowColor: '#0284c7',
    tagPt: 'Mobile',
    tagEn: 'Mobile',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: mongo,
    color: '#bbf7d0',
    glowColor: '#10b981',
    tagPt: 'Database',
    tagEn: 'Database',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: mysql,
    color: '#bae6fd',
    glowColor: '#00758f',
    tagPt: 'Database',
    tagEn: 'Database',
  },
  {
    id: 'git',
    name: 'Git',
    icon: git,
    color: '#fecaca',
    glowColor: '#f05032',
    tagPt: 'DevOps',
    tagEn: 'DevOps',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: github,
    color: '#e2e8f0',
    glowColor: '#6366f1',
    tagPt: 'DevOps',
    tagEn: 'DevOps',
  },
  {
    id: 'html',
    name: 'HTML5',
    icon: html,
    color: '#fed7aa',
    glowColor: '#e34f26',
    tagPt: 'Frontend',
    tagEn: 'Frontend',
  },
  {
    id: 'css',
    name: 'CSS3',
    icon: css,
    color: '#bfdbfe',
    glowColor: '#264de4',
    tagPt: 'UI / Styling',
    tagEn: 'UI / Styling',
  },
  {
    id: 'arduino',
    name: 'Arduino & IoT',
    icon: arduino,
    color: '#a5f3fc',
    glowColor: '#00979d',
    tagPt: 'IoT',
    tagEn: 'IoT',
  },
];

const Skills = () => {
  const { t, locale } = useLanguage();
  const { theme } = useTheme();
  const isPt = locale === 'pt';

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const orbitImages = useMemo(
    () =>
      TECH_STACK.map(tech => ({
        src: tech.icon,
        alt: tech.name,
      })),
    []
  );

  const activeTech = TECH_STACK[selectedIndex] || TECH_STACK[0];

  const handlePrev = () => {
    setSelectedIndex(prev => (prev - 1 + TECH_STACK.length) % TECH_STACK.length);
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev + 1) % TECH_STACK.length);
  };

  return (
    <section
      id="skills"
      className="relative bg-secondary/30 dark:bg-gray-900/50 py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[420px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[140px]" />

      <div className="container-section px-4 sm:px-6 md:px-12 !py-0 relative z-10">
        {/* Section Title */}
        <h2 className="section-title mb-6">{t('skills.title')}</h2>

        {/* Subtitle with preserved PointerHighlight effect */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="max-w-2xl text-center text-xl font-semibold tracking-tight md:text-3xl text-foreground/90 dark:text-white flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>{t('technologiesIntro.part1')}</span>
            <PointerHighlight
              rectangleClassName="border-blue-500/60 dark:border-blue-400/60 bg-blue-500/5 rounded-md"
              pointerClassName="text-blue-500"
              containerClassName="inline-block px-1.5 py-0.5"
            >
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {t('technologiesIntro.highlight')}
              </span>
            </PointerHighlight>
            <span>{t('technologiesIntro.part2')}</span>
          </div>
        </div>

        {/* MacBook / macOS Window Frame */}
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-[26px] p-[1px] bg-gradient-to-b from-white/80 via-slate-300/60 to-slate-400/40 dark:from-white/25 dark:via-white/10 dark:to-white/5 shadow-[0_32px_90px_-20px_rgba(15,23,42,0.28)] dark:shadow-[0_36px_100px_-20px_rgba(0,0,0,0.85)]">
            <div className="relative rounded-[25px] overflow-hidden bg-slate-50/85 dark:bg-[#090d16]/90 backdrop-blur-2xl">
              {/* macOS Title Bar */}
              <div className="relative z-20 flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl">
                {/* Traffic Light Controls */}
                <div className="flex items-center gap-2 shrink-0 w-14" aria-hidden="true">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_0_0_0.5px_rgba(0,0,0,0.18)]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_0_0_0.5px_rgba(0,0,0,0.18)]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_0_0_0.5px_rgba(0,0,0,0.18)]" />
                </div>

                {/* Centered Safari-style Liquid Glass Address Pill */}
                <div className="flex-1 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] text-xs text-slate-600 dark:text-slate-300 font-mono truncate">
                    <Lock className="w-3 h-3 text-blue-500 shrink-0" />
                    <span className="truncate">gabriel.dev/stack-orbit</span>
                  </div>
                </div>

                {/* Right spacer to keep address bar centered */}
                <div className="w-14 shrink-0" aria-hidden="true" />
              </div>

              {/* macOS Window Viewport */}
              <div className="relative px-3 sm:px-8 md:px-12 pt-8 pb-6 sm:py-12 overflow-hidden">
                {/* Rich Aurora / Mesh Backdrop for Liquid Glass Refraction */}
                <div
                  className="pointer-events-none absolute -top-24 left-1/4 w-[420px] h-[320px] rounded-full bg-blue-500/20 dark:bg-blue-600/25 blur-[95px]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-24 right-1/4 w-[420px] h-[320px] rounded-full bg-cyan-400/20 dark:bg-indigo-500/25 blur-[95px]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[220px] rounded-full bg-sky-400/15 dark:bg-blue-500/15 blur-[80px]"
                  aria-hidden="true"
                />

                {/* Subtle Architectural Grid */}
                <div
                  className="pointer-events-none absolute inset-0 bg-g7-grid bg-g7-grid-fade opacity-15 dark:opacity-25"
                  aria-hidden="true"
                />

                {/* Orbit Stage */}
                <div className="relative z-10">
                  <OrbitImages
                    images={orbitImages}
                    shape="ellipse"
                    baseWidth={1400}
                    radiusX={590}
                    radiusY={165}
                    rotation={-7}
                    duration={38}
                    itemSize={94}
                    itemRadius={24}
                    depth={0.7}
                    shadow={0.4}
                    hoverScale={1.18}
                    hoverSpeed={0.18}
                    showPath
                    pathColor="rgba(59, 130, 246, 0.34)"
                    pathWidth={2}
                    pathDash={6}
                    draggable
                    clickToFront
                    activeIndex={selectedIndex}
                    onItemClick={index => setSelectedIndex(index)}
                    className="orbit-tech-theme max-w-5xl"
                    centerContent={
                      <div className="relative w-[170px] h-[170px] sm:w-[240px] sm:h-[240px] md:w-[270px] md:h-[270px] flex items-center justify-center">
                        {/* Crisp vector/high-res logo core */}
                        <img
                          src={activeTech.icon}
                          alt={activeTech.name}
                          className="relative z-0 w-[56%] h-[56%] object-contain opacity-90 drop-shadow-[0_0_16px_rgba(59,130,246,0.35)] pointer-events-none select-none transition-all duration-300"
                        />
                        {/* Tuned ElectricLogo overlay */}
                        <div className="absolute inset-0 z-10">
                          <ElectricLogo
                            src={activeTech.icon}
                            color={activeTech.color}
                            glowColor={activeTech.glowColor}
                            theme={theme === 'dark' ? 'dark' : 'light'}
                            scale={0.66}
                            intensity={0.72}
                            glow={0.42}
                            thickness={0.75}
                            strands={3}
                            bend={0.25}
                            crackle={0.55}
                            arcs={0.6}
                            flicker={0.4}
                            fill={0}
                            speed={2.2}
                            interactive
                            cursorIntensity={0.65}
                            cursorRadius={85}
                          />
                        </div>
                      </div>
                    }
                  />

                  {/* Clean centered stack name display */}
                  <div className="mt-4 flex items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label={isPt ? 'Tecnologia anterior' : 'Previous technology'}
                      className="p-1.5 rounded-full bg-white/70 dark:bg-white/[0.06] hover:bg-blue-500/15 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/75 dark:bg-white/[0.06] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm">
                      <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                        {activeTech.name}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                        {isPt ? activeTech.tagPt : activeTech.tagEn}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label={isPt ? 'Próxima tecnologia' : 'Next technology'}
                      className="p-1.5 rounded-full bg-white/70 dark:bg-white/[0.06] hover:bg-blue-500/15 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
