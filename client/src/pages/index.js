import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Login from "./Login";
import Projects from './Projects';
import ProjectsDetails from './ProjectDetails';
import NotFound from "./NotFound";
import Account from "./Account";

import { useSelector, useDispatch } from 'react-redux';
import { selectLogin, setLogin } from "../redux/authSlice";

import NavBar from "../components/NavBar";
import isLogin from "../common/isLogin";
import SiteNav from "../components/SiteNav";
import { fetchCountries } from '../redux/countriesSlice';

export default function App() {
  const login = useSelector(selectLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogin(isLogin()))
    if (isLogin()) {
      const getCountries = async () => {
        try {
          await dispatch(fetchCountries()).unwrap();
        }
        catch (e) {
          console.error(e)
        }
      }

      getCountries();
    }
  }, [])

  return (
    <div className="App">
      {
        isLogin() ? <>
          <NavBar />
          <SiteNav />
          <div className="siteContent" style={{ top: isLogin() ? 'var(--navBar-height)' : '0px' }}>
            <Routes>
              <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
              <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
              <Route path="/projects/:id" element={<RequireAuth><ProjectsDetails /></RequireAuth>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </> : <Login />
      }
    </div>
  );
}