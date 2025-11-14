import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router';
import App from './views/Home/Home.jsx';
import NewTodo from './views/NewTodo/NewTodo';
import Edit from './views/Edit/edit.jsx';

createRoot(document.getElementById('root')).render(
<BrowserRouter>

     <Routes>
         <Route path="/" element={<App />} />
         <Route path="/new-todo" element={<NewTodo />} />
         <Route path="/edit/:id" element={<Edit />} />
    </Routes>
</BrowserRouter>

)
