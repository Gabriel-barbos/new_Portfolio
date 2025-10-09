import React, { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from './ui/badge';
import { MapPin, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';

import scope from "../assets/scope.jpg";
import outlier from "../assets/outiler.avif";
import teacher from "../assets/teacher.png";

interface Job {
  id: string;
  company: string;
  startDate: string;
  endDate: string | null;
  technologies: string[];
  logo?: string;
}

const Experience = () => {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<Job | null>(null);
  const ref = useRef(null);
  const id = useId();

  const experiences: Job[] = [
    {
      id: "job1",
      company: "Scope Technology",
      startDate: "2023-05",
      endDate: null,
      technologies: ["Excel", "TypeScript", "React", "IoT", "Canva", "Python", "Node.js"],
      logo: scope,
    },
    {
      id: "job2",
      company: "Outlier",
      startDate: "2024-10",
      endDate: null,
      technologies: ["JavaScript", "React", "Python", "Java", "AI"],
      logo: outlier,
    },
    {
      id: "job3",
      company: "",
      startDate: "2024-04",
      endDate: "2024-12",
      technologies: ["Quiz", "Notion"],
      logo: teacher,
    },
  ];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('experience.present');

    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const CloseIcon = () => (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20">
      <div className="container-section">
        <h2 className="section-title">{t('experience.title')}</h2>

        <div className="mt-8 sm:mt-10">
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 h-full w-full z-10"
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {active ? (
              <div className="fixed inset-0 z-[100] p-4 md:p-8 flex items-center justify-center overflow-y-auto">
                <motion.button
                  key={`button-${active.id}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="flex absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] items-center justify-center bg-white rounded-full h-8 w-8 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>

                <motion.div
                  layoutId={`card-${active.id}-${id}`}
                  ref={ref}
                  className="w-full max-w-[90vw] sm:max-w-[600px] max-h-[90vh] md:max-h-[85vh] bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
                >
                  <motion.div layoutId={`image-${active.id}-${id}`} className="flex-shrink-0">
                    <img
                      width={200}
                      height={200}
                      src={active.logo}
                      alt={active.company}
                      className="w-full h-40 sm:h-48 md:h-64 object-cover object-center"
                    />
                  </motion.div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                        <div className="flex-1 sm:pr-4">
                          <motion.h3
                            layoutId={`title-${active.id}-${id}`}
                            className="font-bold text-lg sm:text-xl text-neutral-700 dark:text-neutral-200"
                          >
                            {t(`experience.jobs.${active.id}.position`)}
                          </motion.h3>
                          <motion.p
                            layoutId={`company-${active.id}-${id}`}
                            className="text-base sm:text-lg font-medium text-neutral-600 dark:text-neutral-400 mt-1"
                          >
                            {active.company}
                          </motion.p>

                          <div className="flex flex-col gap-2 mt-3 text-sm text-neutral-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span className="break-words">
                                {formatDate(active.startDate)} - {formatDate(active.endDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="break-words">{t(`experience.jobs.${active.id}.location`)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 text-sm lg:text-base flex flex-col gap-4 sm:gap-6 dark:text-neutral-400"
                      >
                        <div>
                          <h4 className="font-semibold mb-2 sm:mb-3 text-neutral-800 dark:text-neutral-200">
                            {t('experience.description')}
                          </h4>
                          <p className="leading-relaxed">{t(`experience.jobs.${active.id}.description`)}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 sm:mb-3 text-neutral-800 dark:text-neutral-200">
                            {t('experience.techTitle')}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {active.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>

          <ul className="max-w-4xl mx-auto w-full space-y-4">
            {experiences.map((job) => (
              <motion.div
                layoutId={`card-${job.id}-${id}`}
                key={`card-${job.id}-${id}`}
                onClick={() => setActive(job)}
                className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors border-2 border-neutral-200 dark:border-neutral-700 card-hover shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col items-center w-full space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4 sm:flex-1">
                  <motion.div layoutId={`image-${job.id}-${id}`} className="flex-shrink-0">
                    <img
                      width={200}
                      height={120}
                      src={job.logo}
                      alt={job.company}
                      className="h-24 w-32 sm:h-20 sm:w-28 md:h-20 md:w-32 rounded-lg object-cover object-center border-2 border-gray-300 dark:border-gray-600 shadow-md"
                    />
                  </motion.div>

                  <div className="flex-1 text-center sm:text-left w-full">
                    <motion.h3
                      layoutId={`title-${job.id}-${id}`}
                      className="font-bold text-lg text-neutral-800 dark:text-neutral-200"
                    >
                      {t(`experience.jobs.${job.id}.position`)}
                    </motion.h3>
                    <motion.p
                      layoutId={`company-${job.id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 font-medium"
                    >
                      {job.company}
                    </motion.p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-neutral-500">
                      <div className="flex items-center gap-1 justify-center sm:justify-start">
                        <Calendar className="h-4 w-4" />
                        <span className="text-center sm:text-left">
                          {formatDate(job.startDate)} - {formatDate(job.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 justify-center sm:justify-start">
                        <MapPin className="h-4 w-4" />
                        <span className="text-center sm:text-left">
                          {t(`experience.jobs.${job.id}.location`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  layoutId={`button-${job.id}-${id}`}
                  className="px-6 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-blue-500 hover:text-white text-black mt-4 sm:mt-0 transition-colors flex-shrink-0"
                >
                  {t('experience.viewDetails')}
                </motion.button>
              </motion.div>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;