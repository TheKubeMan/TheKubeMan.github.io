import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('')
  const [filter, setfilter] = useState("All");

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => todo.id !== id)
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;

  const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };
  
  let nav = useNavigate();
  const redirect = () =>
  {
    nav('/dnd');
  }

  return(
    <div className='flex flex-col items-center justify-center space-y-4'>
        <br></br>
        <button className='border-white hover:bg-white hover:text-black' onClick={redirect}>To Drag-And-Drop</button>
      <h1>My To-Do List</h1>
      <form onSubmit={addTodo} className='size-max'>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add a new task'
          />
      </form>
      <div className='filters space-x-4'>
        <button className={filter === "All" ? 'bg-blue-600 border-white' : 'bg-blue-600'} onClick={() => setfilter("All")}>All</button>
        <button className={filter === "Completed" ? 'bg-green-600 border-white' : 'bg-green-600'}  onClick={() => setfilter("Completed")}>Completed</button>
        <button className={filter === "NotCompleted" ? 'bg-yellow-600 border-white' : 'bg-yellow-600'} onClick={() => setfilter("NotCompleted")}>Not Completed</button>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} filter={filter}/>
    </div>
  );
}

export default TodoPage
