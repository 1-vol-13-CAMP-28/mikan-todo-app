import React from "react";
import AddTodo from "../app/components/AddTodo/page"
import TodoList from "../app/components/TodoList/page"
import { get_all_todos } from "../api/TodoApi";



export default async function Page_tasks() {
  const allTodos = await get_all_todos();
  console.log(allTodos)
  
  const doneTodos = allTodos.filter(todo => todo.done);
  const yetTodos = allTodos.filter(todo => !todo.done);
  return (
    <main>
      <>
      <div className="flex">
        <div className="flex-initial">
            <h1>未完了のタスク</h1>
                <TodoList key={"yet"} todos={yetTodos}/>
        </div>
        <div className="flex-initial">
            <h1>完了したタスク</h1>
            <TodoList key={"done"}todos={doneTodos}/>
        </div>
      </div>
        <AddTodo />
        </>
    </main>

  )
}
