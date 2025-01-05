import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Code2, GamepadIcon, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold">AlgoViz</span>
          </Link>
          
          <div className="flex space-x-4">
            <NavLink to="/" icon={<Home />} text="Home" />
            <NavLink to="/hashing" icon={<BookOpen />} text="Hashing" />
            <NavLink to="/btree" icon={<GamepadIcon />} text="B-Tree" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
        ${isActive 
          ? 'bg-gray-900 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default Navbar;