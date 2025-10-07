import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from './store/slices/authSlice';

const App = () => {
    const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Check for existing token on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch(setCredentials({
        token,
        user: JSON.parse(user)
      }));
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/signup' element={<Signup/>} />
    </Routes>
  );
};

export default App;
