
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import G7Section from '../components/G7Section';
import About from '../components/About';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Tools from '../components/Tools';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingButton from '../components/FloatingButton';

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Hero />
            <Skills />
            <Projects />
            <G7Section />
            <About />
            <Experience />
            <Education />
            <Certifications />
            <Tools />
            <Contact />
          </main>
          <Footer />
          <FloatingButton />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
