import React, {useContext} from "react";
import {TodoModel} from "../types/todo";
import {add_todo, delete_todo, edit_done_todo, edit_text_todo} from "../api/TodoApi";

export const TodoContext: React.Context<{ allTodo: TodoModel[], setAllTodo: (todos: TodoModel[]) => void }> = React.createContext({
    allTodo: [],
    setAllTodo: () => {
        console.log("setAllTodo in TodoContext")
    }
});

export const TodoHandlerContext = React.createContext({
    addTodo: async (todo: TodoModel) => {
        const { allTodo, setAllTodo } = useContext(TodoContext);
        try {
            await add_todo(todo);
            setAllTodo (
            [...allTodo, todo]
            )
        } catch (error) {
            console.error('API call failed:', error);
        }
    },
    deleteTodo: async (id: string) => {
        const { allTodo, setAllTodo } = useContext(TodoContext);
        try {
            await delete_todo(id);
            setAllTodo(
                allTodo.filter(todo => todo.id !== id)
            )
        } catch (error) {
            console.error('API call failed:', error);
        }
    },
    editTodo: async (id: string, updatedTodo: TodoModel) => {
        const { allTodo, setAllTodo } = useContext(TodoContext);
        try {
            await edit_text_todo(updatedTodo.text, updatedTodo);
            setAllTodo(
                allTodo.map((todo) => (todo.id === id ? updatedTodo : todo))
            )
        } catch (error) {
            console.error('API call failed:', error);
        }
    },
});