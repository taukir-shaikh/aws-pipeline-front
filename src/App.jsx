<<<<<<< HEAD
import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./store/slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RequireAuth from "./common/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/SignUp";
=======
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from './store/slices/authSlice';
>>>>>>> 41b0ae3bc73962188bb0c435b96e285b2482e011

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(
        setCredentials({
          token,
          user: JSON.parse(user),
        })
      );
    }
  }, [dispatch]);

  return (
<<<<<<< HEAD
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        {/* Add more protected routes as needed */}
        {/* <Route
            path="/pipelines"
            element={
              <RequireAuth>
                <PipelineManagement />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          /> */}

        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch all route - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <ToastContainer />
    </>
=======
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/signup' element={<Signup/>} />
    </Routes>
>>>>>>> 41b0ae3bc73962188bb0c435b96e285b2482e011
  );
};

export default App;
