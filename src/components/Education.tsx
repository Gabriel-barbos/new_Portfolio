import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Calendar,
  GraduationCap,
  Globe,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
} from 'lucide-react';

import fatec from '../assets/fatec.png';
import etec from '../assets/etec.jpg';
import wizard from '../assets/wizard.jpg';
import fiap from '../assets/icons/fiap.png';

type InstitutionKey = 'fiap' | 'fatec' | 'etec' | 'wizard';

interface InstitutionTheme {
  key: InstitutionKey;
  code: string;
  badgePt: string;
  badgeEn: string;
  statusPt: string;
  statusEn: string;
  period: string;
  hexPrimary: string;
  hexSecondary: string;
  spotlightRgba: string;
  borderHover: string;
  badgeBg: string;
  badgeText: string;
  nodeBg: string;
  nodeRing: string;
  chipHover: string;
  accentGradient: string;
  tagsPt: string[];
  tagsEn: string[];
}

const INSTITUTION_THEMES: InstitutionTheme[] = [
  {
    key: 'fiap',
    code: '01',
    badgePt: 'Bacharelado · Superior',
    badgeEn: 'Bachelor’s Degree',
    statusPt: '2023 — 2025',
    statusEn: '2023 — 2025',
    period: '2023-02-01 — 2025-12-01',
    hexPrimary: '#ed145b',
    hexSecondary: '#fb7185',
    spotlightRgba: 'rgba(237, 20, 91, 0.16)',
    borderHover: 'hover:border-[#ed145b]/60 dark:hover:border-[#ed145b]/60',
    badgeBg: 'bg-[#ed145b]/10 dark:bg-[#ed145b]/15 border-[#ed145b]/30',
    badgeText: 'text-[#d91152] dark:text-[#ff4d88]',
    nodeBg: 'bg-gradient-to-br from-[#ed145b] to-[#e11d48]',
    nodeRing: 'ring-[#ed145b]/25 shadow-[0_0_24px_rgba(237,20,91,0.45)]',
    chipHover:
      'hover:border-[#ed145b]/50 hover:bg-[#ed145b]/10 hover:text-[#d91152] dark:hover:text-[#ff6b9d]',
    accentGradient: 'from-[#ed145b] via-[#f43f5e] to-[#fb7185]',
    tagsPt: [
      'Engenharia de Software',
      'Arquitetura & Cloud',
      'Inteligência Artificial',
      'Cybersecurity',
      'Web & Mobile',
      'IoT & DevOps',
      'UX & Agile',
    ],
    tagsEn: [
      'Software Engineering',
      'Cloud Architecture',
      'Artificial Intelligence',
      'Cybersecurity',
      'Web & Mobile',
      'IoT & DevOps',
      'UX & Agile',
    ],
  },
  {
    key: 'fatec',
    code: '02',
    badgePt: 'Tecnólogo · Superior',
    badgeEn: 'Technologist Degree',
    statusPt: '2020 — 2022',
    statusEn: '2020 — 2022',
    period: '2020-02-01 — 2022-12-01',
    hexPrimary: '#2563eb',
    hexSecondary: '#38bdf8',
    spotlightRgba: 'rgba(37, 99, 235, 0.16)',
    borderHover: 'hover:border-blue-500/60 dark:hover:border-sky-400/60',
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/30',
    badgeText: 'text-blue-700 dark:text-sky-300',
    nodeBg: 'bg-gradient-to-br from-blue-600 to-sky-500',
    nodeRing: 'ring-blue-500/25 shadow-[0_0_24px_rgba(37,99,235,0.45)]',
    chipHover:
      'hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-sky-300',
    accentGradient: 'from-blue-600 via-blue-500 to-sky-400',
    tagsPt: [
      'Software Multiplataforma',
      'Estruturas de Dados',
      'Bancos de Dados',
      'Computação em Nuvem',
      'Engenharia de Requisitos',
      'Metodologias Ágeis',
    ],
    tagsEn: [
      'Multiplatform Dev',
      'Data Structures',
      'Databases',
      'Cloud Computing',
      'Requirements Engineering',
      'Agile Methodologies',
    ],
  },
  {
    key: 'etec',
    code: '03',
    badgePt: 'Técnico Integrado',
    badgeEn: 'Technical Diploma',
    statusPt: 'Concluído',
    statusEn: 'Completed',
    period: '2017-02-01 — 2019-12-01',
    hexPrimary: '#f97316',
    hexSecondary: '#fbbf24',
    spotlightRgba: 'rgba(249, 115, 22, 0.16)',
    borderHover: 'hover:border-orange-500/60 dark:hover:border-orange-400/60',
    badgeBg: 'bg-orange-500/10 dark:bg-orange-500/15 border-orange-500/30',
    badgeText: 'text-orange-700 dark:text-orange-300',
    nodeBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    nodeRing: 'ring-orange-500/25 shadow-[0_0_24px_rgba(249,115,22,0.45)]',
    chipHover:
      'hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-orange-300',
    accentGradient: 'from-orange-500 via-amber-500 to-yellow-500',
    tagsPt: [
      'Automação Industrial',
      'Programação de CLPs',
      'Sensores & Atuadores',
      'Eletrônica & Elétrica',
      'Instrumentação',
      'Segurança Industrial',
    ],
    tagsEn: [
      'Industrial Automation',
      'PLC Programming',
      'Sensors & Actuators',
      'Electronics & Electrical',
      'Instrumentation',
      'Industrial Safety',
    ],
  },
  {
    key: 'wizard',
    code: '04',
    badgePt: 'Formação em Idiomas',
    badgeEn: 'Language Academy',
    statusPt: 'Concluído',
    statusEn: 'Completed',
    period: '2013-02-01 — 2021-12-01',
    hexPrimary: '#10b981',
    hexSecondary: '#34d399',
    spotlightRgba: 'rgba(16, 185, 129, 0.16)',
    borderHover: 'hover:border-emerald-500/60 dark:hover:border-emerald-400/60',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    nodeBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    nodeRing: 'ring-emerald-500/25 shadow-[0_0_24px_rgba(16,185,129,0.45)]',
    chipHover:
      'hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300',
    accentGradient: 'from-emerald-500 via-teal-500 to-green-400',
    tagsPt: [
      'Conversação Fluente',
      'Listening & Pronúncia',
      'Escrita Técnica',
      'Leitura Avançada',
      'Imersão Cultural',
    ],
    tagsEn: [
      'Fluent Conversation',
      'Listening & Phonetics',
      'Technical Writing',
      'Advanced Reading',
      'Cultural Immersion',
    ],
  },
];

// ─── Interactive Mouse-Spotlight Card for the Trail ───────────────────────────
interface TrailCardProps {
  degree: string;
  institution: string;
  description: string;
  dateRange: string;
  logo: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  theme: InstitutionTheme;
  isSelected: boolean;
  onSelect: () => void;
  locale: string;
}

const TrailCard: React.FC<TrailCardProps> = ({
  degree,
  institution,
  description,
  dateRange,
  logo,
  Icon,
  theme,
  isSelected,
  onSelect,
  locale,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const tags = locale === 'pt' ? theme.tagsPt : theme.tagsEn;
  const badgeLabel = locale === 'pt' ? theme.badgePt : theme.badgeEn;

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden
        bg-white/85 dark:bg-[#0b101e]/90 backdrop-blur-xl
        border ${
          isSelected
            ? 'border-slate-300 dark:border-white/25 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]'
            : 'border-slate-200/80 dark:border-white/10 shadow-sm'
        } ${theme.borderHover} hover:-translate-y-1`}
      style={{
        boxShadow:
          isHovered || isSelected
            ? `0 20px 45px -20px ${theme.spotlightRgba}, 0 0 0 1px ${theme.hexPrimary}33`
            : undefined,
      }}
    >
      {/* Top Institution Brand Accent Bar */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${theme.accentGradient} transition-opacity duration-300 ${
          isHovered || isSelected ? 'opacity-100' : 'opacity-75'
        }`}
      />

      {/* Dynamic Mouse-Tracking Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(520px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.spotlightRgba}, transparent 45%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Corner Glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          background: theme.hexPrimary,
          opacity: isHovered || isSelected ? 0.14 : 0.05,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-6 sm:p-7">
        {/* Top Row: Logo + Institution Meta + Themed Badge */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            {/* Institution Logo Container */}
            <div
              className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white dark:bg-slate-900 p-1.5 flex items-center justify-center overflow-hidden shadow-md border transition-transform duration-300 group-hover:scale-105"
              style={{ borderColor: `${theme.hexPrimary}45` }}
            >
              <img
                src={logo}
                alt={institution}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded-md border"
                  style={{
                    color: theme.hexPrimary,
                    borderColor: `${theme.hexPrimary}40`,
                    backgroundColor: `${theme.hexPrimary}12`,
                  }}
                >
                  #{theme.code}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${theme.badgeBg} ${theme.badgeText}`}
                >
                  {badgeLabel}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {institution}
              </h3>

              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                <Calendar
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: theme.hexPrimary }}
                />
                <span>{dateRange}</span>
              </div>
            </div>
          </div>

          {/* Institution Themed Icon Orb */}
          <div
            className={`h-11 w-11 rounded-xl ${theme.nodeBg} text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shrink-0`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Course / Degree Title */}
        <div className="mb-3">
          <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight">
            {degree}
          </h4>
          <div
            className={`h-0.5 rounded-full bg-gradient-to-r ${theme.accentGradient} mt-2.5 transition-all duration-500 ${
              isHovered || isSelected ? 'w-24 opacity-100' : 'w-12 opacity-60'
            }`}
          />
        </div>

        {/* Course Description */}
        <p className="text-slate-600 dark:text-slate-300/90 text-sm sm:text-base leading-relaxed mb-5">
          {description}
        </p>

        {/* Competency / Subject Pills */}
        <div className="pt-4 border-t border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2.5">
            <Layers className="h-3.5 w-3.5" style={{ color: theme.hexPrimary }} />
            <span>
              {locale === 'pt' ? 'Competências & Grade' : 'Core Competencies'}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors duration-200
                  bg-slate-100/80 dark:bg-slate-800/70 border-slate-200/90 dark:border-white/10
                  text-slate-700 dark:text-slate-300 ${theme.chipHover}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Education & Languages Component ──────────────────────────────────────
const Education: React.FC = () => {
  const { t, locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [selectedTrailIndex, setSelectedTrailIndex] = useState<number>(0);
  const [viewFilter, setViewFilter] = useState<'all' | 'academic' | 'languages'>('all');

  const translatedEducation = t('education.cards') as unknown as Array<{
    degree: string;
    institution: string;
    description: string;
  }>;

  const logos = [fiap, fatec, etec, wizard];
  const icons = [GraduationCap, Cpu, Terminal, Globe];
  const startDates = ['2023-02-01', '2020-02-01', '2017-02-01', '2013-02-01'];
  const endDates = ['2025-12-01', '2022-12-01', '2019-12-01', '2021-12-01'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const educationItems = translatedEducation.map((item, index) => ({
    ...item,
    logo: logos[index],
    Icon: icons[index],
    theme: INSTITUTION_THEMES[index],
    dateRange: `${formatDate(startDates[index])} — ${formatDate(endDates[index])}`,
  }));

  const languageLevels = t('education.languageLevels') as unknown as {
    english: string;
    portuguese: string;
    spanish: string;
  };

  // ─── Simplified & High-Impact Languages Data ─────────────────────────────────
  const languages = [
    {
      id: 'en',
      name: locale === 'pt' ? 'Inglês' : 'English',
      flag: '🇺🇸',
      level: languageLevels.english,
      cefr: 'C1 · Avançado',
      percent: 85,
      accentHex: '#10b981',
      accentClass: 'from-emerald-500 to-teal-400',
      badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
      badgeHighlight: locale === 'pt' ? 'Fluência Profissional' : 'Professional Fluency',
      description:
        locale === 'pt'
          ? 'Fluência profissional diária: Consultor de suporte internacional (LDC), ex-Professor de Inglês e especialista em avaliação de código e IA.'
          : 'Daily professional fluency: international support consultant (LDC), former English teacher, and AI/code evaluation specialist.',
      chips:
        locale === 'pt'
          ? ['Fluência Profissional', 'Ex-Professor', 'Suporte Global LDC', 'IA em Inglês']
          : ['Professional Fluency', 'Former Teacher', 'Global Support LDC', 'English AI'],
    },
    {
      id: 'pt',
      name: locale === 'pt' ? 'Português' : 'Portuguese',
      flag: '🇧🇷',
      level: languageLevels.portuguese,
      cefr: 'C2 · Nativo',
      percent: 100,
      accentHex: '#3b82f6',
      accentClass: 'from-blue-600 to-sky-400',
      badgeClass: 'bg-blue-500/10 text-blue-700 dark:text-sky-300 border-blue-500/25',
      badgeHighlight: locale === 'pt' ? 'Língua Materna' : 'Native Language',
      description:
        locale === 'pt'
          ? 'Domínio pleno para documentação técnica de arquitetura, alinhamento executivo com stakeholders na G7 Software House e liderança.'
          : 'Full mastery for technical architecture documentation, executive client relations at G7 Software House, and technical leadership.',
      chips:
        locale === 'pt'
          ? ['Língua Materna', 'Documentação & RFCs', 'G7 Software House']
          : ['Mother Tongue', 'Docs & RFCs', 'G7 Software House'],
    },
    {
      id: 'es',
      name: locale === 'pt' ? 'Espanhol' : 'Spanish',
      flag: '🇪🇸',
      level: languageLevels.spanish,
      cefr: 'A2 · Básico',
      percent: 40,
      accentHex: '#f97316',
      accentClass: 'from-orange-500 to-amber-400',
      badgeClass: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/25',
      badgeHighlight: locale === 'pt' ? 'Leitura Técnica' : 'Technical Reading',
      description:
        locale === 'pt'
          ? 'Leitura de documentação técnica, compreensão de chamados e colaboração com equipes em contextos multinacionais na América Latina.'
          : 'Technical documentation comprehension, ticket reading, and collaboration with LATAM multicultural teams.',
      chips:
        locale === 'pt'
          ? ['Leitura Técnica', 'Tickets & Docs', 'Colaboração LATAM']
          : ['Technical Reading', 'Tickets & Docs', 'LATAM Teams'],
    },
  ];

  return (
    <section
      id="education"
      className="py-24 sm:py-28 bg-slate-50/80 dark:bg-[#060913] relative overflow-hidden transition-colors duration-500"
    >
      {/* Subtle Architectural Grid & Ambient Accents */}
      <div className="pointer-events-none absolute inset-0 bg-g7-grid bg-g7-grid-fade opacity-20 dark:opacity-25" />
      <div
        className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[150px] opacity-20 dark:opacity-25"
        style={{ background: INSTITUTION_THEMES[selectedTrailIndex].hexPrimary }}
      />
      <div className="pointer-events-none absolute bottom-16 -right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Section Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-widest mb-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-blue-600 dark:text-sky-400 shadow-sm">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>
              {locale === 'pt' ? 'Trajetória & Fluência' : 'Academic Trail & Fluency'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            {t('education.title')}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl">
            {locale === 'pt'
              ? 'Da base técnica em automação industrial à engenharia de software moderna e comunicação global.'
              : 'From technical roots in industrial automation to modern software engineering and global communication.'}
          </p>

          {/* Interactive View Filter Pills */}
          <div className="mt-7 inline-flex items-center p-1 rounded-full bg-slate-200/70 dark:bg-slate-900/90 border border-slate-300/60 dark:border-white/10 backdrop-blur-md">
            {[
              {
                id: 'all' as const,
                label: locale === 'pt' ? 'Jornada Completa' : 'Full Journey',
              },
              {
                id: 'academic' as const,
                label: locale === 'pt' ? 'Trilha Acadêmica' : 'Academic Trail',
              },
              {
                id: 'languages' as const,
                label: locale === 'pt' ? 'Idiomas & TOEIC' : 'Languages & TOEIC',
              },
            ].map((tab) => {
              const active = viewFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setViewFilter(tab.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    active
                      ? 'text-slate-950 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="education-filter-pill"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 30 }
                      }
                      className="absolute inset-0 -z-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200/80 dark:border-white/15"
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── PART 1: Interactive Academic Trail (FIAP, FATEC, ETEC, WIZARD) ─ */}
        {(viewFilter === 'all' || viewFilter === 'academic') && (
          <div className="mb-20">
            {/* Quick Interactive Institution Stepper Bar */}
            <div className="max-w-4xl mx-auto mb-10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {educationItems.map((item, idx) => {
                  const active = selectedTrailIndex === idx;
                  return (
                    <button
                      key={item.theme.key}
                      type="button"
                      onClick={() => {
                        setSelectedTrailIndex(idx);
                        const el = document.getElementById(`trail-node-${item.theme.key}`);
                        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }}
                      className={`group relative flex items-center gap-3 p-3 rounded-2xl border text-left transition-all duration-300 ${
                        active
                          ? 'bg-white dark:bg-slate-900 shadow-md scale-[1.02]'
                          : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/70 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900/70'
                      }`}
                      style={{
                        borderColor: active ? item.theme.hexPrimary : undefined,
                        boxShadow: active
                          ? `0 8px 25px -8px ${item.theme.spotlightRgba}`
                          : undefined,
                      }}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-125"
                        style={{
                          backgroundColor: item.theme.hexPrimary,
                          boxShadow: active ? `0 0 10px ${item.theme.hexPrimary}` : 'none',
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400">
                          {item.theme.statusPt}
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {item.institution}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connected Vertical / Alternating Trail */}
            <div className="relative max-w-5xl mx-auto">
              {/* Multi-Color Gradient Trail Spine */}
              <div
                className="pointer-events-none absolute left-5 md:left-1/2 top-4 bottom-4 w-0.5 md:-translate-x-1/2 rounded-full opacity-45 dark:opacity-60"
                style={{
                  background:
                    'linear-gradient(180deg, #ed145b 0%, #2563eb 36%, #f97316 70%, #10b981 100%)',
                }}
                aria-hidden="true"
              />

              <div className="space-y-10 md:space-y-12">
                {educationItems.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const isSelected = selectedTrailIndex === idx;

                  return (
                    <motion.div
                      id={`trail-node-${item.theme.key}`}
                      key={item.theme.key}
                      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: 0.55,
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative flex flex-col md:flex-row items-start"
                    >
                      {/* Timeline Node Marker on the Spine */}
                      <button
                        type="button"
                        aria-label={`Focar em ${item.institution}`}
                        onClick={() => setSelectedTrailIndex(idx)}
                        className={`absolute left-5 md:left-1/2 -translate-x-1/2 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-50 dark:border-[#060913] transition-all duration-300 ${
                          item.theme.nodeBg
                        } ${isSelected ? `scale-115 ring-4 ${item.theme.nodeRing}` : 'opacity-90 hover:scale-110'}`}
                      >
                        <span className="font-mono text-xs font-bold text-white">
                          {item.theme.code}
                        </span>
                      </button>

                      {/* Card Column (Alternating Left/Right on Desktop) */}
                      <div
                        className={`w-full pl-14 md:pl-0 md:w-1/2 ${
                          isEven ? 'md:pr-10 lg:pr-12' : 'md:ml-auto md:pl-10 lg:pl-12'
                        }`}
                      >
                        <TrailCard
                          degree={item.degree}
                          institution={item.institution}
                          description={item.description}
                          dateRange={item.dateRange}
                          logo={item.logo}
                          Icon={item.Icon}
                          theme={item.theme}
                          isSelected={isSelected}
                          onSelect={() => setSelectedTrailIndex(idx)}
                          locale={locale}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── PART 2: Compact & Clean Languages Grid ────────────────────── */}
        {(viewFilter === 'all' || viewFilter === 'languages') && (
          <div className="max-w-5xl mx-auto">
            {/* Subheader for Languages */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 pb-4 border-b border-slate-200/80 dark:border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
                  <Globe className="h-3.5 w-3.5" />
                  <span>
                    {locale === 'pt' ? 'Comunicação Global' : 'Global Communication'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {t('education.languages')}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>TOEIC® Certified (780/1000)</span>
              </div>
            </div>

            {/* 3-Card Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {languages.map((lang, idx) => (
                <motion.div
                  key={lang.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="group relative rounded-2xl p-6 bg-white/85 dark:bg-[#0b101e]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top accent line */}
                  <span
                    className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${lang.accentClass}`}
                  />

                  <div>
                    {/* Header: Flag, Name & Level */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl select-none leading-none">
                          {lang.flag}
                        </span>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                            {lang.name}
                          </h4>
                          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                            {lang.cefr}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${lang.badgeClass}`}
                      >
                        {lang.level}
                      </span>
                    </div>

                    {/* Highlight Badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 mb-3.5">
                      <CheckCircle2
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: lang.accentHex }}
                      />
                      <span>{lang.badgeHighlight}</span>
                    </div>

                    {/* Concise Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {lang.description}
                    </p>
                  </div>

                  <div>
                    {/* Mini Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="text-slate-500 dark:text-slate-400">
                          {locale === 'pt' ? 'Proficiência' : 'Proficiency'}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {lang.percent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${lang.accentClass}`}
                        />
                      </div>
                    </div>

                    {/* Compact Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/70 dark:border-white/10">
                      {lang.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
