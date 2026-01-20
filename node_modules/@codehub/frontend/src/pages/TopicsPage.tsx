import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Topic = {
  _id: string;
  title: string;
  description: string;
};

const TopicsPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetch('/api/topics')
      .then(res => res.json())
      .then(data => setTopics(data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Topics</h2>
      <div className="grid gap-4">
        {topics.map(topic => (
          <Link key={topic._id} to={`/topics/${topic._id}`} className="card">
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
