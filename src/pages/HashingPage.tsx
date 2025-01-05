import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookOpen, Eye, GamepadIcon } from 'lucide-react';
import TabLink from '../components/TabLink';
import HashingLearn from './hashing/HashingLearn';
import HashingVisualize from './hashing/HashingVisualize';
import HashingPlay from './hashing/HashingPlay';

const HashingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Hashing & Collision Handling</h1>
        <div className="flex space-x-4">
          <TabLink to="/hashing/learn" icon={<BookOpen />} text="Learn" />
          <TabLink to="/hashing/visualize" icon={<Eye />} text="Visualize" />
          <TabLink to="/hashing/play" icon={<GamepadIcon />} text="Play" />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <Routes>
          <Route path="/" element={<HashingLearn />} />
          <Route path="/learn" element={<HashingLearn />} />
          <Route path="/visualize" element={<HashingVisualize />} />
          <Route path="/play" element={<HashingPlay />} />
        </Routes>
      </div>
    </div>
  );
};

export default HashingPage;