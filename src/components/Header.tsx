
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Moon, Sun, Globe } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';

import logo from "../assets/logoG.png"

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.g7'), href: '#g7-software' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center space-x-2 text-2xl font-bold text-primary">
  <img src={logo} alt="Logo" className="h-[1.5rem] w-[1.5rem] object-contain" />
  <span>Portfolio</span>
</a>

        {/* Desktop*/}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Theme and Language Controls */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocale('en')}>
                🇺🇸 English {locale === 'en' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale('pt')}>
                🇧🇷 Português {locale === 'pt' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </Button>
        </div>
      </div>
      
      {/* Mobile*/}
      {isMenuOpen && (
        <div className="md:hidden bg-background dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="block py-3 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
