import React, { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  RouterProvider,
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
const Account = lazy(() => import("./Pages/Account/Account.jsx"));

// Helper function to wrap lazy-loaded components with Suspense
const SuspendedComponent = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={SuspendedComponent(Home)} />
        <Route path="menu" element={SuspendedComponent(Menu)} />
        <Route path="shop" element={SuspendedComponent(Shop)} />
        <Route path="about" element={SuspendedComponent(About)} />
        <Route path="contact" element={SuspendedComponent(Contact)} />
        <Route path="account" element={SuspendedComponent(Account)} /> 
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
