import React from "react";
import { TodoModel } from "@/types/todo";
import  Todo from "../Todo/page"

interface TodoListProps {
    todos: TodoModel[];
}

export default function TodoList({todos}: TodoListProps) {
  return (
    <>
      <div className="text-blue-500 mr-3">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
      )
}