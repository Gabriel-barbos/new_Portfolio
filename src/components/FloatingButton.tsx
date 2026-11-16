
import React from 'react';
import { FileDown } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { usePixelBuilder } from './pixel-builder/PixelBuilderContext';

const FloatingButton = () => {
  const { t } = useLanguage();
  const { emitCompanionEvent } = usePixelBuilder();

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40">
      <Button
        id="cv-floating-button"
        className="rounded-full shadow-lg p-4 h-16 w-16 md:h-auto md:w-auto md:px-6 transition-transform duration-200 hover:scale-105 active:scale-95"
        onMouseEnter={() => emitCompanionEvent({ type: 'cv-hover' })}
        onMouseLeave={() => emitCompanionEvent({ type: 'cv-leave' })}
        onClick={() => {
          emitCompanionEvent({ type: 'cv-click' });
          window.open('/docs/CV_Gabriel_Barbosa_30.3.pdf', '_blank');
        }}
        aria-label={t('hero.download')}
      >
        <FileDown className="h-6 w-6 md:mr-2" />
        <span className="hidden md:inline">{t('hero.download')}</span>
      </Button>
    </div>
  );
};

export default FloatingButton;
