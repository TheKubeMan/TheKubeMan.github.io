import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo, filter }) {
    return (
        <div style={{display: (filter === "Completed" && !todo.completed) || (filter === "NotCompleted" && todo.completed) ? 'none' : 'block'}}>
            <div className='space-x-4 space-y-4'>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                />
                <span className='text-l space-x-3'>{todo.title}</span>
                <button className = 'text-white bg-red-700 border-white' onClick={() => deleteTodo(todo.id)}>Delete task</button>
            </div>
        </div>
    );
}

export default TodoItem;