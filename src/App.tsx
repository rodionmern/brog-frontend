import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'

import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import Post from './pages/Post'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="content">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/:id' element={<Post/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
