//! File: src/components/dashboard/Stats.jsx

import { motion } from "framer-motion";
import { ListTodo, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import useTaskStats from "@/hooks/useTaskStats";


const Stats = () => {
  const stats = useTaskStats();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

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

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Section header */}
      <motion.div variants={cardVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate="animate"
            className="p-2 rounded-lg bg-light-accent/10 dark:bg-dark-accent/10"
          >
            <BarChart3 className="w-5 h-5 text-light-accent dark:text-dark-accent" />
          </motion.div>
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
            Task Overview
          </h2>
        </div>
        <p className="text-light-secondary-text dark:text-dark-secondary-text">
          Track your productivity and progress at a glance.
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={ListTodo}
          bgColor="bg-blue-500/10 dark:bg-blue-400/10"
          iconColor="text-blue-600 dark:text-blue-400"
          accentColor="bg-blue-500"
          trend={`+${stats.addedToday} today`}
          delay={0}
        />

        <StatCard
          title="Completed Tasks"
          value={stats.completed}
          icon={CheckCircle2}
          bgColor="bg-green-500/10 dark:bg-green-400/10"
          iconColor="text-green-600 dark:text-green-400"
          accentColor="bg-green-500"
          trend={`+${stats.completedThisWeek} this week`}
          delay={0.15}
        />

        <StatCard
          title="Pending Tasks"
          value={stats.pending}
          icon={Clock}
          bgColor="bg-orange-500/10 dark:bg-orange-400/10"
          iconColor="text-orange-600 dark:text-orange-400"
          accentColor="bg-orange-500"
          delay={0.3}
        />
      </div>
    </motion.section>
  );
};

export default Stats;
