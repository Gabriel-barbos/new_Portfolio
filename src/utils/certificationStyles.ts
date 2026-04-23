export interface ThemeStyle {
    gradient: string;
    borderColor: string;
    hoverBorder: string;
    accentColor: string;
    badgeColor: string;
    shadow: string;
    hoverShadow: string;
  }
  
  export const themes: Record<string, ThemeStyle> = {
    google: {
      gradient: 'from-blue-500 via-red-500 via-yellow-500 to-green-500',
      borderColor: 'border-blue-200 dark:border-blue-800',
      hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-600',
      accentColor: 'text-blue-600 dark:text-blue-400',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg'
    },
    azure: {
      gradient: 'from-blue-600 to-blue-800',
      borderColor: 'border-blue-300 dark:border-blue-700',
      hoverBorder: 'hover:border-blue-500 dark:hover:border-blue-500',
      accentColor: 'text-blue-700 dark:text-blue-300',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg'
    },
    ibm: {
      gradient: 'from-blue-800 to-gray-900',
      borderColor: 'border-slate-300 dark:border-slate-600',
      hoverBorder: 'hover:border-blue-600 dark:hover:border-blue-500',
      accentColor: 'text-blue-800 dark:text-blue-300',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-600',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg'
    },
    dio: {
      gradient: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-200 dark:border-purple-700',
      hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
      accentColor: 'text-purple-700 dark:text-purple-300',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg'
    },
    santander: {
      gradient: 'from-red-600 to-red-800',
      borderColor: 'border-red-200 dark:border-red-800',
      hoverBorder: 'hover:border-red-400 dark:hover:border-red-600',
      accentColor: 'text-red-700 dark:text-red-400',
      badgeColor: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg'
    },
    fiap: {
      gradient: 'from-pink-600 to-red-900',
      borderColor: 'border-pink-200 dark:border-pink-800',
      hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-600',
      accentColor: 'text-pink-700 dark:text-pink-400',
      badgeColor: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg'
    },
    aws: {
      gradient: 'from-orange-500 to-yellow-600',
      borderColor: 'border-orange-200 dark:border-orange-700',
      hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500',
      accentColor: 'text-orange-700 dark:text-orange-400',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg'
    },
    special: {
      gradient: 'from-pink-600 via-purple-600 to-blue-600',
      borderColor: 'border-transparent',
      hoverBorder: 'hover:border-transparent',
      accentColor: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600',
      badgeColor: 'bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-purple-800 border-purple-200 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 dark:text-purple-300 dark:border-purple-700',
      shadow: 'shadow-lg',
      hoverShadow: 'hover:shadow-xl'
    },
    default: {
      gradient: 'from-gray-600 to-gray-800',
      borderColor: 'border-border',
      hoverBorder: 'hover:border-border/80',
      accentColor: 'text-foreground',
      badgeColor: 'bg-secondary text-secondary-foreground border-border',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg'
    }
  };
  
  export const getThemeStyles = (theme: string): ThemeStyle => {
    return themes[theme] || themes.default;
  };