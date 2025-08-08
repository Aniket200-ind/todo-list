//! File: src/ components/Footer.jsx

import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-light-background dark:bg-dark-secondary-background sm:p-3">
      {/* Top accent border */}
      <div className="h-px bg-gradient-to-r from-transparent via-light-accent/30 to-transparent dark:via-dark-accent/30" />

      <div className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section - App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left space-y-3"
          >
            {/* App Name */}
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 bg-clip-text text-transparent">
              DoneIt
            </h3>

            {/* Tagline */}
            <p className="text-sm text-light-secondary-text dark:text-dark-secondary-text">
              Built with ❤️ by Aniket.
            </p>

            {/* Copyright */}
            <p className="text-xs text-light-muted dark:text-dark-muted">
              © {currentYear} DoneIt.
            </p>
          </motion.div>

          {/* Right Section - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center md:justify-end gap-4"
          >
            {/* GitHub */}
            <a
              href="https://github.com/Aniket200-ind"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-light-secondary-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent hover:text-light-accent dark:hover:text-dark-accent transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20"
              aria-label="Visit GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/aniketbotre"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-light-secondary-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent hover:text-light-accent dark:hover:text-dark-accent transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20"
              aria-label="Visit LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient border */}
      <hr className="h-px bg-gradient-to-r from-transparent via-light-accent/20 to-transparent dark:via-dark-accent/20" />
    </footer>
  );
};
export default Footer;
