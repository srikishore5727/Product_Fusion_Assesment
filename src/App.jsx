import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './ProductPage';
import Dashboard from './Dashboard';
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        <nav className="main-nav"> 
          <Link to="/">Product Page</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;