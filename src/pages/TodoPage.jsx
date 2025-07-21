//! File: src/pages/TodoPage.jsx

import Quote from "@/components/todo/Quote"
import TodoHeader from "@/components/todo/TodoHeader"
import TodoList from "@/components/todo/TodoList"
import useAuth from "@/hooks/useAuth"
import useTodos from "@/hooks/useTodos"

const TodoPage = () => {
  const { user } = useAuth();
  const todoFunctions = useTodos(user);
  
  return (
    <section>
        <TodoHeader addTodo={todoFunctions.addTodo} />
        <TodoList 
          todos={todoFunctions.todos}
          toggleCompleteTodo={todoFunctions.toggleCompleteTodo}
          deleteTodo={todoFunctions.deleteTodo}
          editTodo={todoFunctions.editTodo}
        />
        <Quote />
    </section>
  )
}
export default TodoPage
