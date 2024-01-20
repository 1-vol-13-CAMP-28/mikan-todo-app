import React, {useContext} from "react";
import Todo from "../Todo/page"
import {TodoModel} from "../../../types/todo";
import {TodoContext, TodoHandlerContext} from "../../todoHandlerContext";

interface TodoListProps {
    todos: TodoModel[];
    key: string;
}

export default function TodoList(props: TodoListProps) {
    return (
        <>
            <div className="text-blue-500 mr-3">
                {props.todos.map((todo) => (
                    <Todo key={todo.id} todo={todo}/>
                ))}
            </div>
        </>
    )
}