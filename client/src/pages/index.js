import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Login from "./Login";

import { useSelector, useDispatch } from 'react-redux';
import { signOut } from "../redux/authSlice";



export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      </Routes>
    </div>
  );
}



function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutClicked = (e) => {
    dispatch(signOut())
    navigate("/", { replace: true })
  }
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <button onClick={onLogoutClicked}>Logout</button>
    </>
  );
}