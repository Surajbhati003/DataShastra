import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookOpen, Eye, GamepadIcon } from 'lucide-react';
import TabLink from '../components/TabLink';
import BTreeLearn from './btree/BTreeLearn';
import BTreeVisualize from './btree/BTreeVisualize';
import BTreePlay from './btree/BTreePlay';

const BTreePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">B-Tree Data Structure</h1>
        <div className="flex space-x-4">
          <TabLink to="/btree/learn" icon={<BookOpen />} text="Learn" />
          <TabLink to="/btree/visualize" icon={<Eye />} text="Visualize" />
          <TabLink to="/btree/play" icon={<GamepadIcon />} text="Play" />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <Routes>
          <Route path="/" element={<BTreeLearn />} />
          <Route path="/learn" element={<BTreeLearn />} />
          <Route path="/visualize" element={<BTreeVisualize />} />
          <Route path="/play" element={<BTreePlay />} />
        </Routes>
      </div>
    </div>
  );
};

export default BTreePage;