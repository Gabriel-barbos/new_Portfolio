
import React from 'react';
import { FileDown } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const FloatingButton = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed bottom-8 right-8 z-40">
      <Button 
        className="rounded-full shadow-lg p-4 h-16 w-16 md:h-auto md:w-auto md:px-6"
        onClick={() => window.open('/docs/CV_Gabriel_Barbosa_30.3.pdf', '_blank')}
        aria-label={t('hero.download')}
      >
        <FileDown className="h-6 w-6 md:mr-2" />
        <span className="hidden md:inline">{t('hero.download')}</span>
      </Button>
    </div>
  );
};

export default FloatingButton;
