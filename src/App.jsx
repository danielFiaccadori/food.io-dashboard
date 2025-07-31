import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

import SignUpScreen from './pages/SignUpScreen'
import LoginScreen from './pages/LoginScreen';

import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';;
import Products from './pages/Products';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUpScreen /></PublicRoute>} />

        <Route path="/dashboard/home" element={<PublicRoute><Dashboard /></PublicRoute>} />
        
        <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/dashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
