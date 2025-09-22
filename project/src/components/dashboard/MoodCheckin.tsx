import React from 'react';
import { Smile } from 'lucide-react';

interface Props {
  currentMood: string;
  moodOptions: string[];
  handleSaveMoods: (mood: string) => void;
}

const MoodCheckin: React.FC<Props> = ({ currentMood, moodOptions, handleSaveMoods }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <Smile className="w-6 h-6 mr-2 text-blue-600" /> Quick Mood Check-in
    </h2>
    <div className="flex items-center space-x-4">
      <span className="text-gray-600">How are you feeling?</span>
      <div className="flex space-x-3">
        {moodOptions.map((mood, index) => (
          <button
            key={index}
            onClick={() => handleSaveMoods(mood)}
            className="text-3xl p-2 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all"
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
    <div className="mt-3 text-sm text-gray-600">
      Click any mood to save it instantly. You can add multiple mood entries throughout the day.
    </div>
  </div>
);

export default MoodCheckin;
