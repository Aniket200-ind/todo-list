import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setIsDark(prev => !prev);
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this duration with your CSS transition duration
  };

  return (
    <div>
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-3xl blur-xl transition-all duration-700 ${
          isDark 
            ? 'bg-purple-500/20 dark:bg-purple-400/30' 
            : 'bg-amber-400/20 dark:bg-amber-300/30'
        }`} />
        
        {/* Main toggle button */}
        <button
          onClick={handleToggle}
          className={`relative group w-14 h-14 rounded-4xl shadow-2xl transition-all duration-500 ease-out transform hover:scale-105 active:scale-95 ${
            isDark
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-purple-500/25'
              : 'bg-gradient-to-br from-white to-gray-50 shadow-amber-500/25'
          }`}
          aria-label="Toggle theme"
        >
          {/* Inner shadow/highlight */}
          <div className={`absolute inset-1 rounded-2xl transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50 shadow-inner'
              : 'bg-gradient-to-br from-white/80 to-gray-100/80 shadow-inner'
          }`} />
          
          {/* Icon container */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {/* Sun icon */}
            <Sun 
              className={`absolute w-8 h-8 text-amber-500 transition-all duration-500 ease-out ${
                isDark 
                  ? 'opacity-0 scale-0 rotate-180' 
                  : 'opacity-100 scale-100 rotate-0'
              } ${isAnimating ? 'animate-pulse' : ''}`}
            />
            
            {/* Moon icon */}
            <Moon 
              className={`absolute w-8 h-8 text-purple-400 transition-all duration-500 ease-out ${
                isDark 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-0 -rotate-180'
              } ${isAnimating ? 'animate-pulse' : ''}`}
            />
          </div>
          
          {/* Ripple effect on click */}
          <div className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
            isAnimating 
              ? isDark 
                ? 'bg-purple-500/20 scale-110' 
                : 'bg-amber-400/20 scale-110'
              : 'scale-100'
          }`} />
        </button>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${
                isDark ? 'bg-purple-400/60' : 'bg-amber-400/60'
              } ${isAnimating ? 'animate-ping' : ''}`}
              style={{
                left: `${20 + i * 12}%`,
                top: `${15 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}