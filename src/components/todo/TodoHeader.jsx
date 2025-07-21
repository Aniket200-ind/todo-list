//! File: src/components/todo/TodoHeader.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown, Sparkles } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const TodoHeader = ({ addTodo }) => {
  const { user, loading } = useAuth();
  const displayName = user?.displayName?.split(" ")[0] || "Guest";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!title.trim() || isAdding) return;
    
    setIsAdding(true);
  
  try {
    await addTodo(title, description);
    setTitle("");
    setDescription("");
    setShowDescription(false);
    toast.success("New task added successfully✅");
  } catch (error) {
    console.error('Failed to add todo:', error);
    toast.error("Failed to add task. Please try again.");
  } finally {
    setIsAdding(false); // ← Always reset loading state
  }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
};


  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-6 sm:mb-8"
      >
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          👋 Welcome back, {loading ? (
    <span className="inline-block relative">
      <span className="invisible">Guest</span>
      <span className="absolute inset-0 bg-light-border dark:bg-dark-border rounded animate-pulse"></span>
    </span>
  ) : (
    displayName
  )}!
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg text-light-secondary-text dark:text-dark-secondary-text flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-light-accent dark:text-dark-accent" />
          Let's organize your day with a new task
        </motion.p>
      </motion.div>

      {/* Add Task Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-lg mx-auto"
      >
        {/* Main Input Row */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3 mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add task title..."
              className="w-full px-4 py-3 bg-light-secondary-background dark:bg-dark-secondary-background text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200"
            />
            
            <motion.button
              onClick={handleAdd}
              disabled={!title.trim() || isAdding}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full sm:w-auto sm:min-w-[3rem] px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                title.trim() && !isAdding
                  ? "bg-light-accent dark:bg-dark-accent text-light-accent-text dark:text-dark-accent-text shadow-md hover:shadow-lg"
                  : "bg-light-muted dark:bg-dark-muted text-light-background dark:text-dark-background cursor-not-allowed"
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : (
                  <motion.div
                    key="plus"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

        {/* Description Toggle */}
        <motion.button
          onClick={toggleDescription}
          className="flex items-center gap-2 text-sm text-light-secondary-text dark:text-dark-secondary-text hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200 mb-2"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-sm font-medium">Optional: Add description</span>
          <motion.div
            animate={{ rotate: showDescription ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Description Input */}
        <AnimatePresence>
          {showDescription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add task description (optional)..."
                rows={3}
                className="w-full px-4 py-3 bg-light-secondary-background dark:bg-dark-secondary-background text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition-all duration-200 resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TodoHeader;
