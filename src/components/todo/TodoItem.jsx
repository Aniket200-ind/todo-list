//! File: src/components/todo/TodoItem.jsx

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, Edit3, Save } from "lucide-react"
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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={isUpdating || isEditing}
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
            todo.completed && <Check className="w-3 h-3" />
          )}
        </button>

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
              <h3 className={`font-medium ${
                todo.completed 
                  ? "line-through text-light-muted dark:text-dark-muted" 
                  : "text-light-text dark:text-dark-text"
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`mt-1 text-sm ${
                  todo.completed 
                    ? "line-through text-light-muted dark:text-dark-muted" 
                    : "text-light-secondary-text dark:text-dark-secondary-text"
                }`}>
                  {todo.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={!editTitle.trim() || isUpdating}
                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className="p-2 text-light-secondary-text dark:text-dark-secondary-text hover:bg-light-secondary-background dark:hover:bg-dark-secondary-background rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={isUpdating}
                className="p-2 text-light-secondary-text dark:text-dark-secondary-text hover:text-light-accent dark:hover:text-dark-accent hover:bg-light-secondary-background dark:hover:bg-dark-secondary-background rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isUpdating}
                className="p-2 text-light-secondary-text dark:text-dark-secondary-text hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TodoItem
