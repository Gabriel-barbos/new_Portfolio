import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Terminal,
  ArrowUpRight,
  Code,
  Shield,
  Cpu,
  Cloud,
  Workflow
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import G7BentoGrid from './G7BentoGrid';
import { PulsatingButton } from "@/components/ui/pulsating-button"


// G7 Exact Brand Logo Mark from G7-Site
function G7LogoMark() {
  return (
    <div className="flex flex-col items-center select-none" aria-label="G7 Software House">
      <div className="relative flex items-end justify-center leading-none">
        <span className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-[-0.07em] text-white">
          G
        </span>
        <span className="relative ml-[-0.04em] text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-[-0.05em] text-white">
          7
          <span
            className="absolute bottom-[0.14em] right-[-0.06em] w-[0.13em] h-[0.5em] rounded-[1px] bg-blue-600 skew-x-[-12deg] shadow-[0_0_12px_rgba(37,99,235,0.8)]"
            aria-hidden="true"
          />
        </span>
      </div>

      <div className="mt-4 sm:mt-5 flex items-center gap-3">
        <span className="h-px w-6 sm:w-10 bg-white/20" />
        <span className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          Software House
        </span>
        <span className="h-px w-6 sm:w-10 bg-white/20" />
      </div>
    </div>
  );
}

function G7VisitButton() {
  const { t } = useLanguage();

  return (
    <a
      href="https://g7-delta.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 
        bg-slate-900 text-white dark:bg-white dark:text-slate-950 
        hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(37,99,235,0.25)] 
        active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* Hover brand gradient background */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {t('g7Section.cta')}
      </span>
      
      <ArrowUpRight className="relative z-10 w-4 h-4 text-blue-400 dark:text-blue-600 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}


export function G7Section() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'metrics' | 'terminal'>('metrics');

  return (
    <section id="g7-software" className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#050508] text-slate-900 dark:text-white overflow-hidden scroll-mt-16 transition-colors duration-500">
      {/* High-tech Background effects */}
      <div className="absolute inset-0 bg-g7-grid bg-g7-grid-fade opacity-15 dark:opacity-30 pointer-events-none" />
      
      {/* Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/5 dark:bg-blue-900/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-g7-panel text-xs font-mono font-medium text-blue-600 dark:text-blue-400 mb-4 border border-blue-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(37,99,235,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <Code className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest text-[11px]">Software House</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Conheça minha <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">Software House</span>
          </motion.h2>

          
        </div>

        {/* Hero split: 3D Logo Card + Brand Presentation & Elegant Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left: 3D Brand Logo Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-md">
              {/* Outer glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-70 transition duration-500" />
              
              <div className="relative w-full rounded-3xl p-8 sm:p-12 border border-slate-800/80 dark:border-white/10 bg-slate-950 dark:bg-neutral-900/80 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                {/* Diagonal highlight overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* 3D G7 Logo */}
                <G7LogoMark />

               
              </div>
            </div>
          </motion.div>

          {/* Right: Company Mission &  Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-slate-800 dark:text-neutral-200 leading-relaxed font-medium">
                {t('g7Section.description1')}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed">
                {t('g7Section.description2')}
              </p>
            </div>

            {/* Elegant Premium Site Button */}
          <div className="pt-2">
  <G7VisitButton />
</div>
          </motion.div>
        </div>

        {/* Full-width Terminal Mockup Container (Always Dark High-Tech Terminal) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="rounded-2xl border border-white/10 bg-neutral-950/90 backdrop-blur-md overflow-hidden shadow-2xl w-full text-white">
            {/* Window Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/90 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <span className="ml-3 font-mono text-neutral-300 font-semibold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  {t('g7Section.mockup.title')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveTab('metrics')}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition ${activeTab === 'metrics' ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 font-semibold' : 'text-neutral-400 hover:text-white'}`}
                >
                  Destaques
                </button>
                <button 
                  onClick={() => setActiveTab('terminal')}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition ${activeTab === 'terminal' ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 font-semibold' : 'text-neutral-400 hover:text-white'}`}
                >
                  Logs
                </button>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t('g7Section.mockup.status')}
                </span>
              </div>
            </div>

            {/* Window Content - Distributed Cards */}
            <div className="p-6 font-mono text-xs">
              {activeTab === 'metrics' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-blue-500/20 flex flex-col items-center justify-center text-center group hover:border-blue-500/40 transition hover:-translate-y-0.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono tracking-tight">+25</span>
                    <span className="text-[11px] sm:text-xs font-medium text-neutral-300 mt-1.5 leading-tight">Sistemas Entregues</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-emerald-500/20 flex flex-col items-center justify-center text-center group hover:border-emerald-500/40 transition hover:-translate-y-0.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">100%</span>
                    <span className="text-[11px] sm:text-xs font-medium text-neutral-300 mt-1.5 leading-tight">Personalizado</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-purple-500/20 flex flex-col items-center justify-center text-center group hover:border-purple-500/40 transition hover:-translate-y-0.5">
                    <Shield className="w-6 h-6 text-purple-400 mb-1.5" />
                    <span className="text-[11px] sm:text-xs font-medium text-neutral-300 leading-tight">Arquitetura Robusta</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-cyan-500/20 flex flex-col items-center justify-center text-center group hover:border-cyan-500/40 transition hover:-translate-y-0.5">
                    <Cpu className="w-6 h-6 text-cyan-400 mb-1.5" />
                    <span className="text-[11px] sm:text-xs font-medium text-neutral-300 leading-tight">Tecnologias Modernas</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-sky-500/20 flex flex-col items-center justify-center text-center group hover:border-sky-500/40 transition hover:-translate-y-0.5">
                    <Cloud className="w-6 h-6 text-sky-400 mb-1.5" />
                    <span className="text-[11px] sm:text-xs font-medium text-neutral-300 leading-tight">Infraestrutura Cloud</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-indigo-500/20 flex flex-col items-center justify-center text-center group hover:border-indigo-500/40 transition hover:-translate-y-0.5">
                    <Workflow className="w-6 h-6 text-indigo-400 mb-1.5" />
                    <span className="text-[11px] sm:text-xs font-medium text-neutral-300 leading-tight">Integrações & APIs</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-neutral-300 py-2 sm:px-2">
                  <p className="text-blue-400">[PROD] +25 sistemas corporativos e aplicações SaaS em produção</p>
                  <p className="text-emerald-400">[DESIGN] Soluções digitais 100% personalizadas sob medida para o seu negócio</p>
                  <p className="text-purple-400">[ENGINE] Arquitetura robusta, resiliente e segura com criptografia end-to-end</p>
                  <p className="text-cyan-400">[STACK] Tecnologias modernas de ponta (React, Node, Cloud, AI Workflows)</p>
                  <p className="text-sky-400">[CLOUD] Infraestrutura em nuvem escalável com alta disponibilidade</p>
                  <p className="text-indigo-400">[API] Integrações de sistemas, gateways e barramento de dados em tempo real</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Features */}
        <div className="mb-5">
          <G7BentoGrid />
        </div>

      </div>
    </section>
  );
}

export default G7Section;

