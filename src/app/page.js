'use client';
import React, { useEffect, useState } from "react";
import { get_all_todo_js,add_todo_js } from "./api/api.js";
import { v4 as uuidv4 } from "uuid";
import MikanForm from "./elem/list_elem";

export default function Home() {
  const [allTodos, setAllTodos] = useState([]);
  const [TodoTitle, setTodoTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await get_all_todo_js();
        console.log(todosData);
        setAllTodos(todosData);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (e) => {

    await add_todo_js({id: uuidv4(), text: TodoTitle, done: false})
  }

  // データが取得されるまでの間は "Loading..." を表示
  if (allTodos.length === 0) {
    return <p>Loading...</p>;
  }

  const doneTodos = allTodos.filter(todo => todo.done);
  const yetTodos = allTodos.filter(todo => !todo.done);

  return (
    <main>
      <div className="flex">
        <div className="flex-initial">
          <h1>未完了のタスク</h1>
          {yetTodos.map((todo) => (
            <MikanForm key={todo.id} todo={todo} />
          ))}
        </div>
        <div className="flex-initial">
          <h1>完了したタスク</h1>
          {doneTodos.map((todo) => (
            <MikanForm key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <div>
      <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-gray-300 py-2 px-4  rounded-lg"
        onChange={(e) => setTodoTitle(e.target.value)}
        value={TodoTitle}
      />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
      </form>
    </div>
    </main>
  );
}
