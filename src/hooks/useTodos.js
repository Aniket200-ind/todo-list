//! File: src/hooks/useTodos.js

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";

export default function useTodos(user) {
  const [todos, setTodos] = useState([]);

  // Helper for guest user state and localStorage updates
  const updateGuestTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  useEffect(() => {
    if (user === null) {
      const stored = localStorage.getItem("todos");
      setTodos(stored ? JSON.parse(stored) : []);

      // Set up a storage event listener to sync across tabs
      const handleStorageChange = (e) => {
        if (e.key === "todos") {
          setTodos(JSON.parse(e.newValue || "[]"));
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    } else {
      // For logged-in users
      const todosRef = collection(db, "users", user.uid, "todos");
      const unsubscribe = onSnapshot(
        todosRef,
        (snapshot) => {
          const todosFromFirestore = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todosFromFirestore);
        },
        (error) => {
          console.error("Error listening to todos from Firestore:", error);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  const addTodo = useCallback(
    async (title, description = "") => {
      if (!title.trim()) return;
      const newTodo = {
        title,
        description,
        completed: false,
        createdDate: format(new Date(), "yyyy-MM-dd"),
      };

      if (user) {
        try {
          const addPromise = addDoc(collection(db, "users", user.uid, "todos"), {
          ...newTodo,
          createdAt: serverTimestamp(),
        });

           const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network timeout")), 8000)
        );
        
        await Promise.race([addPromise, timeoutPromise]);
        } catch (error) {
          console.error("Error adding todo to Firestore:", error);
          throw error;
        }
      } else {
        const guestTodo = {
          ...newTodo,
          id: crypto.randomUUID(),
        };
        updateGuestTodos([...todos, guestTodo]);
      }
    },
    [user, todos]
  );

  const toggleCompleteTodo = useCallback(
    async (id) => {
      const todoToToggle = todos.find((t) => t.id === id);
      if (!todoToToggle) {
        console.error("Todo not found for toggling:", id);
        return;
      }

      const newCompletedStatus = !todoToToggle.completed;
      const updatedFields = {
        completed: newCompletedStatus,
        completedAt: newCompletedStatus
          ? format(new Date(), "yyyy-MM-dd")
          : null,
      };

      if (user) {
        const todoRef = doc(db, "users", user.uid, "todos", id);
        try {
          await updateDoc(todoRef, updatedFields);
        } catch (error) {
          console.error("Error toggling todo in Firestore:", error);
          throw error;
        }
      } else {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedFields } : todo
        );
        updateGuestTodos(updatedTodos);
      }
    },
    [user, todos]
  );

  const editTodo = useCallback(
    async (id, updatedFields) => {
      if (user) {
        const todoRef = doc(db, "users", user.uid, "todos", id);
        try {
          await updateDoc(todoRef, updatedFields);
        } catch (error) {
          console.error("Error updating todo in Firestore:", error);
          throw error;
        }
      } else {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedFields } : todo
        );
        updateGuestTodos(updatedTodos);
      }
    },
    [user, todos]
  );

  const deleteTodo = useCallback(
    async (id) => {
      if (user) {
        const todoRef = doc(db, "users", user.uid, "todos", id);
        try {
          await deleteDoc(todoRef);
        } catch (error) {
          console.error("Error deleting todo from Firestore:", error);
          throw error;
        }
      } else {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        updateGuestTodos(updatedTodos);
      }
    },
    [user, todos]
  );

  return { todos, addTodo, toggleCompleteTodo, deleteTodo, editTodo };
}
