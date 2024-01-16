import React, { useState } from 'react'
import { useTodo } from '../contexts';
import './item.css';
import { FaRegTrashAlt, FaUserEdit, FaEdit } from "react-icons/fa";
import { motion } from 'framer-motion';

function TodoItem({ todo, reference }) {
    const [canEdit, setCanEdit] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updatetodo, deletetodo, completetodo } = useTodo()

    const editTodo = () => {
        updatetodo(todo.id, { ...todo, todo: todoMsg })
        setCanEdit(false);
    }
    const completed = () => {
        completetodo(todo.id);
    }

    return (
        <motion.div
            drag
            dragConstraints={reference}
            whileDrag={{ scale: 1.1 }}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
            className={`${todo.complete ? "tododone" : "todohere"}`}
        >
            <div className="check">
                <input
                    type='checkbox'
                    className='check'
                    checked={todo.complete}
                    onChange={completed}
                />
                  Completed
            </div>
            <motion.input
                type='text'
                className='textcont'
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!canEdit}
            />
            <div className="btn1">
                <button
                    className='editbtn'
                    onClick={() => {
                        if (todo.complete) { return }
                        if (canEdit) { editTodo(); } else setCanEdit((prev) => !prev);
                    }}
                >
                    {/* here will be the bttn icon */}
                    {canEdit ? <FaUserEdit /> : <FaEdit />
                    }
                </button>
                <button
                    className='delbtn'
                    onClick={() => deletetodo(todo.id)}
                >
                    <FaRegTrashAlt />
                </button>
            </div>
        </motion.div>
    )
}

export default TodoItem
