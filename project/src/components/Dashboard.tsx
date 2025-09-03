import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Calendar,
  Search,
  Sparkles,
  User,
  Settings,
  Bell,
  TrendingUp,
  Activity,
  Shield,
  Download,
  BarChart3,
  Smile,
  Clock,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMood, setCurrentMood] = useState('😊');
  const [dailyMoodSaved, setDailyMoodSaved] = useState(false);

  // Check if mood was already saved today
  React.useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    const todayEntry = moodEntries.find(entry => entry.date === today);
    if (todayEntry) {
      setCurrentMood(todayEntry.mood);
      setDailyMoodSaved(true);
    }
  }, []);

  const quickActions = [
    {
      icon: Heart,
      title: "Wellness Tutorials",
      description: "Guided meditation & breathing",
      color: "bg-pink-500",
      route: "/wellness"
    },
    {
      icon: BookOpen,
      title: "Digital Journal",
      description: "Record your thoughts",
      color: "bg-green-500",
      route: "/journal"
    },
    {
      icon: MessageCircle,
      title: "AI Support Chat",
      description: "24/7 emotional assistance",
      color: "bg-purple-500",
      route: "/chatbot"
    },
    {
      icon: Sparkles,
      title: "Light & Sound Therapy",
      description: "Calming audio-visuals",
      color: "bg-indigo-500",
      route: "/therapy"
    },
    {
      icon: Calendar,
      title: "Book Consultation",
      description: "Private counselor sessions",
      color: "bg-teal-500",
      route: "/consultation"
    },
    {
      icon: BarChart3,
      title: "Mood Tracker",
      description: "Track your mental health",
      color: "bg-blue-500",
      route: "/mood-tracker"
    }
  ];

  const recentActivity = [
    { action: "Completed breathing exercise", time: "2 hours ago", icon: Heart },
    { action: "Journal entry added", time: "Yesterday", icon: BookOpen },
    { action: "Chatbot conversation", time: "2 days ago", icon: MessageCircle },
    { action: "Mood check-in completed", time: "3 days ago", icon: Smile }
  ];

  const moodOptions = ['😢', '😐', '😊', '😄', '🤗'];

  const handleSaveMood = () => {
    const today = new Date().toISOString().split('T')[0];
    const moodValue = moodOptions.indexOf(currentMood) + 1;
    
    const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    const filteredEntries = moodEntries.filter(entry => entry.date !== today);
    
    const newEntry = {
      id: Date.now(),
      date: today,
      mood: currentMood,
      value: moodValue,
      note: 'Daily check-in from dashboard'
    };
    
    const updatedEntries = [newEntry, ...filteredEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    localStorage.setItem('mood-entries', JSON.stringify(updatedEntries));
    setDailyMoodSaved(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MMCD MindCare</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tools, resources, or ask a question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Student Portal</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back! How are you feeling today?
          </h1>
          <p className="text-gray-600">
            Track your wellness journey and access the support you need.
          </p>
        </div>

        {/* Mood Check-in */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Smile className="w-6 h-6 mr-2 text-blue-600" />
            Quick Mood Check-in
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">How are you feeling right now?</span>
            <div className="flex space-x-3">
              {moodOptions.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMood(mood)}
                  className={`text-3xl p-2 rounded-lg transition-all ${
                    currentMood === mood 
                      ? 'bg-blue-100 ring-2 ring-blue-500 scale-110' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 ml-4">
              <CheckCircle className="w-4 h-4" />
              <span onClick={handleSaveMood}>{dailyMoodSaved ? 'Saved' : 'Save'}</span>
            </button>
            {dailyMoodSaved && (
              <span className="text-green-600 text-sm ml-2">✓ Mood saved for today</span>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Wellness Streak", value: `${JSON.parse(localStorage.getItem('wellness-completed-sessions') || '{}').length || 0} sessions`, icon: TrendingUp, color: "text-green-600" },
            { title: "Journal Entries", value: `${JSON.parse(localStorage.getItem('journal-entries') || '[]').length}`, icon: BookOpen, color: "text-blue-600" },
            { title: "Sessions Completed", value: "12", icon: Activity, color: "text-purple-600" },
            { title: "Mood Entries", value: `${JSON.parse(localStorage.getItem('mood-entries') || '[]').length}`, icon: Smile, color: "text-yellow-600" }
          ].map((stat, index) => (
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(action.route)}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {action.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Recommendations */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Today's Personalized Recommendations</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
                  <Heart className="w-5 h-5" />
                  <span>Try a 5-minute breathing exercise to reduce stress</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
                  <BookOpen className="w-5 h-5" />
                  <span>Journal about three things you're grateful for today</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
                  <Sparkles className="w-5 h-5" />
                  <span>Listen to calming sounds for 10 minutes before bed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Privacy Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Download Records</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Account Settings</span>
                </button>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-red-700 mb-4">
                If you're experiencing a mental health crisis, reach out immediately.
              </p>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Emergency Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;