'use client'
import React, {ChangeEvent, FormEvent, useContext, useState} from "react"
import { add_todo } from "../../../api/TodoApi";
import { v4 as uuidv4 } from "uuid";
import {TodoModel} from "../../../types/todo";
import { TodoContext } from "../../../app/todoHandlerContext";

export default function AddTodo() {
  const [TodoTitle, setTodoTitle] = useState("");
  const { allTodo, setAllTodo } = useContext(TodoContext);

  const handleSubmit = async (e: FormEvent) => {

    event.preventDefault();

    let addedTodo : TodoModel = await add_todo({id: uuidv4(), text: TodoTitle, done: false})
    setAllTodo( [...allTodo, addedTodo]);
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
