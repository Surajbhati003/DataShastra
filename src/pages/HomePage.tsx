import React from 'react';
import { Hash, TreePine } from 'lucide-react';
import TopicCard from '../components/TopicCard';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          Learn Data Structures Interactively
        </h1>
        <p className="text-xl text-gray-400">
          Explore, visualize, and master complex algorithms through interactive learning
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <TopicCard
          title="Hashing"
          description="Learn about hash functions, collision handling, and implement your own hash tables"
          icon={<Hash className="w-12 h-12 text-indigo-500" />}
          link="/hashing"
        />
        <TopicCard
          title="B-Trees"
          description="Understand B-tree operations, balancing, and their applications in databases"
          icon={<TreePine className="w-12 h-12 text-purple-500" />}
          link="/btree"
        />
      </div>
    </div>
  );
};

export default HomePage;