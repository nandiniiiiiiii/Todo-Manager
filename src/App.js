import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Todoprovider } from './contexts'
import { TodoForm, TodoItem,Back } from './components';

// fg(framer motion) - bg(context api)

function App() {
  const ref = useRef(null);
  const [todos, setTodos] = useState([]);
  const addtodo = (todo) => {
    setTodos((prev => [{ id: Date.now(), ...todo }, ...prev]));
  }
  const updatetodo = (id, todo) => {
    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)));
  }
  const deletetodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo) => {
      if (prevtodo.id !== id) {
        return prevtodo;
      }
    }))
  }
  const completetodo = (id) => {
    setTodos((prev) => prev.map((prevetodo) => (prevetodo.id === id ? { ...prevetodo, completed: !prevetodo.completed } : prevetodo)));
  }

  //take all the val from the local storage
  useEffect(() => {
    //get todo
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])
  //to add all the new todos to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Todoprovider
      // via this we will pass all the todos-prop and its functionality
      value={{ todos, addtodo, updatetodo, deletetodo, completetodo }}
    >

      {/* ref- to give reference to this div so that todo dont get out of here */}
      <div className="app"  ref={ref}>
        {/* navebar-manage your todos and add todos 
          todo box- box*/}
        <div className="nav">
          <b>Manage your ToDos...</b>
          <TodoForm />
        </div>
        <div className="todoitem">
          {todos.map((todo) => (
            <div key={todo.id} className='item'>
              <TodoItem todo={todo} reference={ref}/>
            </div>
          ))}
        </div>
      </div>
    </Todoprovider>
  );
}

export default App;
