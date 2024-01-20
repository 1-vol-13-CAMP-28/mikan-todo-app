import { TodoModel } from "../types/todo";

export const get_all_todos = async () : Promise<Array<TodoModel>> => {
    const res = await fetch(`http://localhost:3001/todo`,
        {cache: "no-store"});
    const todos : Array<TodoModel> = await res.json();
    return todos
};


export const add_todo = async (todo: TodoModel): Promise<TodoModel> => {
    const res = await fetch("http://localhost:3001/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const newTodos = await res.json();
    return newTodos
};

export const edit_text_todo = async (newText: string, todo: TodoModel): Promise<TodoModel> => {
    const res = await fetch(`http://localhost:3001/todo/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, text: newText }),
    });

    const editedTodo = await res.json();
    return editedTodo;
}



export const edit_done_todo = async (todo: TodoModel): Promise<TodoModel> => {
    const res = await fetch(`http://localhost:3001/todo/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, done: !todo.done}),
    });

    const editedTodo = res.json();
    return editedTodo
}


export const delete_todo = async (id: string): Promise<TodoModel> => {
    const res = await fetch(`http://localhost:3001/todo/${id}`, {
        method: "DELETE",
        headers: { 
            "Content-type": "application/json",
        }
    });

    const deletedTodos = res.json();
    return deletedTodos
}