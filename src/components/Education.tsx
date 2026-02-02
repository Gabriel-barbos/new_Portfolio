import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, BookOpen, GraduationCap, Award, Globe } from 'lucide-react';
import { Badge } from './ui/badge';

import fatec from "../assets/fatec.png";
import etec from "../assets/etec.jpg";
import wizard from "../assets/wizard.jpg";
import fiap from "../assets/icons/fiap.png";

// Definição de tipo Education com logo e ícone
interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface Language {
  name: string;
  level: string;
  certificate?: string;
  flag?: string;
}

const Education: React.FC = () => {
  const { t, locale } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Pega os dados traduzidos do education.cards
  const translatedEducation = t('education.cards') as unknown as Array<{
    degree: string;
    institution: string;
    description: string;
  }>;

  // Construindo educationData com logos, ícones e cores fixas
  const educationData: Education[] = translatedEducation.map((item, index) => {
    const logos = [fiap, fatec, etec, wizard];
    const icons = [GraduationCap, Award, BookOpen, Globe];
    const colors = [
      "from-red-500 to-red-600",
      "from-amber-500 to-orange-600",
      "from-blue-600 to-indigo-600",
      "from-emerald-500 to-emerald-600",
    ];


    return {
      degree: item.degree,
      institution: item.institution,
      description: item.description,
      startDate: index === 0 ? "2023-02-01" : index === 1 ? "2020-02-01" : "2013-02-01", // mantendo datas fixas
      endDate: index === 0 ? "2025-12-01" : index === 1 ? "2022-12-01" : "2021-12-01",
      logo: logos[index],
      icon: icons[index],
      color: colors[index],
    };
  });

  // Dados de idiomas (usando labels traduzidos)
  const languageLevels = t('education.languageLevels') as unknown as {
    english: string;
    portuguese: string;
    spanish: string;
  };

  const languageData: Language[] = [
    { name: "English", level: languageLevels.english, certificate: "TOEIC: 780/1000", flag: "🇺🇸" },
    { name: "Portuguese", level: languageLevels.portuguese, flag: "🇧🇷" },
    { name: "Spanish", level: languageLevels.spanish, flag: "🇪🇸" },
  ];

  // Formata data segundo locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
            {t('education.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <Tabs defaultValue="education" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-1">
            <TabsTrigger value="education" className="flex items-center gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">{t('education.title')}</span>
            </TabsTrigger>
            <TabsTrigger value="languages" className="flex items-center gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">{t('education.languages')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="education" className="space-y-8">
            <div className="max-w-3xl mx-auto space-y-8">
              {educationData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)} className="group relative">
                    <div className={`relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 transition-all duration-500 transform ${hoveredCard === index ? 'scale-105 shadow-3xl' : 'hover:scale-102'} overflow-hidden`}>
                      {/* Header com logo e ícone */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 rounded-2xl border-2 ${item.color.replace('from-', 'border-').replace(' to-', ' border-')} flex items-center justify-center overflow-hidden`}>
                            <img
                              src={item.logo}
                              alt={`${item.institution} logo`}
                              className="w-full h-full rounded-2xl object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{item.institution}</h3>
                            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="font-medium">
                                {formatDate(item.startDate)} - {formatDate(item.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`p-3 rounded-full bg-gradient-to-br ${item.color} text-white shadow-lg transform transition-all duration-300 ${hoveredCard === index ? 'scale-110 rotate-12' : ''}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                      </div>
                      {/* Título do curso */}
                      <div className="mb-4">
                        <h4 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                          {item.degree}
                        </h4>
                        <div className={`w-0 h-1 bg-gradient-to-r ${item.color} rounded-full transition-all duration-500 ${hoveredCard === index ? 'w-20' : ''}`}></div>
                      </div>
                      {/* Descrição */}
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                        {item.description}
                      </p>
                      {/* Decoração de canto */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full transform translate-x-16 -translate-y-16 transition-transform duration-500 ${hoveredCard === index ? 'scale-150' : ''}`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="languages">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {languageData.map((lang, index) => (
                  <div key={index} className="group relative">
                    <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl transform transition-transform duration-300 group-hover:scale-125">{lang.flag}</span>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang.name}</h3>
                          </div>
                          <div className="p-2 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg transform transition-transform duration-300 group-hover:rotate-12">
                            <BookOpen className="h-4 w-4" />
                          </div>
                        </div>
                        <Badge variant="outline" className="mb-3 px-3 py-1 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-medium">
                          {lang.level}
                        </Badge>
                        {lang.certificate && (
                          <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-emerald-500">
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{lang.certificate}</p>
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-full transform translate-x-10 translate-y-10 transition-transform duration-500 group-hover:scale-150"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Education;
