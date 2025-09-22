import React from 'react';
import { TrendingUp, BookOpen, Activity, Smile } from 'lucide-react';

const QuickStats: React.FC = () => {
  const stats = [
    {
      title: "Wellness Streak",
      value: `${JSON.parse(localStorage.getItem('wellness-completed-sessions') || '[]').length} sessions`,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Journal Entries",
      value: `${JSON.parse(localStorage.getItem('journal-entries') || '[]').length}`,
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Sessions Completed",
      value: `${JSON.parse(localStorage.getItem('sessions-completed') || '[]').length}`,
      icon: Activity,
      color: "text-purple-600"
    },
    {
      title: "Mood Entries",
      value: `${JSON.parse(localStorage.getItem('mood-entries') || '[]').length}`,
      icon: Smile,
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
