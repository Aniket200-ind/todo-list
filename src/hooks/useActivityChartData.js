//! File: src/hooks/useActivityChartData.js

import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek, format, eachDayOfInterval } from "date-fns";
import useAuth from "./useAuth";

export default function useActivityChartData(weekOffset = 0) {
  const { user, loading } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user || loading) return;

    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + weekOffset * 7);

    const start = startOfWeek(baseDate, { weekStartsOn: 1 });
    const end = endOfWeek(baseDate, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start, end });
    const formattedDays = days.map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE"), // "Mon", "Tue" format
    }));

    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "todos"),
      (snapshot) => {
        const dayCounts = {};

        // Initialize count for each day
        formattedDays.forEach((d) => {
          dayCounts[d.date] = 0;
        });

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const completedAt = data.completedAt;

          if (
            completedAt &&
            completedAt >= format(start, "yyyy-MM-dd") &&
            completedAt <= format(end, "yyyy-MM-dd")
          ) {
            dayCounts[completedAt] += 1;
          }
        });

        // Final data for chart
        const chartData = formattedDays.map((d) => ({
          day: d.label,
          count: dayCounts[d.date] || 0,
        }));

        setData(chartData);
      }
    );

    return unsubscribe;
  }, [user, loading, weekOffset]);

  return data;
}
