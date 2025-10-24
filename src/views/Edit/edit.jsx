import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './edit.css';
import axios from 'axios';
import { useParams } from 'react-router';

function EditTodo() {
  const { id } = useParams();

  const [taskdata, setTaskdata] = useState({
    task: '',
    emoji: '🚀',
    priority: 'low',
    done: false,
  });

  const loadTodo = async (todoId) => {
    if (!todoId) return;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos/${todoId}`);
    const todoDetail = response.data?.data || {};
    setTaskdata({
      task: todoDetail.task || '',
      priority: todoDetail.priority || 'low',
      emoji: todoDetail.emoji || '🚀',
      done: !!todoDetail.done,
    });
  };

  useEffect(() => {
    loadTodo(id);
  }, [id]);

  const [emojiOpen, setEmojiOpen] = useState(false);

  const saveUpdate = async () => {
    if (!id) return;
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/todos/update/${id}`, taskdata);
    if (response.data?.success) {
      alert('Task updated successfully');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  return (
    <div className='form'>
      <div className='addform'>
        <h1 className='title' style={{ textAlign: 'center', marginBottom: '2rem', color: '#3a4668' }}>
          🆕 Edit Task : {id}
        </h1>
        <p className='your-tasks'>
          Task:{taskdata.task}
          <br />
          Emoji: {taskdata.emoji}
          <br />
          Priority: {taskdata.priority}
        </p>

        <input
          type='text'
          placeholder='Enter your task'
          value={taskdata.task}
          onChange={(e) => setTaskdata({ ...taskdata, task: e.target.value })}
        />

        <select className='selct-priority'
          value={taskdata.priority}
          onChange={(e) => setTaskdata({ ...taskdata, priority: e.target.value })}
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>

        <button className='emoji-btn' onClick={() => setEmojiOpen(!emojiOpen)}>select emoji</button>

        <p className='selected-emoji'>Your Emoji : {taskdata.emoji}</p>

        <EmojiPicker
          onEmojiClick={(emojiObject) => {
            setTaskdata({ ...taskdata, emoji: emojiObject.emoji })
            setEmojiOpen(false)
          }}
          open={emojiOpen}
        />

        <button className='update-btn' onClick={saveUpdate}>Update Task</button>
      </div>
    </div>
  )
}

export default EditTodo
