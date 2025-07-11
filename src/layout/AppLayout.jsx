//! File: src/layout/AppLayout.jsx

import ThemeToggle from '@/components/ThemeToggle';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-light-background dark:bg-dark-background transition-colors duration-300">
      <header className="w-full flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}