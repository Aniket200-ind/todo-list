//! File: src/hooks/useTaskStats.js

import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { endOfWeek, format, startOfWeek } from "date-fns";

export default function useTaskStats() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    addedToday: 0,
    completedThisWeek: 0,
  });

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user || loading) return;

    const todosRef = collection(db, "users", user.uid, "todos");

    const today = format(new Date(), "yyyy-MM-dd");
    const weekStart = format(
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      "yyyy-MM-dd"
    );
    const weekEnd = format(
      endOfWeek(new Date(), { weekStartsOn: 1 }),
      "yyyy-MM-dd"
    );

    const unsubscribe = onSnapshot(todosRef, (snapshot) => {
      const completedTasks = snapshot.docs.filter(
        (doc) => doc.data().completed
      );
      const pendingTasks = snapshot.size - completedTasks.length;

      const tasksAddedToday = snapshot.docs.filter(
        (doc) => doc.data().createdDate === today
      );

      const tasksCompletedWithinWeek = snapshot.docs.filter((doc) => {
        const completedDate = doc.data().completedAt;
        return completedDate >= weekStart && completedDate <= weekEnd;
      });

      setStats({
        total: snapshot.size,
        completed: completedTasks.length,
        pending: pendingTasks,
        addedToday: tasksAddedToday.length,
        completedThisWeek: tasksCompletedWithinWeek.length,
      });
    });

    return unsubscribe;
  }, [user, loading]);

  return stats;
}
