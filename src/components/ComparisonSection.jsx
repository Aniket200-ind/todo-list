//! File: src/components/ComparisonSection.jsx

import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const ComparisonSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignInClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const loggedInModeFeatures = [
    {
      icon: "🚀",
      label: "AIM",
      desc: "Complete productivity solution for committed users seeking advanced features.",
    },
    {
      icon: "☁️",
      label: "APPLICATION",
      desc: "To comprehensive task management that users can rely on daily.",
    },
    {
      icon: "🎯",
      label: "FOCUS",
      desc: "On user's long-term productivity when using the service across devices.",
    },
    {
      icon: "🔄",
      label: "KEY ELEMENTS",
      desc: "Cloud sync, Data persistence, Cross-device access, User accounts.",
    },
  ];

  const guestModeFeatures = [
    {
      icon: "🎯",
      label: "AIM",
      desc: "Quick testing and immediate task management without setup barriers.",
    },
    {
      icon: "📱",
      label: "APPLICATION",
      desc: "To browser-based todo tasks only.",
    },
    {
      icon: "🎨",
      label: "FOCUS",
      desc: "On instant accessibility and zero-friction user onboarding experience.",
    },
    {
      icon: "⚡",
      label: "KEY ELEMENTS",
      desc: "LocalStorage, Browser data, Instant access, Temporary usage.",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Dynamic background that adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-secondary-background via-light-background to-light-secondary-background dark:from-dark-background dark:via-dark-secondary-background dark:to-dark-background" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-gradient-to-br from-light-accent/5 via-transparent to-light-accent/5 dark:from-dark-accent/5 dark:via-transparent dark:to-dark-accent/5" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
            Choose your{" "}
            <span className="bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 bg-clip-text text-transparent">
              experience
            </span>
          </h2>
          <p className="text-lg text-light-secondary-text dark:text-dark-secondary-text max-w-2xl mx-auto">
            Start as a guest or sign in for the full experience
          </p>
        </motion.div>

        {/* Main Comparison Container */}
        <div className="relative flex flex-col lg:flex-row items-stretch min-h-[600px]">
          {/* Left Side - Guest Mode */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 px-8 py-12 relative"
          >
            {/* Guest Mode Header */}
            <aside className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                GUEST MODE
              </h3>
              <p className="text-light-secondary-text dark:text-dark-secondary-text">
                Quick start, no commitment
              </p>
            </aside>

            {/* Guest Mode Cards */}
            <div className="space-y-6">
              {guestModeFeatures.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-light-background dark:bg-dark-secondary-background/80 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 hover:bg-light-secondary-background dark:hover:bg-dark-secondary-background transition-all duration-300 shadow-sm hover:shadow-lg dark:hover:shadow-dark-accent/10"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-light-secondary-background dark:bg-dark-background rounded-full flex items-center justify-center mx-auto mb-4 border border-light-border dark:border-dark-border">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <h4 className="text-light-text dark:text-dark-text font-bold font-mono tracking-wide text-sm uppercase mb-3">
                      {item.label}
                    </h4>
                    <p className="text-light-secondary-text dark:text-dark-secondary-text text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Center Divider with VS */}
          <div className="relative flex items-center justify-center">
            {/* Vertical Line */}
            <div className="hidden lg:block w-px h-full bg-gradient-to-b from-transparent via-light-border dark:via-dark-border to-transparent absolute"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                bounce: 0.4,
              }}
              className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center border-4 border-light-border dark:border-dark-border bg-light-background dark:bg-dark-secondary-background shadow-lg dark:shadow-dark-accent/20"
              aria-label="Comparison divider"
            >
              {/* Glow behind */}
              <div className="absolute inset-0 flex items-center justify-center z-[-1]">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 opacity-30 blur-2xl animate-pulseglow" />
              </div>

              {/* VS Text */}
              <span className="text-2xl font-bold bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 bg-clip-text text-transparent">
                VS
              </span>
            </motion.div>

            {/* Horizontal Line for mobile */}
            <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent absolute"></div>
          </div>

          {/* Right Side - Logged-In Mode */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 px-8 py-12 relative"
          >
            {/* Logged-In Header */}
            <aside className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                LOGGED-IN MODE
              </h3>
              <p className="text-light-secondary-text dark:text-dark-secondary-text">
                Full-featured experience
              </p>
            </aside>

            {/* Logged-In Mode Cards */}
            <div className="space-y-6">
              {loggedInModeFeatures.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-light-accent/5 to-purple-500/5 dark:from-dark-accent/10 dark:to-purple-400/10 backdrop-blur-sm border border-light-accent/20 dark:border-dark-accent/30 rounded-2xl p-6 hover:from-light-accent/10 hover:to-purple-500/10 dark:hover:from-dark-accent/15 dark:hover:to-purple-400/15 transition-all duration-300 shadow-sm hover:shadow-lg dark:hover:shadow-dark-accent/20"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <h4 className="text-light-text dark:text-dark-text font-bold text-sm font-mono tracking-wide uppercase mb-3">
                      {item.label}
                    </h4>
                    <p className="text-light-secondary-text dark:text-dark-secondary-text text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-light-secondary-text dark:text-dark-secondary-text mb-8 max-w-md mx-auto">
            You can always start as a guest and sign in later to upgrade your
            experience
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Try Guest Mode */}
            <button
              onClick={() => navigate("/todo")}
              className="w-full sm:w-auto px-8 py-4 bg-light-secondary-background dark:bg-dark-secondary-background hover:bg-light-background dark:hover:bg-dark-background text-light-text dark:text-dark-text font-semibold rounded-2xl border border-light-border dark:border-dark-border transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-light-muted/30 dark:focus:ring-dark-muted/30 cursor-pointer"
              aria-label="Try Guest Mode"
            >
              <span className="flex items-center justify-center gap-2">
                <span>🧪</span>
                <span>Try Guest Mode</span>
              </span>
            </button>

            {/* Sign In */}
            <button
              onClick={handleSignInClick}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-light-accent to-purple-500 dark:from-dark-accent dark:to-purple-400 hover:from-light-accent/90 hover:to-purple-500/90 dark:hover:from-dark-accent/90 dark:hover:to-purple-400/90 text-light-accent-text dark:text-dark-accent-text font-semibold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-light-accent/30 dark:focus:ring-dark-accent/30 cursor-pointer"
              aria-label="Sign In with Google"
            >
              <span className="flex items-center justify-center gap-2">
                <span>🔐</span>
                <span>Sign In with Google</span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default ComparisonSection;
