import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
