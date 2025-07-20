import React from 'react';
import { motion } from 'framer-motion';

// Base Skeleton Component
const Skeleton = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-light-secondary-background dark:bg-dark-secondary-background rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Shimmer Effect Component
const SkeletonShimmer = ({ className = "", height = "h-4", width = "w-full" }) => {
  return (
    <div className={`${height} ${width} ${className} relative overflow-hidden bg-light-secondary-background dark:bg-dark-secondary-background rounded-lg`}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-light-background/50 dark:via-dark-background/50 to-transparent"
        animate={{
          x: ['100%', '-100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Hero Section Skeleton
const HeroSectionSkeleton = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Floating dots skeleton */}
      <div className="absolute top-[25%] left-[10%] w-2 h-2 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full animate-pulse" />
      <div className="absolute top-[30%] right-[12%] w-3 h-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full animate-pulse" />
      <div className="absolute bottom-[30%] left-[15%] w-1.5 h-1.5 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full animate-pulse" />
      <div className="absolute bottom-[35%] right-[20%] w-2.5 h-2.5 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full animate-pulse" />

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        {/* App name skeleton */}
        <SkeletonShimmer height="h-6" width="w-20 mx-auto" />
        
        {/* Main heading skeleton */}
        <div className="space-y-4">
          <SkeletonShimmer height="h-16 md:h-20 lg:h-24" width="w-full" />
          <SkeletonShimmer height="h-16 md:h-20 lg:h-24" width="w-4/5 mx-auto" />
        </div>
        
        {/* Subheading skeleton */}
        <div className="space-y-2">
          <SkeletonShimmer height="h-6" width="w-3/4 mx-auto" />
          <SkeletonShimmer height="h-6" width="w-1/2 mx-auto" />
        </div>
        
        {/* CTA buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Skeleton className="w-full sm:w-40 h-14 rounded-2xl" />
          <Skeleton className="w-full sm:w-48 h-14 rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

// Features Section Skeleton
const FeaturesSectionSkeleton = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-light-background via-light-secondary-background/30 to-light-background dark:from-dark-background dark:via-dark-secondary-background/20 dark:to-dark-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section header skeleton */}
        <div className="text-center mb-16 space-y-6">
          <div className="space-y-4">
            <SkeletonShimmer height="h-12 md:h-16 lg:h-20" width="w-3/4 mx-auto" />
            <SkeletonShimmer height="h-12 md:h-16 lg:h-20" width="w-1/2 mx-auto" />
          </div>
        </div>

        {/* Features grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Regular feature cards */}
          {[...Array(4)].map((_, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 bg-light-background dark:bg-dark-secondary-background rounded-2xl border border-light-border dark:border-dark-border"
            >
              {/* Icon skeleton */}
              <Skeleton className="w-12 h-12 rounded-xl mb-6" />
              
              {/* Title skeleton */}
              <SkeletonShimmer height="h-6" width="w-3/4" className="mb-3" />
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <SkeletonShimmer height="h-4" width="w-full" />
                <SkeletonShimmer height="h-4" width="w-2/3" />
              </div>
            </motion.article>
          ))}
          
          {/* Large feature card skeleton */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-8 bg-light-accent/5 dark:bg-dark-accent/5 rounded-2xl border border-light-accent/20 dark:border-dark-accent/20 lg:col-span-2 md:col-span-1"
          >
            {/* Icon skeleton */}
            <Skeleton className="w-12 h-12 rounded-xl mb-6 bg-light-accent/10 dark:bg-dark-accent/10" />
            
            {/* Title skeleton */}
            <SkeletonShimmer height="h-6" width="w-1/2" className="mb-3" />
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <SkeletonShimmer height="h-4" width="w-full" />
              <SkeletonShimmer height="h-4" width="w-4/5" />
              <SkeletonShimmer height="h-4" width="w-3/5" />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

// Comparison Section Skeleton
const ComparisonSectionSkeleton = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-light-secondary-background via-light-background to-light-secondary-background dark:from-dark-background dark:via-dark-secondary-background dark:to-dark-background" />
      <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-gradient-to-br from-light-accent/5 via-transparent to-light-accent/5 dark:from-dark-accent/5 dark:via-transparent dark:to-dark-accent/5" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header skeleton */}
        <div className="text-center mb-16 space-y-6">
          <div className="space-y-4">
            <SkeletonShimmer height="h-12 md:h-16 lg:h-20" width="w-2/3 mx-auto" />
            <SkeletonShimmer height="h-6" width="w-1/2 mx-auto" />
          </div>
        </div>

        {/* Main comparison container */}
        <div className="relative flex flex-col lg:flex-row items-stretch min-h-[600px]">
          {/* Left side skeleton (Guest Mode) */}
          <div className="flex-1 px-8 py-12">
            <div className="text-center mb-8 space-y-2">
              <SkeletonShimmer height="h-8" width="w-48 mx-auto" />
              <SkeletonShimmer height="h-5" width="w-36 mx-auto" />
            </div>

            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-light-background dark:bg-dark-secondary-background/80 rounded-2xl p-6 border border-light-border dark:border-dark-border"
                >
                  <div className="text-center space-y-4">
                    <Skeleton className="w-12 h-12 rounded-full mx-auto" />
                    <SkeletonShimmer height="h-4" width="w-20 mx-auto" />
                    <div className="space-y-2">
                      <SkeletonShimmer height="h-3" width="w-full" />
                      <SkeletonShimmer height="h-3" width="w-3/4 mx-auto" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center divider skeleton */}
          <div className="relative flex items-center justify-center">
            <div className="hidden lg:block w-px h-full bg-gradient-to-b from-transparent via-light-border dark:via-dark-border to-transparent absolute" />
            <Skeleton className="relative z-10 w-24 h-24 rounded-full border-4 border-light-border dark:border-dark-border">
              <div className="flex items-center justify-center w-full h-full">
                <SkeletonShimmer height="h-6" width="w-8" />
              </div>
            </Skeleton>
            <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent absolute" />
          </div>

          {/* Right side skeleton (Logged-In Mode) */}
          <div className="flex-1 px-8 py-12">
            <div className="text-center mb-8 space-y-2">
              <SkeletonShimmer height="h-8" width="w-52 mx-auto" />
              <SkeletonShimmer height="h-5" width="w-40 mx-auto" />
            </div>

            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-gradient-to-br from-light-accent/5 to-purple-500/5 dark:from-dark-accent/10 dark:to-purple-400/10 rounded-2xl p-6 border border-light-accent/20 dark:border-dark-accent/30"
                >
                  <div className="text-center space-y-4">
                    <Skeleton className="w-12 h-12 rounded-full mx-auto bg-light-accent/10 dark:bg-dark-accent/10" />
                    <SkeletonShimmer height="h-4" width="w-24 mx-auto" />
                    <div className="space-y-2">
                      <SkeletonShimmer height="h-3" width="w-full" />
                      <SkeletonShimmer height="h-3" width="w-4/5 mx-auto" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA section skeleton */}
        <div className="mt-16 text-center space-y-8">
          <div className="space-y-2">
            <SkeletonShimmer height="h-5" width="w-96 mx-auto" />
            <SkeletonShimmer height="h-5" width="w-72 mx-auto" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Skeleton className="w-full sm:w-44 h-14 rounded-2xl" />
            <Skeleton className="w-full sm:w-52 h-14 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Skeleton
const FooterSkeleton = () => {
  return (
    <footer className="relative bg-light-background dark:bg-dark-secondary-background">
      <div className="h-px bg-gradient-to-r from-transparent via-light-accent/30 to-transparent dark:via-dark-accent/30" />
      
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left section skeleton */}
          <div className="text-center md:text-left space-y-3">
            <SkeletonShimmer height="h-8" width="w-32" />
            <SkeletonShimmer height="h-4" width="w-48" />
            <SkeletonShimmer height="h-3" width="w-40" />
          </div>
          
          {/* Right section skeleton */}
          <div className="flex justify-center md:justify-end gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-light-accent/20 to-transparent dark:via-dark-accent/20" />
    </footer>
  );
};

// Demo Component showing all skeletons
const LoadingSkeleton = () => {
  const [currentSection, setCurrentSection] = React.useState('hero');
  
  const sections = [
    { id: 'hero', name: 'Hero Section', component: <HeroSectionSkeleton /> },
    { id: 'features', name: 'Features Section', component: <FeaturesSectionSkeleton /> },
    { id: 'comparison', name: 'Comparison Section', component: <ComparisonSectionSkeleton /> },
    { id: 'footer', name: 'Footer', component: <FooterSkeleton /> }
  ];
  
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
      {/* Theme toggle and section selector */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        <div className="bg-light-background dark:bg-dark-secondary-background border border-light-border dark:border-dark-border rounded-lg p-2">
          <select 
            value={currentSection} 
            onChange={(e) => setCurrentSection(e.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            {sections.map(section => (
              <option key={section.id} value={section.id}>{section.name}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={() => {
            document.documentElement.classList.toggle('dark');
          }}
          className="w-full px-3 py-2 bg-light-secondary-background dark:bg-dark-secondary-background hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 border border-light-border dark:border-dark-border rounded-lg text-xs transition-colors"
        >
          Toggle Theme
        </button>
      </div>
      
      {/* Current skeleton */}
      {sections.find(s => s.id === currentSection)?.component}
    </div>
  );
};

export default LoadingSkeleton;

export {
    HeroSectionSkeleton,
    FeaturesSectionSkeleton,
    ComparisonSectionSkeleton,
    FooterSkeleton,
}