"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from './ui/badge';
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";

// Icons
import git from '../assets/icons-globe/git.png';
import github from '../assets/icons/github2.webp';
import fastapi from '../assets/icons-globe/fastapi.png';
import servicenow from '../assets/icons/servicenow.svg';
import sap from '../assets/icons/SAP-Logo.png';
import azure from '../assets/icons/azure.png';
import canva from "../assets/icons/canva.png";
import excel from "../assets/icons/excel.png";
import figma from "../assets/icons/figma.png";
import notion from "../assets/icons/notion.png";
import powerpoint from "../assets/icons/powerpoint.png";
import sketchup from "../assets/icons/sketchup.png";
import teams from "../assets/icons/teams.png";
import video from "../assets/icons/video2.png";
import windows from "../assets/icons/windows.png";
import word from "../assets/icons/word.png";
import claude from "../assets/icons/claude.webp";
import antigravity from "../assets/icons/antigravity.jpg";
import expo from "../assets/icons/expo.png";
import codex from "../assets/icons/codex.png";

type SkillLevel = 'Básico' | 'Intermediário' | 'Avançado';

interface Tool {
  name: string;
  icon: string;
  level: SkillLevel;
}

const Tools = () => {
  const { t } = useLanguage();

  const tools: Tool[] = [
    { name: 'Figma', icon: figma, level: 'Avançado' },
    { name: 'SketchUp', icon: sketchup, level: 'Avançado' },
    { name: 'Claude Code', icon: claude, level: 'Avançado' },
    { name: 'Antigravity', icon: antigravity, level: 'Avançado' },
    { name: 'Expo', icon: expo, level: 'Avançado' },
    { name: 'ServiceNow', icon: servicenow, level: 'Avançado' },
    { name: 'Git', icon: git, level: 'Avançado' },
    { name: 'GitHub', icon: github, level: 'Intermediário' },
    { name: 'FastAPI', icon: fastapi, level: 'Intermediário' },
    { name: 'SAP', icon: sap, level: 'Intermediário' },
    { name: 'Azure', icon: azure, level: 'Intermediário' },
    { name: 'Notion', icon: notion, level: 'Avançado' },
    { name: 'Canva', icon: canva, level: 'Avançado' },
    { name: 'Codex', icon: codex, level: 'Avançado' },
    { name: 'Edição de Vídeo', icon: video, level: 'Avançado' },
    { name: 'Windows', icon: windows, level: 'Avançado' },
    { name: 'Word', icon: word, level: 'Avançado' },
    { name: 'Excel', icon: excel, level: 'Intermediário' },
    { name: 'PowerPoint', icon: powerpoint, level: 'Intermediário' },
    { name: 'Teams', icon: teams, level: 'Avançado' },
  ];

  const skillLevelMap = {
    Básico: t('tools.skillLevels.basic'),
    Intermediário: t('tools.skillLevels.intermediate'),
    Avançado: t('tools.skillLevels.advanced'),
  };

  return (
    <section id="tools" className="bg-secondary/30 dark:bg-gray-900/50 pb-20">
      <div className="bg-secondary/30 dark:bg-gray-900/50">
        <LampContainer className="!bg-transparent">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="py-4 text-center text-4xl font-medium tracking-tight text-foreground md:text-6xl"
          >
            {t('tools.title')}
          </motion.h1>
        </LampContainer>
      </div>

      <div className="w-full max-w-[1020px] mx-auto px-4 -mt-12 sm:-mt-16 relative z-10">
        {/* Single unified grid container matching original structure */}
        <div className="border border-border/50 dark:border-white/10 rounded-2xl p-4 sm:p-6 bg-card/60 dark:bg-card/40 backdrop-blur-md shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {tools.map((skill, index) => {
              const isAdvanced = skill.level === 'Avançado';

              return (
                <div
                  key={index}
                  className="group relative rounded-xl p-3.5 sm:p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:bg-primary/[0.06] dark:hover:bg-white/[0.04] hover:scale-105"
                >
                  {/* Subtle hover glow backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 w-full flex flex-col items-center">
                    {/* Standardized Icon Container: fixes background mismatch across all logos */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border border-border/40 dark:border-white/10 bg-slate-100/80 dark:bg-slate-900/80 flex items-center justify-center p-2.5 mb-3 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 backdrop-blur-sm overflow-hidden">
                      <img
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        className="w-10 h-10 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Tool Name */}
                    <h3 className="font-medium text-xs sm:text-sm text-foreground/90 dark:text-gray-200 group-hover:text-primary transition-colors duration-200 mb-2 truncate max-w-full">
                      {skill.name}
                    </h3>

                    {/* Skill Level Badge in cohesive Blue Tones */}
                    <Badge
                      className={`border transition-colors text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        isAdvanced
                          ? 'bg-blue-600/15 text-blue-700 dark:text-sky-300 border-blue-500/30 hover:bg-blue-600/25'
                          : 'bg-sky-500/10 text-sky-800 dark:text-sky-200 border-sky-400/25 hover:bg-sky-500/20'
                      }`}
                    >
                      <span
                        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                          isAdvanced
                            ? 'bg-blue-600 dark:bg-sky-400'
                            : 'bg-sky-400 dark:bg-sky-500'
                        }`}
                      />
                      {skillLevelMap[skill.level]}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
