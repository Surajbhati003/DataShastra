import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, description, icon, link }) => (
  <Link 
    to={link}
    className="block p-6 bg-gray-800 rounded-xl hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-gray-600"
  >
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-gray-900 rounded-lg">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex items-center text-indigo-400 hover:text-indigo-300">
          <span>Start Learning</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  </Link>
);

export default TopicCard;