import React from 'react';
import { TrendingUp, BookOpen, Activity, Smile, Info } from 'lucide-react';

const QuickStats: React.FC = () => {
  const stats = [
    {
      title: "Wellness Streak",
      value: `${Object.keys(JSON.parse(localStorage.getItem('wellness-completed-sessions') || '{}')).length} days`,

      icon: TrendingUp,
      color: "text-green-600",
      description: "Complete three or more activity from Light & Sound Theraphy, Wellness Tutorial and Journal Entry to increase your streak."
    },
    {
      title: "Journal Entries",
      value: `${JSON.parse(localStorage.getItem('journal-entries') || '[]').length}`,
      icon: BookOpen,
      color: "text-blue-600",
      description: "This is your Journal activity count monthy ."
    },
    {
      title: "Sessions Completed",
      value: `${JSON.parse(localStorage.getItem('sessions-completed') || '[]').length}`,
      icon: Activity,
      color: "text-purple-600",
      description: "The total number of Wellness Tutorial and  Light & Sound Theraphy you finished this month."
    },
    {
      title: "Mood Entries",
      value: `${JSON.parse(localStorage.getItem('mood-entries') || '[]').length}`,
      icon: Smile,
      color: "text-yellow-600",
      description: "This is your mood check-ins recorded this month."
    }
  ];

  return (
    <div>
      {/* Section Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative"
          >
            {/* Info Tooltip */}
            <div className="absolute top-2 right-2 group">
              <Info className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-gray-700 text-sm rounded-lg shadow-lg border border-gray-200 p-3 w-60 z-10">
                {stat.description}
              </div>
            </div>

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
    </div>
  );
};

export default QuickStats;
