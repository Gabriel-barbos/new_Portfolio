"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Moon, Sun, Globe, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import logo from "../assets/logoG.png";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const navItems = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.g7"), href: "#g7-software" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  // Handle scroll state & active section tracking
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "g7-software", "contact"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const triggerPoint = window.innerHeight * 0.38;
      let current = "#home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            current = `#${id}`;
          }
        }
      }
      setActiveHref(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMenuOpen]);

  const highlightedHref = hoveredHref ?? activeHref;

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <motion.div
        initial={reduceMotion ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "max-w-4xl" : "max-w-6xl"
        }`}
      >
        {/* ─── Main Liquid Glass Capsule (Desktop & Mobile Top Bar) ───────── */}
        <LiquidGlass
          radius={999}
          bevelDepth={18}
          scale={44}
          aberration={5}
          frost={isScrolled ? 2.4 : 1.0}
          tint={isDark ? (isScrolled ? 0.1 : 0.06) : isScrolled ? 0.52 : 0.34}
          contentClassName={`relative z-10 flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "px-4 sm:px-6 py-2.5"
              : "px-4 sm:px-7 py-3 sm:py-3.5"
          }`}
          className={`w-full transition-shadow duration-500 ${
            isDark
              ? "bg-slate-950/30 border border-white/15 shadow-[0_14px_42px_rgb(0_0_0/0.45),inset_0_1px_0_rgb(255_255_255/0.35),inset_0_-1px_0_rgb(255_255_255/0.08)]"
              : "bg-white/30 border border-white/65 shadow-[0_12px_36px_rgb(15_23_42/0.12),inset_0_1px_0_rgb(255_255_255/0.85),inset_0_-1px_0_rgb(255_255_255/0.4)]"
          }`}
        >
          {/* Specular top-edge liquid sheen */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 dark:via-sky-200/50 to-transparent"
          />

          {/* Brand Logo */}
          <a
            href="#home"
            onClick={() => {
              setActiveHref("#home");
              setIsMenuOpen(false);
            }}
            className="group relative flex items-center gap-2.5 rounded-full px-2.5 py-1 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-white/70 to-white/20 dark:from-white/15 dark:to-white/5 shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_4px_12px_rgb(30_63_216/0.18)] border border-white/40 dark:border-white/15">
              <img
                src={logo}
                alt="Logo"
                className="h-5 w-5 object-contain transition-transform duration-300 group-hover:rotate-6"
              />
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-700 to-sky-600 dark:from-white dark:via-sky-100 dark:to-sky-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </a>

          {/* Desktop Navigation with Liquid Droplet Pill */}
          <nav
            aria-label="Menu principal"
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden md:flex items-center gap-1 rounded-full p-1 bg-white/15 dark:bg-white/[0.04] border border-white/30 dark:border-white/10 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]"
          >
            {navItems.map((item) => {
              const isHighlighted = highlightedHref === item.href;
              const isActive = activeHref === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveHref(item.href)}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  className={`relative px-3.5 lg:px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 select-none ${
                    isHighlighted
                      ? "text-slate-950 dark:text-white"
                      : "text-slate-700/85 hover:text-slate-950 dark:text-slate-300/80 dark:hover:text-white"
                  }`}
                >
                  {isHighlighted && (
                    <motion.span
                      layoutId="liquid-nav-droplet"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 30 }
                      }
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-white/80 to-white/45 dark:from-white/20 dark:to-sky-400/10 border border-white/70 dark:border-white/25 shadow-[0_4px_16px_rgb(30_63_216/0.15),inset_0_1px_0_rgb(255_255_255/0.8)] dark:shadow-[0_4px_18px_rgb(56_189_248/0.22),inset_0_1px_0_rgb(255_255_255/0.4)]"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.label}
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shadow-[0_0_8px_rgb(56_189_248/0.9)]"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Theme, Language & Mobile Menu Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle Liquid Orb */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              className="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all duration-300
                bg-white/35 hover:bg-white/60 text-slate-800 border border-white/60 shadow-[inset_0_1px_0_rgb(255_255_255/0.75),0_4px_12px_rgb(0_0_0/0.06)]
                dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-100 dark:border-white/20 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_4px_14px_rgb(0_0_0/0.25)]
                hover:scale-105 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : { rotate: -65, scale: 0.5, opacity: 0 }
                  }
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { rotate: 65, scale: 0.5, opacity: 0 }
                  }
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <Sun className="h-[18px] w-[18px] text-amber-300" />
                  ) : (
                    <Moon className="h-[18px] w-[18px] text-blue-700" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Language Selector Liquid Orb */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Selecionar idioma"
                  className="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all duration-300
                    bg-white/35 hover:bg-white/60 text-slate-800 border border-white/60 shadow-[inset_0_1px_0_rgb(255_255_255/0.75),0_4px_12px_rgb(0_0_0/0.06)]
                    dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-100 dark:border-white/20 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_4px_14px_rgb(0_0_0/0.25)]
                    hover:scale-105 active:scale-95 focus:outline-none"
                >
                  <Globe className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-12" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="min-w-[10rem] rounded-2xl p-1.5 backdrop-blur-2xl bg-white/75 dark:bg-slate-950/75 border border-white/60 dark:border-white/15 shadow-[0_16px_40px_rgb(0_0_0/0.25),inset_0_1px_0_rgb(255_255_255/0.5)]"
              >
                <DropdownMenuItem
                  onClick={() => setLocale("en")}
                  className="rounded-xl px-3 py-2 text-sm font-medium cursor-pointer flex items-center justify-between focus:bg-blue-500/15 dark:focus:bg-sky-400/15"
                >
                  <span>🇺🇸 English</span>
                  {locale === "en" && (
                    <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-sky-400" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLocale("pt")}
                  className="rounded-xl px-3 py-2 text-sm font-medium cursor-pointer flex items-center justify-between focus:bg-blue-500/15 dark:focus:bg-sky-400/15"
                >
                  <span>🇧🇷 Português</span>
                  {locale === "pt" && (
                    <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-sky-400" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Hamburger Button inside Liquid Orb */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all duration-300
                bg-white/40 hover:bg-white/65 text-slate-900 border border-white/65 shadow-[inset_0_1px_0_rgb(255_255_255/0.8),0_4px_12px_rgb(0_0_0/0.08)]
                dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_4px_14px_rgb(0_0_0/0.28)]
                active:scale-95"
            >
              <div className="flex flex-col items-center justify-center w-4 h-4">
                <span
                  className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? " translate-y-[5px] rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "-translate-y-[3px] -rotate-45" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </LiquidGlass>

        {/* ─── Mobile Liquid Glass Floating Menu Panel ──────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -14, scale: 0.96, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, scale: 0.96, filter: "blur(6px)" }
              }
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-2.5"
            >
              <LiquidGlass
                radius={28}
                bevelDepth={20}
                scale={46}
                aberration={6}
                frost={2.8}
                tint={isDark ? 0.1 : 0.52}
                contentClassName="relative z-10 p-3"
                className={`w-full ${
                  isDark
                    ? "bg-slate-950/45 border border-white/15 shadow-[0_20px_50px_rgb(0_0_0/0.55),inset_0_1px_0_rgb(255_255_255/0.35),inset_0_-1px_0_rgb(255_255_255/0.08)]"
                    : "bg-white/45 border border-white/70 shadow-[0_18px_45px_rgb(15_23_42/0.16),inset_0_1px_0_rgb(255_255_255/0.85),inset_0_-1px_0_rgb(255_255_255/0.4)]"
                }`}
              >
                {/* Specular top highlight inside mobile panel */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/75 dark:via-sky-200/45 to-transparent"
                />

                <nav
                  aria-label="Menu mobile"
                  className="flex flex-col gap-1"
                >
                  {navItems.map((item, index) => {
                    const isActive = activeHref === item.href;

                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        initial={
                          reduceMotion ? false : { opacity: 0, x: -12 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: reduceMotion ? 0 : index * 0.04,
                          ease: "easeOut",
                        }}
                        onClick={() => {
                          setActiveHref(item.href);
                          setIsMenuOpen(false);
                        }}
                        className={`group relative flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-all duration-200 active:scale-[0.98] ${
                          isActive
                            ? "bg-gradient-to-r from-white/75 to-white/40 dark:from-white/15 dark:to-sky-400/10 text-blue-700 dark:text-sky-300 border border-white/70 dark:border-white/20 shadow-[0_6px_20px_rgb(30_63_216/0.12),inset_0_1px_0_rgb(255_255_255/0.7)]"
                            : "text-slate-800 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/10"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? "bg-blue-600 dark:bg-sky-400 scale-125 shadow-[0_0_10px_rgb(56_189_248/0.9)]"
                                : "bg-slate-400/50 dark:bg-slate-500/50 group-hover:bg-blue-500 dark:group-hover:bg-sky-400"
                            }`}
                          />
                          {item.label}
                        </span>
                        {isActive && (
                          <Sparkles className="h-4 w-4 text-blue-600 dark:text-sky-400 opacity-80" />
                        )}
                      </motion.a>
                    );
                  })}
                </nav>
              </LiquidGlass>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;
