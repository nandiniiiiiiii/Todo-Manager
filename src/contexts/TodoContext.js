import { createContext, useContext } from "react";

export const TodoContext = createContext({
    //first main properties
    todos: [
        {
            id: 1,
            todo: "todo message",
            completed: false,
        }
    ],
    //second funcitons
    addtodo: (todo) => { },
    updatetodo: (todo, id) => { },
    deletetodo: (id) => { },
    completetodo: (id) => { }
});

export const useTodo = () => {
    return useContext(TodoContext);
}

export const Todoprovider = TodoContext.Provider