import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router';
import imgDelete from './../../assets/delete.png';
import imgEdit from './../../assets/delete.png';
import Edit from '../Edit/Edit';


function App() {
  
 
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`)
    setTodos(response.data.data);
  }
  useEffect(() => {
    fetchTodos()
  }, []);
 const deleteTodo=async (id)=>{
  const response= await axios.delete
  (`${import.meta.env.VITE_API_URL}/todos/delete/${id}`)
   if(response){
     alert('Task deleted successfully')
     fetchTodos()
   }
 };

const checkboxChange = async (id, done) => {
  // send a PATCH with the updated "done" flag
  const response = await axios.patch(`${import.meta.env.VITE_API_URL}/todos/${id}/status`, { done });
  if (response){
    fetchTodos();
  };
};

  return (
    <div>
      
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#3a4668' }}>📝 Tasks</h1>
      {todos.map((todoObj) => {
        const { id, task, emoji, priority, createdAt, done } = todoObj;
        return (
          <div key={id} className="cart">
            <input type="checkbox" checked={done}  onChange={(e) => {checkboxChange(id, e.target.checked)}} />
            <div style={{ fontSize: '2.2rem', marginRight: '20px' }}>{emoji}</div>
            <div style={{ flex: 1 }}>
              <h2
                className={`todo-title${done ? ' completed' : ''}`}
                style={{ margin: 0, fontWeight: 600, fontSize: '1.3rem' }}
              >
                {task}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                <span
                  className="priority"
                  style={{
                    background: '#f3e8ff',
                    color: '#7c3aed',
                    borderRadius: '12px',
                    padding: '2px 12px',
                    fontSize: '0.9rem',
                    marginRight: '12px',
                    fontWeight: 500,
                    
                  }}
                >
                  Priority: {priority}
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: '#7b8ca7',
                    marginRight: '12px',
                  }}
                >
                  {new Date(createdAt).toLocaleDateString()}
                </span>
                <span className={'icon-done' + (done? ' done-ok' : '')}
                  style={{
                    fontWeight: 600,
                    color: done ? '#22c55e' : '#f59e42',
                    fontSize: '0.95rem',
                  }}
                >
                  {done ? '✅ Done' : '⏳ Pending'}
        
                </span>
                <Link to={`/edit/${id}`} >
                <img className='edit-icon' src={imgEdit} onClick={<Edit />} ></img>
                </Link>
              <button className='del-button' onClick={()=>{
                deleteTodo(id)
              }}>
                <img className='icon-delete' src={imgDelete} alt="delete" /></button>
              </div>
               
            </div>
              
          </div>
    
        )
      })}
         <Link className='fb' to="./new-todo">New Task</Link>
    </div>
  )
}

export default App