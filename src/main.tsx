import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShowAllBook from './GetAllBook.tsx'
import DaftarBuku from './GetAllBook.tsx'
import DetailDataBuku from './GetDetailBook.tsx'
import UpdateBuku from './UpdateBook.tsx'

createRoot(document.getElementById('root')!).render(
<React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DaftarBuku />} />
      <Route path="/GetDetailBook/:id" element={<DetailDataBuku/>} />
      <Route path="/UpdateBook/:id" element={<UpdateBuku />} />
    </Routes>
  </BrowserRouter>
</React.StrictMode>
)
