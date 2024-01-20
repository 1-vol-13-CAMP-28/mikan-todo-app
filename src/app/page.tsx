'use client'
import React, {useContext, useEffect, useState} from "react";
import AddTodo from "../app/components/AddTodo/page"
import TodoList from "../app/components/TodoList/page"
import {get_all_todos} from "../api/TodoApi";
import {TodoContext} from "./todoHandlerContext";
import {TodoProvider} from "./todoProvider";

export default function App() {
  return (
    <TodoProvider>
      <Home/>
    </TodoProvider>
  );
}

export function Home() {
  const { allTodo: allTodoFromProvider, setAllTodo } = useContext(TodoContext);
  const [ allTodo, setAllTodoLocal ] = useState([]);

  useEffect(() => {
    get_all_todos().then((todos) => {
      setAllTodoLocal(todos);
      console.log("todo fetched")
    });
  }, []);

  useEffect(() => {
    setAllTodoLocal(allTodoFromProvider);
  }, [allTodoFromProvider]);

  useEffect(() => {
    console.log("allTodo changed")
    const yetTodos = allTodo.filter(todo => !todo.done);
    const doneTodos = allTodo.filter(todo => todo.done);

    console.info("doneTodos", doneTodos)
    console.info("yetTodos", yetTodos)
    setYetTodos(yetTodos);
    setDoneTodos(doneTodos);
  }, [allTodo]);

  const [yetTodos, setYetTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  return (
    <main>
      <>
        {/*// ここで TodoContext と TodoHandlerContext が共有できる*/}
        <TodoProvider>
          <div className="flex">
            <div className="flex-initial">
              <h1>未完了のタスク</h1>
              <TodoList key={"yet"} todos={yetTodos}/>
            </div>
            <div className="flex-initial">
              <h1>完了したタスク</h1>
              <TodoList key={"done"} todos={doneTodos}/>
            </div>
          </div>
          <AddTodo/>
        </TodoProvider>
      </>
    </main>
  )
}