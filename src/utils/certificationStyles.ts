export interface ThemeStyle {
    gradient: string;
    borderColor: string;
    hoverBorder: string;
    accentColor: string;
    badgeColor: string;
    shadow: string;
    hoverShadow: string;
    // Premium glow for special certs — uses the company's own colors
    glowColor: string;
    glowGradient: string;
    specialBadgeGradient: string;
  }
  
  export const themes: Record<string, ThemeStyle> = {
    google: {
      gradient: 'from-blue-500 via-red-500 via-yellow-500 to-green-500',
      borderColor: 'border-blue-200 dark:border-blue-800',
      hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-600',
      accentColor: 'text-blue-600 dark:text-blue-400',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      glowColor: 'rgba(66,133,244,0.5)',
      glowGradient: 'linear-gradient(135deg, rgba(66,133,244,0.7) 0%, rgba(234,67,53,0.6) 33%, rgba(251,188,5,0.6) 66%, rgba(52,168,83,0.7) 100%)',
      specialBadgeGradient: 'from-blue-500 via-red-400 to-green-500',
    },
    azure: {
      gradient: 'from-blue-600 to-blue-800',
      borderColor: 'border-blue-300 dark:border-blue-700',
      hoverBorder: 'hover:border-blue-500 dark:hover:border-blue-500',
      accentColor: 'text-blue-700 dark:text-blue-300',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      glowColor: 'rgba(0,120,212,0.55)',
      glowGradient: 'linear-gradient(135deg, rgba(0,120,212,0.7) 0%, rgba(0,164,239,0.6) 50%, rgba(0,200,255,0.5) 100%)',
      specialBadgeGradient: 'from-blue-600 to-cyan-500',
    },
    ibm: {
      gradient: 'from-blue-800 to-gray-900',
      borderColor: 'border-slate-300 dark:border-slate-600',
      hoverBorder: 'hover:border-blue-600 dark:hover:border-blue-500',
      accentColor: 'text-blue-800 dark:text-blue-300',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-600',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      glowColor: 'rgba(30,64,175,0.55)',
      glowGradient: 'linear-gradient(135deg, rgba(30,64,175,0.7) 0%, rgba(30,30,50,0.6) 100%)',
      specialBadgeGradient: 'from-blue-800 to-slate-600',
    },
    dio: {
      gradient: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-200 dark:border-purple-700',
      hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
      accentColor: 'text-purple-700 dark:text-purple-300',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      glowColor: 'rgba(147,51,234,0.55)',
      glowGradient: 'linear-gradient(135deg, rgba(147,51,234,0.7) 0%, rgba(219,39,119,0.6) 100%)',
      specialBadgeGradient: 'from-purple-600 to-pink-600',
    },
    santander: {
      gradient: 'from-red-600 to-red-800',
      borderColor: 'border-red-200 dark:border-red-800',
      hoverBorder: 'hover:border-red-400 dark:hover:border-red-600',
      accentColor: 'text-red-700 dark:text-red-400',
      badgeColor: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      glowColor: 'rgba(220,38,38,0.55)',
      glowGradient: 'linear-gradient(135deg, rgba(220,38,38,0.7) 0%, rgba(153,27,27,0.6) 100%)',
      specialBadgeGradient: 'from-red-600 to-red-800',
    },
    fiap: {
      gradient: 'from-pink-600 to-red-900',
      borderColor: 'border-pink-200 dark:border-pink-800',
      hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-600',
      accentColor: 'text-pink-700 dark:text-pink-400',
      badgeColor: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      glowColor: 'rgba(219,39,119,0.55)',
      glowGradient: 'linear-gradient(135deg, rgba(219,39,119,0.7) 0%, rgba(153,27,27,0.6) 100%)',
      specialBadgeGradient: 'from-pink-600 to-red-700',
    },
    aws: {
      gradient: 'from-orange-500 to-yellow-600',
      borderColor: 'border-orange-200 dark:border-orange-700',
      hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500',
      accentColor: 'text-orange-700 dark:text-orange-400',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      glowColor: 'rgba(249,115,22,0.55)',
      glowGradient: 'linear-gradient(135deg, rgba(249,115,22,0.8) 0%, rgba(234,179,8,0.65) 100%)',
      specialBadgeGradient: 'from-orange-500 to-yellow-500',
    },
    alura: {
      gradient: 'from-[#051933] via-blue-900 to-blue-700',
      borderColor: 'border-blue-900 dark:border-blue-950',
      hoverBorder: 'hover:border-blue-700 dark:hover:border-blue-800',
      accentColor: 'text-blue-900 dark:text-blue-200',
      badgeColor: 'bg-blue-950/10 text-blue-900 border-blue-800 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-800',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg hover:shadow-blue-900/30',
      glowColor: 'rgba(5,25,51,0.7)',
      glowGradient: 'linear-gradient(135deg, rgba(5,25,51,0.85) 0%, rgba(30,58,138,0.65) 60%, rgba(29,78,216,0.5) 100%)',
      specialBadgeGradient: 'from-[#051933] via-blue-900 to-blue-700',
    },
    anthropic: {
      gradient: 'from-[#D97F62] via-[#C96442] to-[#8B3A2A]',
      borderColor: 'border-orange-200 dark:border-[#6B3020]',
      hoverBorder: 'hover:border-[#D97F62] dark:hover:border-[#C96442]',
      accentColor: 'text-[#C96442] dark:text-[#E8A080]',
      badgeColor: 'bg-orange-50 text-[#8B3A2A] border-orange-200 dark:bg-[#3A1A0A]/40 dark:text-[#E8A080] dark:border-[#6B3020]',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg hover:shadow-[#C96442]/20',
      glowColor: 'rgba(201,100,66,0.6)',
      glowGradient: 'linear-gradient(135deg, rgba(217,127,98,0.75) 0%, rgba(201,100,66,0.65) 50%, rgba(139,58,42,0.55) 100%)',
      specialBadgeGradient: 'from-[#D97F62] via-[#C96442] to-[#8B3A2A]',
    },
    default: {
      gradient: 'from-gray-600 to-gray-800',
      borderColor: 'border-border',
      hoverBorder: 'hover:border-border/80',
      accentColor: 'text-foreground',
      badgeColor: 'bg-secondary text-secondary-foreground border-border',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
      glowColor: 'rgba(100,100,100,0.4)',
      glowGradient: 'linear-gradient(135deg, rgba(100,100,100,0.5) 0%, rgba(60,60,60,0.4) 100%)',
      specialBadgeGradient: 'from-gray-500 to-gray-700',
    }
  };
  
  export const getThemeStyles = (theme: string): ThemeStyle => {
    return themes[theme] || themes.default;
  };