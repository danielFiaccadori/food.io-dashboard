import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

import SignUpScreen from './pages/SignUpScreen'
import LoginScreen from './pages/LoginScreen';

import DashboardLayout from './components/DashboardLayout';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Products from './pages/Products';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    /* <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUpScreen /></PublicRoute>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="finance" element={<Finance />} />
        </Route>
      </Routes>
    </Router > */

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUpScreen /></PublicRoute>} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path='finance' element={<Finance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
