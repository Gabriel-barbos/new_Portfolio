import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, Linkedin } from 'lucide-react';
import prof from "../assets/profile.jpeg"

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-primary/5">
      <div className="container-section">
        <h2 className="section-title">{t('about.title')}</h2>
        
        <div className="flex flex-col lg:flex-row gap-10 items-center mt-10">
          {/* Profile image */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="rounded-xl overflow-hidden shadow-xl h-80 w-80 mx-auto">
              <img 
                src={prof} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          {/* About content */}
          <div className="lg:w-2/3">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">Gabriel Barbosa</h3>
              
              <p className="text-lg">
                {t('about.description')}
              </p>
              
              <div className="pt-4">
                <h4 className="font-semibold mb-6">{t('about.connect')}</h4>
                <div className="flex flex-wrap gap-6">
                  {/* GitHub Button */}
                  <a 
                    href="https://github.com/Gabriel-barbos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out flex items-center gap-3 min-w-[160px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Github className="h-6 w-6 z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold text-lg z-10">GitHub</span>
                    <div className="absolute -right-2 -top-2 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                  </a>
                  
                  {/* LinkedIn Button */}
                  <a 
                    href="https://www.linkedin.com/in/gabriel-barbosa-da-silva-35bb19256/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out flex items-center gap-3 min-w-[160px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Linkedin className="h-6 w-6 z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold text-lg z-10">LinkedIn</span>
                    <div className="absolute -right-2 -top-2 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
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
