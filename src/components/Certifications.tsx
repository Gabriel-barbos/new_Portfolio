import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Calendar, Award, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { PremiumCertificationCard } from './ui/PremiumCertificationCard';

import { certifications, type Certification } from '../utils/certificationData';
import { getThemeStyles } from '../utils/certificationStyles';

const Certifications = () => {
  const { t, locale } = useLanguage();
  const [visibleCerts, setVisibleCerts] = useState(6);
  const [activeTab, setActiveTab] = useState<'all' | 'certifications' | 'courses'>('certifications');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const loadMoreCertifications = () => {
    setVisibleCerts(prev => Math.min(prev + 6, filteredCertifications.length));
  };

  const filteredCertifications = certifications.filter(cert => {
    if (activeTab === 'all') return true;
    return activeTab === 'certifications' ? cert.type === 'certification' : cert.type === 'course';
  });

  const renderCertificationCard = (cert: Certification) => {
    const themeStyles = getThemeStyles(cert.theme);
    
    const cardContent = (
      <>
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${themeStyles.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <CardHeader className="pb-3 relative">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <CardTitle className="text-lg leading-tight group-hover:text-foreground transition-colors duration-200">
                {cert.name}
              </CardTitle>
              <div className="flex items-center mt-2">
                {cert.type === 'certification' ? (
                  <Award className={`h-4 w-4 mr-2 ${themeStyles.accentColor}`} />
                ) : (
                  <BookOpen className={`h-4 w-4 mr-2 ${themeStyles.accentColor}`} />
                )}
                <span className="text-sm text-muted-foreground capitalize">
                  {cert.type === 'certification' 
                    ? t('certifications.badges.certification') 
                    : t('certifications.badges.course')
                  }
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0 h-14 w-24 flex items-center justify-center overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-lg transition-all duration-200">
              <img 
                src={cert.issuerLogo} 
                alt={`${cert.issuer} logo`}
                className="max-h-full max-w-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/100x50?text=${cert.issuer.charAt(0)}`;
                }}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className={`font-medium ${themeStyles.accentColor}`}>
                {cert.issuer}
              </span>
            </div>
            
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">
                {formatDate(cert.date)}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-5">
            {cert.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className={`${themeStyles.badgeColor} border transition-all duration-200 hover:scale-105 text-xs font-medium`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`w-full group-hover:bg-primary/10 transition-all duration-200 border border-primary/20 hover:border-primary/40 rounded-lg ${themeStyles.accentColor}`}
            asChild
          >
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              <span className="font-medium">{t('certifications.buttonViewCredential')}</span>
            </a>
          </Button>
        </CardFooter>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </>
    );

    if (cert.isSpecial) {
      return (
        <PremiumCertificationCard
          key={cert.id}
          cert={cert}
          themeStyles={themeStyles}
          formatDate={formatDate}
          t={t}
        />
      );
    }

    return (
      <Card 
        key={cert.id} 
        className={`group relative overflow-hidden transition-all duration-300 ease-out bg-card border-2 ${themeStyles.borderColor} ${themeStyles.hoverBorder} ${themeStyles.shadow} ${themeStyles.hoverShadow} hover:scale-[1.02] hover:-translate-y-1 cursor-pointer`}
      >
        {cardContent}
      </Card>
    );
  };

  return (
    <section id="certifications" className="py-20">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('certifications.title')}</h2>
          <p className="text-lg text-muted-foreground mt-4">{t('certifications.description')}</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg bg-muted p-1">
            {[
              { key: 'certifications', label: t('certifications.tabs.certifications'), icon: Award },
              { key: 'courses', label: t('certifications.tabs.courses'), icon: BookOpen },
              { key: 'all', label: t('certifications.tabs.all'), icon: GraduationCap }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key as any);
                  setVisibleCerts(6);
                }}
                className={`flex items-center px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === key 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.slice(0, visibleCerts).map((cert) => renderCertificationCard(cert))}
        </div>
        
        {visibleCerts < filteredCertifications.length && (
          <div className="mt-12 text-center">
            <Button 
              onClick={loadMoreCertifications} 
              variant="outline"
              className="px-8 py-3 text-base hover:scale-105 transition-transform duration-200"
            >
              {t('certifications.loadMore')}
            </Button>
          </div>
        )}
        
        {filteredCertifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">{t('certifications.noItemsFound')}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
