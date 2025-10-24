import React from 'react'
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import'./NewTodo.css'
import axios from 'axios';

function NewTodo() {
   const [taskdata, setTaskdata] = useState({
      task:"",
      emoji:"🚀",
      priority:"low",
      done:false,
 });
const[emojiOpen, setEmojiOpen] = useState(false);
const sum=async()=>{ 
  const response= await axios.post(`${import.meta.env.VITE_API_URL}/todos`, taskdata);  
  if(response.data.success){
    alert('Task added successfully');
    setTaskdata({task:"", emoji:"🚀", priority:"low", done:false});
  }
  
  setTimeout(()=>{window.location.href='/'}, 1000);
}
  return (
    <div className='form'
  >
    <div className='addform'>

  
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#3a4668' }}>🆕 Add New Task</h1>
      <p>
      Task:{taskdata.task}
      <br></br>
      Emoji: {taskdata.emoji}
      <br></br>
      Priority: {taskdata.priority}
     
      
       
      </p>
      
     
     

     <input type="text" placeholder="Enter your task" value={taskdata.task} onChange={(e)=>setTaskdata({...taskdata,task:e.target.value})} />

     <select value={taskdata.priority} onChange={(e)=>setTaskdata({...taskdata,priority:e.target.value})} >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
     </select>
    <button onClick={()=>{
      setEmojiOpen(!emojiOpen);
    }} >select emoji </button>

<p>Your Emoji : {taskdata.emoji}</p>
    <EmojiPicker onEmojiClick={({emoji}) =>{setTaskdata({...taskdata, emoji :emoji });
 setEmojiOpen(false)
    } 
 
  }
     

      open={emojiOpen}/>
     
     <button onClick={sum}>
      Add Task
     </button>
  </div>
    </div>
  )
}

export default NewTodo;
