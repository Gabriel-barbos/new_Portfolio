import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { ExternalLink, Calendar, Award, BookOpen, Star } from 'lucide-react';
import type { Certification } from '../../utils/certificationData';
import type { ThemeStyle } from '../../utils/certificationStyles';

interface PremiumCertificationCardProps {
  cert: Certification;
  themeStyles: ThemeStyle;
  formatDate: (date: string) => string;
  t: (key: string) => string;
}

export const PremiumCertificationCard: React.FC<PremiumCertificationCardProps> = ({
  cert,
  themeStyles,
  formatDate,
  t,
}) => {
  return (
    <div
      className="relative group/premium transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-2"
      style={{ isolation: 'isolate' }}
    >
      {/* ─── Outer animated glow ring (company color) ─── */}
      <div
        className="absolute -inset-[3px] rounded-xl opacity-70 group-hover/premium:opacity-100 transition-opacity duration-700"
        style={{
          background: themeStyles.glowGradient,
          filter: 'blur(8px)',
          animation: 'premiumPulse 3s ease-in-out infinite alternate',
        }}
      />

      {/* ─── Secondary inner glow (tighter) ─── */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-50 group-hover/premium:opacity-80 transition-opacity duration-500"
        style={{
          background: themeStyles.glowGradient,
          filter: 'blur(2px)',
        }}
      />

      {/* ─── Floating particles ─── */}
      <div
        className="absolute -top-1 left-1/4 w-1 h-1 rounded-full opacity-0 group-hover/premium:opacity-100 pointer-events-none"
        style={{
          background: themeStyles.glowColor,
          animation: 'floatParticle 2s ease-out infinite',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute -top-1 left-3/4 w-1.5 h-1.5 rounded-full opacity-0 group-hover/premium:opacity-100 pointer-events-none"
        style={{
          background: themeStyles.glowColor,
          animation: 'floatParticle 2.4s ease-out infinite',
          animationDelay: '0.6s',
        }}
      />
      <div
        className="absolute -top-1 left-1/2 w-1 h-1 rounded-full opacity-0 group-hover/premium:opacity-100 pointer-events-none"
        style={{
          background: themeStyles.glowColor,
          animation: 'floatParticle 2.8s ease-out infinite',
          animationDelay: '1.2s',
        }}
      />

      {/* ─── Badge DESTAQUE ─── */}
      <div className="absolute -top-3 -right-2 z-20">
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg`}
          style={{
            background: `linear-gradient(135deg, #f59e0b, #d97706)`,
            boxShadow: `0 0 12px rgba(245,158,11,0.7), 0 2px 4px rgba(0,0,0,0.3)`,
            animation: 'badgeShine 2.5s ease-in-out infinite',
          }}
        >
          <Star  className="h-3.5 w-3.5 fill-current" />
          
        </div>
      </div>

      {/* ─── Main Card ─── */}
      <Card
        className={`
          relative overflow-hidden bg-card border-2
          ${themeStyles.borderColor}
          ${themeStyles.hoverBorder}
          transition-all duration-300 ease-out cursor-pointer h-full
          shadow-xl
        `}
        style={{ borderRadius: '0.75rem' }}
      >
        {/* Animated gradient bar on top (shimmer effect) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden rounded-t-xl">
          <div
            className={`h-full bg-gradient-to-r ${themeStyles.gradient}`}
            style={{ opacity: 0.9 }}
          />
          {/* Shimmer sweep over the bar */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              animation: 'shimmerBar 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Logo container glow effect */}
        <CardHeader className="pb-3 relative pt-5">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <CardTitle className="text-lg leading-tight group-hover/premium:text-foreground transition-colors duration-200">
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
                    : t('certifications.badges.course')}
                  {` ${t('certifications.badges.special')}`}
                </span>
              </div>
            </div>

            {/* Logo with inner glow */}
            <div
              className="flex-shrink-0 h-14 w-24 flex items-center justify-center overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm transition-all duration-500"
              style={{
                boxShadow: `0 0 0 1px ${themeStyles.glowColor}, 0 0 18px ${themeStyles.glowColor}`,
              }}
            >
              <img
                src={cert.issuerLogo}
                alt={`${cert.issuer} logo`}
                className="max-h-full max-w-full object-contain p-1 transition-transform duration-300 group-hover/premium:scale-110"
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
              <span className={`font-medium ${themeStyles.accentColor}`}>{cert.issuer}</span>
            </div>

            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{formatDate(cert.date)}</span>
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
          {/* Animated premium button with company gradient */}
          <div className="relative w-full overflow-hidden rounded-lg group/btn">
            {/* Button shimmer */}
            <div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                animation: 'shimmerBtn 1.2s ease-in-out infinite',
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              className={`w-full transition-all duration-300 border rounded-lg font-medium
                ${themeStyles.accentColor}
                border-opacity-30
              `}
              style={{
                borderColor: themeStyles.glowColor,
                background: `${themeStyles.glowColor.replace('0.55', '0.08')}`,
              }}
              asChild
            >
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span>{t('certifications.buttonViewCredential')}</span>
              </a>
            </Button>
          </div>
        </CardFooter>

        {/* Shimmer sweep overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover/premium:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
            animation: 'shimmerCard 1.5s ease-in-out infinite',
          }}
        />
      </Card>

      {/* ─── CSS keyframes ─── */}
      <style>{`
        @keyframes premiumPulse {
          0%   { opacity: 0.55; filter: blur(8px); }
          100% { opacity: 0.85; filter: blur(12px); }
        }
        @keyframes floatParticle {
          0%   { transform: translateY(0px) scale(1); opacity: 0.8; }
          100% { transform: translateY(-24px) scale(0); opacity: 0; }
        }
        @keyframes badgeShine {
          0%, 100% { box-shadow: 0 0 12px rgba(245,158,11,0.7), 0 2px 4px rgba(0,0,0,0.3); }
          50%       { box-shadow: 0 0 22px rgba(245,158,11,1),   0 2px 8px rgba(0,0,0,0.4); }
        }
        @keyframes shimmerBar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes shimmerCard {
          0%   { transform: translateX(-100%) skewX(-10deg); }
          100% { transform: translateX(200%) skewX(-10deg); }
        }
        @keyframes shimmerBtn {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default PremiumCertificationCard;
