import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import useActivityChartData from "@/hooks/useActivityChartData";

const ActivityChart = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const data = useActivityChartData(weekOffset);

  //* Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const goToPreviousWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };

  const goToNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
  };

  const getWeekText = () => {
    if (weekOffset === 0) return "This Week";
    if (weekOffset === -1) return "Last Week";
    if (weekOffset === 1) return "Next Week";
    if (weekOffset < 0) return `${Math.abs(weekOffset)} weeks ago`;
    return `${weekOffset} weeks ahead`;
  };

  const maxCount = Math.max(...data.map((d) => d.count));

  const barColor = isDark ? "#818cf8" : "#6366f1";
  const textColor = isDark ? "#64748b" : "#9ca3af";

  return (
    <motion.div
      className="bg-[var(--color-light-background)] dark:bg-[var(--color-dark-secondary-background)] border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--color-light-accent)]/20 dark:bg-[var(--color-dark-accent)]/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-[var(--color-light-accent)] dark:text-[var(--color-dark-accent)]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-light-text)] dark:text-[var(--color-dark-text)]">
              Activities
            </h3>
            <p className="text-sm text-[var(--color-light-muted)] dark:text-[var(--color-dark-muted)]">
              {getWeekText()}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={goToPreviousWeek}
            className="p-2 rounded-lg bg-[var(--color-light-secondary-background)] dark:bg-[var(--color-dark-background)]/50 hover:bg-[var(--color-light-border)] dark:hover:bg-[var(--color-dark-border)]/50 border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4 text-[var(--color-light-secondary-text)] dark:text-[var(--color-dark-secondary-text)]" />
          </motion.button>

          <motion.button
            onClick={goToNextWeek}
            disabled={weekOffset >= 0}
            className="p-2 rounded-lg bg-[var(--color-light-secondary-background)] dark:bg-[var(--color-dark-background)]/50 hover:bg-[var(--color-light-border)] dark:hover:bg-[var(--color-dark-border)]/50 border border-[var(--color-light-border)] dark:border-[var(--color-dark-border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: weekOffset < 0 ? 1.05 : 1 }}
            whileTap={{ scale: weekOffset < 0 ? 0.95 : 1 }}
          >
            <ChevronRight className="w-4 h-4 text-[var(--color-light-secondary-text)] dark:text-[var(--color-dark-secondary-text)]" />
          </motion.button>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        className="h-32"
        key={weekOffset}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: textColor,
              }}
              dy={8}
            />
            <YAxis hide />
            <Bar
              dataKey="count"
              fill={barColor}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-light-border dark:border-dark-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-light-accent dark:bg-dark-accent rounded-sm"></div>
          <span className="text-sm text-light-muted dark:text-dark-muted">
            Tasks completed
          </span>
        </div>
        <div className="text-sm text-light-muted dark:text-dark-muted">
          Peak: {maxCount} {maxCount === 1 ? "task" : "tasks"}
        </div>
      </div>
    </motion.div>
  );
};

const ThemedBar = ({ fill, ...props }) => {
  return (
    <Bar
      {...props}
      fill="var(--color-light-accent)"
      style={{
        fill: "var(--color-light-accent)",
      }}
    />
  );
};

export default ActivityChart;
