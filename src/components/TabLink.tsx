import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface TabLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const TabLink: React.FC<TabLinkProps> = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to.endsWith('/learn') && location.pathname === to.replace('/learn', ''));
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors
        ${isActive 
          ? 'bg-indigo-600 text-white' 
          : 'text-gray-300 hover:bg-gray-700'
        }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default TabLink;