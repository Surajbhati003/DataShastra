import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Code2, GamepadIcon, Home } from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HashingPage from './pages/HashingPage';
import BTreePage from './pages/BTreePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hashing/*" element={<HashingPage />} />
          <Route path="/btree/*" element={<BTreePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;