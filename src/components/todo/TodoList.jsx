//! File: src/components/todo/TodoList.jsx

import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Funnel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleCompleteTodo, deleteTodo, editTodo }) => {

  const [filter, setFilter] = useState("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "all":
        return todos;
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "pending": // ✅ Changed from "incomplete" to "pending" to match dropdown
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  return (
    <motion.div
      className="px-4 sm:px-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header with Filter */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div>
          <motion.h2
            className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            Your Tasks
          </motion.h2>
          <motion.p
            className="text-sm text-light-secondary-text dark:text-dark-secondary-text mt-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${filteredTodos.length}-${filter}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {filteredTodos.length} {filter === "all" ? "total" : filter}{" "}
                tasks
              </motion.span>
            </AnimatePresence>
          </motion.p>
        </div>

        {/* Filter Dropdown with Animation */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeInOut" }}
          >
            <Funnel className="w-4 h-4 text-light-secondary-text dark:text-dark-secondary-text" />
          </motion.div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32 sm:w-36 h-9 bg-light-secondary-background dark:bg-dark-secondary-background border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-200 hover:bg-light-background dark:hover:bg-dark-background">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border">
              <SelectItem
                value="all"
                className="text-light-text dark:text-dark-text focus:bg-light-secondary-background dark:focus:bg-dark-secondary-background focus:text-light-accent dark:focus:text-dark-accent transition-colors duration-150"
              >
                All Tasks
              </SelectItem>
              <SelectItem
                value="pending"
                className="text-light-text dark:text-dark-text focus:bg-light-secondary-background dark:focus:bg-dark-secondary-background focus:text-light-accent dark:focus:text-dark-accent transition-colors duration-150"
              >
                Pending
              </SelectItem>
              <SelectItem
                value="completed"
                className="text-light-text dark:text-dark-text focus:bg-light-secondary-background dark:focus:bg-dark-secondary-background focus:text-light-accent dark:focus:text-dark-accent transition-colors duration-150"
              >
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </motion.div>

      {/* Todo Items Container */}
      <motion.div className="space-y-3" layout transition={{ duration: 0.3 }}>
        <AnimatePresence mode="wait">
          {filteredTodos.length === 0 ? (
            <motion.div
              key="empty-state"
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-light-secondary-text dark:text-dark-secondary-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {filter === "all"
                  ? "No tasks yet. Add one above to get started!"
                  : `No ${filter} tasks found.`}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="todo-items"
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleCompleteTodo={toggleCompleteTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
export default TodoList;
