import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: "Topics",
    description: "Explore key web development concepts with easy explanations.",
    link: "/topics",
    color: "bg-blue-100"
  },
  {
    title: "Practice",
    description: "Solve coding exercises and test your skills in the browser.",
    link: "/practice",
    color: "bg-green-100"
  },
  {
    title: "Examples",
    description: "Browse syntax-highlighted code samples for every topic.",
    link: "#examples",
    color: "bg-yellow-100"
  },
  {
    title: "Video Lectures",
    description: "Watch curated video tutorials for deeper understanding.",
    link: "#videos",
    color: "bg-purple-100"
  }
];

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center">
    {/* Hero Section */}
    <div className="w-full max-w-3xl text-center mt-16 mb-12">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4 drop-shadow-lg">Codehub</h1>
      <p className="text-xl text-gray-700 mb-6">
        The free learning platform for modern web development.<br />
        Learn, practice, and master HTML, CSS, JavaScript, React, Node, and more!
      </p>
      <Link
        to="/signup"
        className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 transition"
      >
        Get Started
      </Link>
    </div>
    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
      {features.map((feature, idx) => (
        <Link
          key={feature.title}
          to={feature.link}
          className={`rounded-xl shadow-lg p-8 flex flex-col justify-between hover:scale-105 transition ${feature.color}`}
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{feature.title}</h2>
          <p className="text-gray-600 mb-4">{feature.description}</p>
          <span className="mt-auto text-purple-700 font-semibold">Explore &rarr;</span>
        </Link>
      ))}
    </div>
    {/* Footer */}
    <footer className="mt-16 text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} Codehub. Made for learners, by learners.
    </footer>
  </div>
);

export default HomePage;
