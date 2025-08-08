//! File: src/components/dashboard/DashboardHeader.jsx

import { motion } from "framer-motion";
import {
  ListTodo,
  TrendingUp,
  Clock,
  Calendar,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const DashboardHeader = () => {
  const { user } = useAuth();
  const displayName = user?.displayName?.split(" ")[0] || "User";
  const [currentTime, setCurrentTime] = useState(new Date());

  //* Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-1, 4, -4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-light-accent/5 via-transparent to-light-accent/10 dark:from-dark-accent/10 dark:via-transparent dark:to-dark-accent/5 rounded-2xl" />

      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-6 right-16 opacity-30 dark:opacity-60"
      >
        <Sparkles className="w-6 h-6 text-light-accent dark:text-dark-accent drop-shadow-sm" />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "-1s" }}
        className="absolute bottom-2 left-20 opacity-25 dark:opacity-50"
      >
        <Zap className="w-8 h-8 text-light-accent dark:text-dark-accent drop-shadow-sm" />
      </motion.div>

      <header className="relative px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">

          <motion.div variants={itemVariants} className="space-y-5">
            {/* Date and Time */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-light-muted dark:text-dark-muted text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(currentTime)}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-light-muted dark:bg-dark-muted rounded-full" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>

            {/* Main Welcome */}
            <div>
              <motion.h1
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome back,{" "}
                <motion.span
                  className="bg-gradient-to-r from-light-accent to-light-accent/80 dark:from-dark-accent dark:to-dark-accent/80 bg-clip-text text-transparent font-extrabold"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {displayName}
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-light-secondary-text dark:text-dark-secondary-text text-xs sm:text-lg flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <TrendingUp className="w-5 h-5 text-green-500" />
                Ready to conquer your goals today? Let's make it happen!
              </motion.p>
            </div>
          </motion.div>


          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end lg:mt-10"
          >
            <Link
              to="/todo"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-light-accent dark:bg-dark-accent text-light-accent-text dark:text-dark-accent-text shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ListTodo className="w-5 h-5" />
              <span>Manage Todos</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </header>
    </motion.div>
  );
};

export default DashboardHeader;
