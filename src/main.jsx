import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router';
import App from './src/views/Home/Home';
import NewTodo from './src/views/NewTodo/NewTodo';
import Edit from './src/views/Edit/edit';

createRoot(document.getElementById('root')).render(
<BrowserRouter>

     <Routes>
         <Route path="/" element={<App />} />
         <Route path="/new-todo" element={<NewTodo />} />
         <Route path="/edit/:id" element={<Edit />} />
    </Routes>
</BrowserRouter>


)
