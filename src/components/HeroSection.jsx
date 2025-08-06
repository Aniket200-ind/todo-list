//! File: src/components/HeroSection.jsx

import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";

const HeroSection = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleSignInClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Layer (optional solid or leave empty) */}
      <div className="absolute inset-0" />
      {/* Floating Dots */}
      {/* Floating dot 1 */}
      <motion.div
        className="absolute top-[25%] left-[10%] w-2 h-2 bg-light-accent/30 dark:bg-dark-accent/30 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />

      {/* Floating dot 2 */}
      <motion.div
        className="absolute top-[30%] right-[12%] w-3 h-3 bg-light-accent/20 dark:bg-dark-accent/20 rounded-full"
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* Floating dot 3 */}
      <motion.div
        className="absolute bottom-[30%] left-[15%] w-1.5 h-1.5 bg-light-accent/40 dark:bg-dark-accent/40 rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Floating dot 4 */}
      <motion.div
        className="absolute bottom-[35%] right-[20%] w-2.5 h-2.5 bg-light-accent/25 dark:bg-dark-accent/25 rounded-full"
        animate={{ x: [0, 12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />

      {/* Blurred Sparkles */}
      <motion.div
        className="absolute top-[20%] left-[55%] w-24 h-24 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[25%] left-[30%] w-32 h-32 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[10%] right-[18%] w-20 h-20 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-light-muted dark:text-dark-muted text-sm md:text-base font-medium tracking-wide">
            DoneIt
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-light-text dark:text-dark-text leading-tight">
            Simple{" "}
            <span className="relative inline-block p-4">
              todo
              {/* Animated Circle SVG */}
              <motion.svg
                className="absolute -inset-0 w-[120%] h-[120%]"
                viewBox="10 10 210 100"
                fill="none"
                initial="hidden"
                animate="visible"
              >
                <motion.ellipse
                  cx="100"
                  cy="50"
                  rx="90"
                  ry="35"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="text-light-accent dark:text-dark-accent"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: {
                        pathLength: { duration: 2, ease: "easeInOut" },
                        opacity: { duration: 0.3 },
                      },
                    },
                  }}
                  style={{
                    rotate: "5deg",
                    transformOrigin: "center",
                  }}
                />
              </motion.svg>
            </span>{" "}
            lists.
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-light-text dark:text-dark-text leading-tight mt-2">
            Minimal and bloat-free.
          </h2>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-light-secondary-text dark:text-dark-secondary-text mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Just the features you expect to focus on what's important.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Try as Guest Button */}
          <button
            onClick={() => navigate("/todo")}
            className="w-full sm:w-auto px-8 py-4 bg-light-accent dark:bg-dark-accent text-light-accent-text dark:text-dark-accent-text font-semibold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-light-accent/30 dark:focus:ring-dark-accent/30 cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <span>✨</span>
              <span>Try as Guest</span>
            </span>
          </button>

          {/* Sign in Button */}
          <button
            onClick={handleSignInClick}
            className="w-full sm:w-auto px-8 py-4 bg-light-secondary-background dark:bg-dark-secondary-background text-light-text dark:text-dark-text font-semibold rounded-2xl border-2 border-light-border dark:border-dark-border transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0 hover:bg-light-background dark:hover:bg-dark-background focus:outline-none focus:ring-4 focus:ring-light-muted/30 dark:focus:ring-dark-muted/30 cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <span>🔐</span>
              <span>Sign in with Google</span>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;
