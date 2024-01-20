'use client'
import React, { ChangeEvent, FormEvent, useState } from "react"
import { add_todo } from "../../../api/TodoApi";
import { v4 as uuidv4 } from "uuid";

export default function AddTodo() {
  const [TodoTitle, setTodoTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await add_todo({id: uuidv4(), text: TodoTitle, done: false})
  }
  return (
    <div>
      <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-gray-300 py-2 px-4  rounded-lg"
          onChange={(e:ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value)}
          value={TodoTitle}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
      </form>
    </div>
  )
};
