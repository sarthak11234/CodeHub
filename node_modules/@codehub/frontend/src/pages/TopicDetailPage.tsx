import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Topic = {
  _id: string;
  title: string;
  description: string;
  examples: string[];
  videoURL: string;
};

const TopicDetailPage = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    fetch(`/api/topics/${id}`)
      .then(res => res.json())
      .then(data => setTopic(data));
  }, [id]);

  if (!topic) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">{topic.title}</h2>
      <p>{topic.description}</p>
      <h3 className="mt-4 font-semibold">Examples</h3>
      <pre className="bg-gray-100 p-2">{topic.examples.join('\n')}</pre>
      <h3 className="mt-4 font-semibold">Video Lecture</h3>
      <iframe
        width="560"
        height="315"
        src={topic.videoURL}
        title="Video Lecture"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default TopicDetailPage;
