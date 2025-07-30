//! File: src/components/todo/TodoItem.jsx

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Pencil, Save } from "lucide-react"
import { toast } from "sonner"

const TodoItem = ({ todo, toggleCompleteTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || "")
  const [isUpdating, setIsUpdating] = useState(false)

  //* Toggle completion status
  const handleToggleComplete = async () => {
    if (isUpdating) return
    setIsUpdating(true)
    try {
      await toggleCompleteTodo(todo.id)
      toast.success(todo.completed ? "Task marked as incomplete" : "Task completed! 🎉")
    } catch (error) {
      console.error('Error toggling todo:', error)
      toast.error("Failed to update task")
    } finally {
      setIsUpdating(false)
    }
  }

  //* Save edited todo
  const handleSave = async () => {
    if (!editTitle.trim()) {
      toast.error("Task title cannot be empty")
      return
    }
    if (isUpdating) return
    
    setIsUpdating(true)
    try {
      await editTodo(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      })
      setIsEditing(false)
      toast.success("Task updated successfully")
    } catch (error) {
      console.error('Error updating todo:', error)
      toast.error("Failed to update task")
    } finally {
      setIsUpdating(false)
    }
  } 

  //* Cancel editing
  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || "")
    setIsEditing(false)
  } 

  //* Delete todo
  const handleDelete = async () => {
    if (isUpdating) return
    setIsUpdating(true)
    try {
      await deleteTodo(todo.id)
      toast.success("Task deleted successfully")
    } catch (error) {
      console.error('Error deleting todo:', error)
      toast.error("Failed to delete task")
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: todo.completed ? 0.98 : 1
      }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="p-4 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <motion.button
          onClick={handleToggleComplete}
          disabled={isUpdating || isEditing}
          whileTap={{ scale: 0.9 }}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed 
              ? "bg-light-accent dark:bg-dark-accent border-light-accent dark:border-dark-accent text-white" 
              : "border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent"
          } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isUpdating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 border border-current border-t-transparent rounded-full"
            />
          ) : (
            <AnimatePresence mode="wait">
              {todo.completed && (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                  <Check className="w-3 h-3" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            // Edit Mode
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 bg-light-secondary-background dark:bg-dark-secondary-background text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                autoFocus
                disabled={isUpdating}
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add description (optional)"
                rows={2}
                className="w-full px-3 py-2 bg-light-secondary-background dark:bg-dark-secondary-background text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent resize-none"
                disabled={isUpdating}
              />
            </div>
          ) : (
            // View Mode
            <div>
              <motion.h3 
                animate={{
                  opacity: todo.completed ? 0.6 : 1
                }}
                transition={{ duration: 0.2 }}
                className={`font-medium ${
                  todo.completed 
                    ? "line-through text-light-muted dark:text-dark-muted" 
                    : "text-light-text dark:text-dark-text"
                }`}
              >
                {todo.title}
              </motion.h3>
              {todo.description && (
                <motion.p 
                  animate={{
                    opacity: todo.completed ? 0.5 : 0.8
                  }}
                  transition={{ duration: 0.2 }}
                  className={`mt-1 text-sm ${
                    todo.completed 
                      ? "line-through text-light-muted dark:text-dark-muted" 
                      : "text-light-secondary-text dark:text-dark-secondary-text"
                  }`}
                >
                  {todo.description}
                </motion.p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <motion.button
                onClick={handleSave}
                disabled={!editTitle.trim() || isUpdating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleCancel}
                disabled={isUpdating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-light-secondary-text dark:text-dark-secondary-text hover:bg-light-secondary-background dark:hover:bg-dark-secondary-background rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                onClick={() => setIsEditing(true)}
                disabled={isUpdating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-light-secondary-text dark:text-dark-secondary-text hover:text-light-accent dark:hover:text-dark-accent hover:bg-light-secondary-background dark:hover:bg-dark-secondary-background rounded-lg transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleDelete}
                disabled={isUpdating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TodoItem
