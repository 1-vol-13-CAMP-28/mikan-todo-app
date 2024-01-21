// api.js

import fetch from 'isomorphic-fetch';

export async function get_all_todo_js() {
    try {
        const all = await fetch(`http://localhost:3001/todo`, { cache: "no-store" });
      
        console.log("Response from server:", all);
        const todos = await all.json();
        return todos;
    } catch (error) {
      console.error("エラーが発生:", error);
    }
  }
  

export async function add_todo_js(req) {
  try {
    const sendData = await fetch("http://localhost:3001/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    const newTodos = await sendData.json();
    return newTodos;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

export async function edit_text_todo_js(todoData, todoTitle) {
    try {
      const editedData = await fetch(`http://localhost:3001/todo/${todoData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todoData, text: todoTitle}),
      });
  
      const editedTodo = await editedData.json();
      console.log(editedTodo);
      return editedTodo;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }
  

  export async function edit_done_todo_js(todoData) {
    console.log(todoData);
    try {
      const editedData = await fetch(`http://localhost:3001/todo/${todoData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todoData, done: !todoData.done }),
      });
      
      const editedTodo = await editedData.json();
      return editedTodo; 
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }

export async function delete_todo_js(todoData) {
    
    console.log(todoData);
    console.log(todoData.body);
  try {
    const id = todoData.id;
    const targetTodo = await fetch(`http://localhost:3001/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleted = await targetTodo.json();
    console.log(deleted);
    return deleted;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}
