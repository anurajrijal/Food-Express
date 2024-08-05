
import { Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements  } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout/Layout.jsx';
import Home from './Pages/Home/Home.jsx';
import Menu from './Pages/Menu/Menu.jsx';
import Shop from './Pages/Shop/Shop.jsx';
import About from './Pages/About/About.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import { useState } from 'react'


function App() {
 const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
    
    </Route>
  )

 )

  return (
    <>
   <RouterProvider router={router}/>
    </>
  )
}

export default App
