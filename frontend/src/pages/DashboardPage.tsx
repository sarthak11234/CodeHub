import React, { useEffect, useState } from 'react';

// Dummy data for illustration; replace with API calls
const dummyProgress = {
  topicsCompleted: 5,
  totalTopics: 10,
  exercisesCompleted: 3,
  totalExercises: 8
};
const dummyNotes = [
  "Remember to review React hooks.",
  "Practice CSS Flexbox layouts.",
  "Watch the JS closures video again."
];

const DashboardPage = () => {
  const [progress, setProgress] = useState(dummyProgress);
  const [notes, setNotes] = useState(dummyNotes);

  // Example: fetch user data from API
  // useEffect(() => {
  //   fetch('/api/users/progress').then(res => res.json()).then(setProgress);
  //   fetch('/api/users/me').then(res => res.json()).then(data => setNotes(data.notes));
  // }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700">Welcome to your Dashboard!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Progress Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-blue-600">Your Progress</h3>
          <div className="w-full mb-4">
            <div className="mb-2">
              <span className="font-semibold">Topics:</span>
              <span className="ml-2">{progress.topicsCompleted} / {progress.totalTopics}</span>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(progress.topicsCompleted / progress.totalTopics) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <span className="font-semibold">Exercises:</span>
              <span className="ml-2">{progress.exercisesCompleted} / {progress.totalExercises}</span>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(progress.exercisesCompleted / progress.totalExercises) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Completed Exercises Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-green-600">Completed Exercises</h3>
          <div className="text-5xl font-extrabold text-green-500 mb-2">{progress.exercisesCompleted}</div>
          <p className="text-gray-600">Keep practicing to improve your skills!</p>
        </div>
        {/* Notes Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-purple-600">Saved Notes</h3>
          <ul className="list-disc pl-5 space-y-2">
            {notes.map((note, idx) => (
              <li key={idx} className="text-gray-700">{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
