//! File: src/components/dashboard/StatCard.jsx

import CountUp from "@/components/Countup";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  bgColor,
  icon: Icon,
  iconColor,
  trend,
  delay = 0,
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        damping: 15,
      },
    },
  };

  const iconBounce = {
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowPulse = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Background glow effect */}
      <motion.div
        variants={glowPulse}
        animate="animate"
        className={`absolute inset-0 ${bgColor} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
        style={{ animationDelay: `${delay * 0.5}s` }}
      />

      {/* Main card */}
      <div className="relative bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-light-secondary-background/30 dark:to-dark-secondary-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative space-y-4">

          <div className="flex items-center justify-between">
            <motion.div
              variants={iconBounce}
              animate="animate"
              className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}
              style={{ animationDelay: `${delay * 0.2}s` }}
            >
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </motion.div>

            {trend && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.3, duration: 0.5 }}
                className="flex items-center gap-1 text-sm font-medium text-green-500"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{trend}</span>
              </motion.div>
            )}
          </div>

          <motion.div
            variants={numberVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: delay + 0.4 }}
          >
            <h3 className="text-4xl sm:text-5xl font-bold text-light-text dark:text-dark-text mb-2 font-mono tracking-tight">
              <CountUp to={value} delay={delay + 0.6} duration={1.2} />
            </h3>
          </motion.div>

          <div className="space-y-1">
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.6, duration: 0.5 }}
              className="text-lg font-semibold text-light-text dark:text-dark-text"
            >
              {title}
            </motion.h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
