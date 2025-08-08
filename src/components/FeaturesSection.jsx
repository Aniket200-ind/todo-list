//! File: src/components/FeaturesSection.jsx

import {
  CalendarCheck,
  MoonStar,
  Lock,
  Target,
  CheckSquare,
} from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">

      <div className="absolute inset-0 bg-gradient-to-b from-light-background via-light-secondary-background/30 to-light-background dark:from-dark-background dark:via-dark-secondary-background/20 dark:to-dark-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-light-text dark:text-dark-text mb-6">
            Everything you need.{" "}
            <span className="bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradientx">
              Nothing you don’t.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.1, delay: 0.1 }}
            className="group p-8 bg-light-background dark:bg-dark-secondary-background rounded-2xl border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl dark:hover:shadow-dark-accent/10 transition-all duration-300 cursor-default"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-light-accent/10 dark:bg-dark-accent/10 mb-6 group-hover:bg-light-accent/20 dark:group-hover:bg-dark-accent/20 transition-colors duration-300">
              <CheckSquare className="text-2xl text-light-accent dark:text-dark-accent" />
            </div>

            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
              Effortless Task Editing
            </h3>
            <p className="text-light-secondary-text dark:text-dark-secondary-text leading-relaxed">
              Add, edit, and delete tasks instantly
            </p>
          </motion.article>

          {/* Feature 2: Weekly Progress */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.1, delay: 0.2 }}
            className="group p-8 bg-light-background dark:bg-dark-secondary-background rounded-2xl border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl dark:hover:shadow-dark-accent/10 transition-all duration-300 cursor-default"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-light-accent/10 dark:bg-dark-accent/10 mb-6 group-hover:bg-light-accent/20 dark:group-hover:bg-dark-accent/20 transition-colors duration-300">
              <CalendarCheck className="text-2xl text-light-accent dark:text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
              Weekly Progress
            </h3>
            <p className="text-light-secondary-text dark:text-dark-secondary-text leading-relaxed">
              Track your weekly accomplishments effortlessly
            </p>
          </motion.article>


          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.1, delay: 0.3 }}
            className="group p-8 bg-light-background dark:bg-dark-secondary-background rounded-2xl border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl dark:hover:shadow-dark-accent/10 transition-all duration-300 cursor-default"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-light-accent/10 dark:bg-dark-accent/10 mb-6 group-hover:bg-light-accent/20 dark:group-hover:bg-dark-accent/20 transition-colors duration-300">
              <MoonStar className="text-2xl text-light-accent dark:text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
              Dark Mode
            </h3>
            <p className="text-light-secondary-text dark:text-dark-secondary-text leading-relaxed">
              Supports light and dark themes automatically
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.1, delay: 0.4 }}
            className="group p-8 bg-light-background dark:bg-dark-secondary-background rounded-2xl border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl dark:hover:shadow-dark-accent/10 transition-all duration-300 cursor-default"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-light-accent/10 dark:bg-dark-accent/10 mb-6 group-hover:bg-light-accent/20 dark:group-hover:bg-dark-accent/20 transition-colors duration-300">
              <Lock className="text-2xl text-light-accent dark:text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
              Private Sync
            </h3>
            <p className="text-light-secondary-text dark:text-dark-secondary-text leading-relaxed">
              Log in to sync tasks across devices
            </p>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.1, delay: 0.5 }}
            className="group p-8 bg-gradient-to-br from-light-accent/5 to-light-accent/10 dark:from-dark-accent/5 dark:to-dark-accent/10 rounded-2xl border border-light-accent/20 dark:border-dark-accent/20 shadow-sm hover:shadow-xl dark:hover:shadow-dark-accent/10 transition-all duration-300 cursor-default lg:col-span-2 md:col-span-1"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-light-accent/20 dark:bg-dark-accent/20 mb-6 group-hover:bg-light-accent/30 dark:group-hover:bg-dark-accent/30 transition-colors duration-300">
              <Target className="text-2xl text-light-accent dark:text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
              Focus on Essentials
            </h3>
            <p className="text-light-secondary-text dark:text-dark-secondary-text leading-relaxed">
              No clutter, just pure productivity. Built for those who value
              simplicity and effectiveness.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
