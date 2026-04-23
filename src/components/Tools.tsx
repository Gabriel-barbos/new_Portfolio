"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from './ui/badge';
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";

// icons
import git from '../assets/icons-globe/git.png';
import github from '../assets/icons/github2.webp';
import fastapi from '../assets/icons-globe/fastapi.png';
import aceternity from "../assets/icons/aceternity.png";
import antdesign from "../assets/icons/antdesign.svg";
import autocad from "../assets/icons/autocad.png";
import bootstrap from "../assets/icons/bootstrap.png";
import canva from "../assets/icons/canva.png";
import excel from "../assets/icons/excel.png";
import figma from "../assets/icons/figma.png";
import magicUI from "../assets/icons/magicUI.png";
import notion from "../assets/icons/notion.png";
import powerpoint from "../assets/icons/powerpoint.png";
import sketchup from "../assets/icons/sketchup.png";
import teams from "../assets/icons/teams.png";
import video from "../assets/icons/video2.png";
import windows from "../assets/icons/windows.png";
import word from "../assets/icons/word.png";
import vscode from "../assets/icons/vscode.png";
import sheets from "../assets/icons/sheets.png";
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
    { name: 'AutoCad', icon: autocad, level: 'Intermediário' },
    { name: 'Git', icon: git, level: 'Avançado' },
    { name: 'Github', icon: github, level: 'Intermediário' },
    { name: 'FastAPI', icon: fastapi, level: 'Intermediário' },
    { name: 'Visual Studio Code', icon: vscode, level: 'Avançado' },
    { name: 'Aceternity UI', icon: aceternity, level: 'Intermediário' },
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
    <section id="tools" className="bg-secondary/30 dark:bg-gray-900/50 ">
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

      <div className="w-full max-w-[1000px] mx-auto px-4 -mt-12">
        <div className="border border-border/50 rounded-xl p-4 bg-card/60 dark:bg-card/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {tools.map((skill, index) => (
              <div
                key={index}
                className="group relative rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="relative p-4 transition-all duration-500 ease-out hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 dark:hover:from-primary/10 dark:hover:to-primary/5 group-hover:scale-105">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg blur-sm animate-pulse"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 rounded-full border border-border/30 dark:border-gray-600/30 bg-background/80 dark:bg-gray-900/80 flex items-center justify-center p-3 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500 backdrop-blur-sm">
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-2">
                      <h3 className="font-medium text-sm text-foreground/90 dark:text-gray-200 group-hover:text-foreground transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <Badge className="border-transparent bg-sky-200 text-sky-900 hover:bg-sky-300 transition-colors dark:bg-sky-800 dark:text-sky-100 dark:hover:bg-sky-700">
                        {skillLevelMap[skill.level]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
