import React, { useState } from 'react';
import { useTodo } from '../contexts';
import './form.css';
import {motion} from 'framer-motion';
import { FaPlus } from "react-icons/fa";

function TodoForm() {
    const [todo,setTodo] = useState("");
    const {addtodo} = useTodo();

    const add = (e) =>{
        e.preventDefault();
        if(!todo){return}
        addtodo({todo: todo,completed: false})
        setTodo("")
    }

    const hoverVariants = {
        hover: {
          color: "white", 
          backgroundColor: "rgb(36, 35, 35)"
        },
      };

    return (
        <form className='form' onSubmit={add}>
            <input 
                type='text'
                placeholder="Enter Todo..."
                className='entertext'
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <motion.button
                 whileHover="hover"
                 variants={hoverVariants}
                 transition={{ duration: 0.2 }}
                 style={{
                   backgroundColor: "orange",
                 }}
                className='btn'
            >
              <FaPlus />
            </motion.button>
        </form>
    )
}

export default TodoForm
