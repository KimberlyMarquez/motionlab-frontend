//import { useState } from 'react'
import { Outlet } from 'react-router';
import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h1> Welcome to MotionLab!</h1>
      <Outlet />
    </>
  );
}

export default App