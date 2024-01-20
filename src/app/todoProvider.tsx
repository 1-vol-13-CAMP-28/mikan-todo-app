import React, {useState} from "react";
import {TodoContext, TodoHandlerContext} from "./todoHandlerContext";
import {TodoModel} from "../types/todo";
import {get_all_todos} from "../api/TodoApi";

export const TodoProvider = ({children}) => {
    const [allTodo, setAllTodo] = useState<TodoModel[]>([]);

    const updateAllTodo = (todos: TodoModel[]) => {
        setAllTodo(todos);
        console.log("setAllTodo in TodoProvider");
    };

    const addTodo = async (todo: TodoModel) => {
        setAllTodo([...allTodo, todo]);
    };

    const deleteTodo = async (id: string) => {
        setAllTodo(allTodo.filter((todo) => todo.id !== id));
    };

    const editTodo = async (id: string, updatedTodo: TodoModel) => {
        setAllTodo(allTodo.map((todo) => (todo.id === id ? updatedTodo : todo)));
    };

    return (
        <TodoContext.Provider value={{allTodo: allTodo, setAllTodo: updateAllTodo}}>
            <TodoHandlerContext.Provider value={{addTodo, deleteTodo, editTodo}}>
                {children}
            </TodoHandlerContext.Provider>
        </TodoContext.Provider>
    );
};