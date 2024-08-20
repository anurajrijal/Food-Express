import React, { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  RouterProvider,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import "./App.css";


// Lazy load the pages
const Home = lazy(() => import("./Pages/Home/Home.jsx"));
const Menu = lazy(() => import("./Pages/Menu/Menu.jsx"));
const Shop = lazy(() => import("./Pages/Shop/Shop.jsx"));
const About = lazy(() => import("./Pages/About/About.jsx"));
const Contact = lazy(() => import("./Pages/Contact/Contact.jsx"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="menu"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Menu />
            </Suspense>
          }
        />
        <Route
          path="shop"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Contact />
            </Suspense>
          }
        />

        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
