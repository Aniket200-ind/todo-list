import { db } from "@/lib/firebase";
import {
  collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, onSnapshot,
} from "firebase/firestore";

import { format } from "date-fns";
import { useState, useEffect } from "react";

export default function useTodos(user) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user === null) {
      // For guest users, use localStorage
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
      // For logged-in users, set up a real-time listener
      const todosRef = collection(db, "users", user.uid, "todos");
      const unsubscribe = onSnapshot(todosRef, (snapshot) => {
        const todosFromFirestore = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosFromFirestore);
      }, (error) => {
        console.error("Error listening to todos:", error);
      });
      
      // Clean up listener on unmount
      return () => unsubscribe();
    }
  }, [user]);

 const addTodo = async (title, description = "") => {
  if (!title.trim()) return;
  const newTodo = {
    title, 
    description, 
    completed: false,
    createdDate: format(new Date(), "yyyy-MM-dd"),
  };
  
  if (user) {
    try {
      // Don't need to update state manually, onSnapshot will handle it
      await addDoc(
        collection(db, "users", user.uid, "todos"),
        { ...newTodo, createdAt: serverTimestamp() }
      );
    } catch (error) {
      console.error("Error adding todo to Firestore:", error);
      throw error;
    }
  } else {
    // For guest users
    const guestTodo = {
      ...newTodo,
      id: crypto.randomUUID()
    };
    const updatedTodos = [...todos, guestTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
};

const toggleCompleteTodo = async (id) => {
  try {
    if (user) {
      // For logged-in users, just update Firestore and let onSnapshot update state
      const todoRef = doc(db, "users", user.uid, "todos", id);
      
      try {
        // Find the todo in the current state
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        
        await updateDoc(todoRef, {
          completed: !todo.completed,
          completedAt: !todo.completed ? format(new Date(), "yyyy-MM-dd") : null
        });
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    } else {
      // For guest users
      const updatedTodos = todos.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed,
              completedAt: !todo.completed ? format(new Date(), "yyyy-MM-dd") : null
            } 
          : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
};

const editTodo = async (id, updatedFields) => {
  try {
    if (user) {
      // For logged-in users, just update Firestore and let onSnapshot update state
      const todoRef = doc(db, "users", user.uid, "todos", id);
      
      try {
        await updateDoc(todoRef, updatedFields);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      // For guest users
      const updatedTodos = todos.map(todo => 
        todo.id === id ? { ...todo, ...updatedFields } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const deleteTodo = async (id) => {
  try {
    if (user) {
      // For logged-in users, just delete from Firestore and let onSnapshot update state
      const todoRef = doc(db, "users", user.uid, "todos", id);
      
      try {
        await deleteDoc(todoRef);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    } else {
      // For guest users
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

  return { todos, addTodo, toggleCompleteTodo, deleteTodo, editTodo };
}
