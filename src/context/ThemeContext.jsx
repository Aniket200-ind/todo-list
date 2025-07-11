import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    //* Check for user's system preference for dark mode
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(activeTheme);
    document.documentElement.classList.toggle('dark', activeTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    toast.info(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, {
      description: newTheme === 'dark' ? '🌙 Embrace the darkness.' : '🌞 Shine bright.',
      duration: 3000
    });
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);