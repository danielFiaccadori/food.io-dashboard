import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

import LoginScreen from './pages/LoginScreen';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';;
import SignUpScreen from './pages/SignUpScreen';
import Products from './pages/Products';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute><SignUpScreen /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
