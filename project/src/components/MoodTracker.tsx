import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Smile,
  Frown,
  Meh,
  Plus,
  Download,
  Filter,
  Clock
} from 'lucide-react';

const MoodTracker = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [moodEntries, setMoodEntries] = useState([]);

  // Load mood entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mood-entries');
    if (saved) {
      setMoodEntries(JSON.parse(saved));
    } else {
      // Set default entries if none exist
      const defaultEntries = [
        { id: 1, date: '2024-01-15', mood: '😊', value: 4, note: 'Had a great study session today!' },
        { id: 2, date: '2024-01-14', mood: '😐', value: 3, note: 'Feeling neutral about upcoming exams' },
        { id: 3, date: '2024-01-13', mood: '😄', value: 5, note: 'Celebrated with friends after project submission' },
        { id: 4, date: '2024-01-12', mood: '😔', value: 2, note: 'Stressed about deadlines' },
        { id: 5, date: '2024-01-11', mood: '🙂', value: 4, note: 'Good day overall, feeling productive' },
        { id: 6, date: '2024-01-10', mood: '😊', value: 4, note: 'Morning meditation helped start the day right' },
        { id: 7, date: '2024-01-09', mood: '😐', value: 3, note: 'Average day, nothing special' }
      ];
      setMoodEntries(defaultEntries);
      localStorage.setItem('mood-entries', JSON.stringify(defaultEntries));
    }
  }, []);

  const moodOptions = [
    { emoji: '😢', label: 'Very Sad', value: 1, color: 'bg-red-500' },
    { emoji: '😔', label: 'Sad', value: 2, color: 'bg-orange-500' },
    { emoji: '😐', label: 'Neutral', value: 3, color: 'bg-yellow-500' },
    { emoji: '🙂', label: 'Happy', value: 4, color: 'bg-green-500' },
    { emoji: '😄', label: 'Very Happy', value: 5, color: 'bg-emerald-500' }
  ];

  const handleSubmitMood = () => {
    if (selectedMood && selectedDate) {
      const selectedMoodData = moodOptions.find(m => m.value === selectedMood);
      const newEntry = {
        id: Date.now(),
        date: selectedDate,
        mood: selectedMoodData.emoji,
        value: selectedMood,
        note: note || 'No note added'
      };

      // Remove existing entry for the same date if it exists
      const filteredEntries = moodEntries.filter(entry => entry.date !== selectedDate);
      const updatedEntries = [newEntry, ...filteredEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setMoodEntries(updatedEntries);
      localStorage.setItem('mood-entries', JSON.stringify(updatedEntries));
      
      // Reset form
      setSelectedMood('');
      setNote('');
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  };

  const getColorForValue = (value) => {
    const colors = {
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-green-500',
      5: 'bg-emerald-500'
    };
    return colors[value] || 'bg-gray-300';
  };

  // Calculate weekly stats for the current week
  const getWeeklyStats = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    
    const weeklyData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const entry = moodEntries.find(e => e.date === dateStr);
      weeklyData.push({
        day: days[i],
        value: entry ? entry.value : 0,
        date: dateStr
      });
    }
    
    return weeklyData;
  };

  const weeklyStats = getWeeklyStats();
  const averageMood = moodEntries.length > 0 
    ? (moodEntries.reduce((sum, entry) => sum + entry.value, 0) / moodEntries.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Mood Tracker</h1>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Add New Mood Entry */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Plus className="w-6 h-6 mr-2 text-blue-600" />
                Log Your Mood
              </h2>
              
              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Mood Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How are you feeling?
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`p-4 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                          selectedMood === mood.value
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{mood.emoji}</div>
                        <div className="text-xs text-gray-600">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add a note (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's on your mind? How was your day?"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmitMood}
                  disabled={!selectedMood}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Mood Entry
                </button>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-purple-600" />
                  This Week's Overview
                </h2>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filter</span>
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-4">
                {weeklyStats.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-gray-600 mb-2">{day.day}</div>
                    <div className="relative h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className={`absolute bottom-0 w-full ${getColorForValue(day.value)} transition-all duration-300`}
                        style={{ height: day.value > 0 ? `${(day.value / 5) * 100}%` : '0%' }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {day.value > 0 ? `${day.value}/5` : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-green-600" />
                Recent Entries
              </h2>
              
              <div className="space-y-4">
                {moodEntries.slice(0, 7).map((entry, index) => (
                  <div key={entry.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="text-3xl">{entry.mood}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800">
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getColorForValue(entry.value)}`}></div>
                      </div>
                      <p className="text-gray-600 text-sm">{entry.note}</p>
                    </div>
                  </div>
                ))}
                {moodEntries.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Smile className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No mood entries yet. Start tracking your mood above!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Your Stats
              </h3>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-gray-800">{averageMood}</div>
                  <div className="text-sm text-gray-600">Average Mood</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">
                      {moodEntries.filter(entry => {
                        const entryDate = new Date(entry.date);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return entryDate >= weekAgo;
                      }).length}
                    </div>
                    <div className="text-xs text-gray-600">This Week</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">
                      {moodEntries.filter(entry => {
                        const entryDate = new Date(entry.date);
                        const monthAgo = new Date();
                        monthAgo.setMonth(monthAgo.getMonth() - 1);
                        return entryDate >= monthAgo;
                      }).length}
                    </div>
                    <div className="text-xs text-gray-600">This Month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood Distribution */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Distribution</h3>
              
              <div className="space-y-3">
                {moodOptions.slice().reverse().map((mood) => {
                  const count = moodEntries.filter(entry => entry.value === mood.value).length;
                  const percentage = moodEntries.length > 0 ? Math.round((count / moodEntries.length) * 100) : 0;
                  
                  return (
                    <div key={mood.value} className="flex items-center space-x-3">
                      <span className="text-2xl">{mood.emoji}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700">{mood.label}</span>
                          <span className="text-sm text-gray-500">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${mood.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">View Calendar</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Export Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-700">View Trends</span>
                </button>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">💡 Insight</h3>
              <p className="text-sm opacity-90">
                {averageMood >= 4 
                  ? "Your mood has been consistently positive! Keep up the good work with your wellness routine."
                  : averageMood >= 3
                  ? "Your mood is stable. Consider trying some wellness exercises to boost your spirits."
                  : "It looks like you've been having some tough days. Remember that support is available - try our chatbot or book a consultation."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;