
import { Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements  } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout/Layout.jsx';
import Home from './Pages/Home/Home.jsx';

function App() {
 const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
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
