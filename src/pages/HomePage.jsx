//! File: src/pages/HomePage.jsx

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import LoadingSkeleton from "@/components/Skeleton";
import {
  HeroSectionSkeleton,
  FeaturesSectionSkeleton,
  ComparisonSectionSkeleton,
  FooterSkeleton,
} from "@/components/Skeleton";

export function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const HeroSection = lazy(() => import("../components/HeroSection"));
  const FeaturesSection = lazy(() => import("../components/FeaturesSection"));
  const ComparisonSection = lazy(() =>
    import("@/components/ComparisonSection")
  );
  const Footer = lazy(() => import("../components/Footer"));

  return (
    <div>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<FeaturesSectionSkeleton />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<ComparisonSectionSkeleton />}>
        <ComparisonSection />
      </Suspense>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-light-secondary-background dark:bg-dark-secondary-background border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent hover:text-light-accent dark:hover:text-dark-accent transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}
