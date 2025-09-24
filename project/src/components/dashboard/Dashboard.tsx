import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmergencySupport from './EmergencySupport';
import MoodCheckin from './MoodCheckin';
import QuickStats from './QuickStats';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import SearchBar from './SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
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
  X
} from 'lucide-react';

const searchItems = [
  "Wellness Tutorials",
  "Digital Journal",
  "AI Support Chat",
  "Light & Sound Therapy",
  "Book Consultation",
  "Mood Tracker",
  "Privacy Settings",
  "Download Records",
  "Account Settings",
  "Student Portal",
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mood & notifications state
  const [currentMood, setCurrentMood] = useState('😊');
  const [moodOptions] = useState(['😢', '😐', '😊', '😄', '🤗']);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmergencySupport, setShowEmergencySupport] = useState(false);

  // Search logic
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = searchItems.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Monthly reset logic
  useEffect(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
    const lastResetMonth = localStorage.getItem("last-reset-month");

    if (lastResetMonth !== currentMonth) {
      localStorage.setItem("wellness-completed-sessions", JSON.stringify([]));
      localStorage.setItem("journal-entries", JSON.stringify([]));
      localStorage.setItem("mood-entries", JSON.stringify([]));
      localStorage.setItem("sessions-completed", JSON.stringify([]));
      localStorage.setItem("last-reset-month", currentMonth);
    }
  }, []);

  // Load initial mood & notifications
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    const todayEntry = moodEntries.find((entry: any) => entry.date === today);
    if (todayEntry) setCurrentMood(todayEntry.mood);

    const savedNotifications = JSON.parse(localStorage.getItem('user-notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  // Save mood
  const handleSaveMoods = (selectedMood: string) => {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    const moodValue = moodOptions.indexOf(selectedMood) + 1;

    const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    const newEntry = {
      id: Date.now(),
      date: today,
      mood: selectedMood,
      value: moodValue,
      note: `Quick mood check-in at ${currentTime}`
    };

    const updatedEntries = [newEntry, ...moodEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    localStorage.setItem('mood-entries', JSON.stringify(updatedEntries));
    setCurrentMood(selectedMood);
    alert(`Mood ${selectedMood} saved successfully!`);
  };

  // Quick actions & recent activity
  const quickActions = [
    { icon: Heart, title: "Wellness Tutorials", description: "Guided meditation & breathing", color: "bg-pink-500", route: "/wellness" },
    { icon: BookOpen, title: "Digital Journal", description: "Record your thoughts", color: "bg-green-500", route: "/journal" },
    { icon: MessageCircle, title: "AI Support Chat", description: "24/7 emotional assistance", color: "bg-purple-500", route: "/chatbot" },
    { icon: Sparkles, title: "Light & Sound Therapy", description: "Calming audio-visuals", color: "bg-indigo-500", route: "/therapy" },
    { icon: Calendar, title: "Book Consultation", description: "Private counselor sessions", color: "bg-teal-500", route: "/consultation" },
    { icon: BarChart3, title: "Mood Tracker", description: "Track your mental health", color: "bg-blue-500", route: "/mood-tracker" }
  ];

  const recentActivity = [
    { action: "Completed breathing exercise", time: "2 hours ago", icon: Heart },
    { action: "Journal entry added", time: "Yesterday", icon: BookOpen },
    { action: "Chatbot conversation", time: "2 days ago", icon: MessageCircle },
    { action: "Mood check-in completed", time: "3 days ago", icon: Smile }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MMDC MindCare</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>

            {/* Search */}
            <SearchBar
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              filteredSuggestions={filteredSuggestions}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
            />

           {/* Right Buttons */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 z-50">
                    <NotificationsDropdown
                      notifications={notifications}
                      setNotifications={setNotifications}
                      onClose={() => setShowNotifications(false)}
                    />
                  </div>
                )}
              </div>

              {/* Logout */}
              <button onClick={() => navigate('/')} className="text-gray-600 hover:text-red-600 transition-colors">
                Logout
              </button>

              {/* Student Portal */}
              <button
                onClick={() => navigate('/student-portal')}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
              >
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Student Portal</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notifications Dropdown */}
      {showNotifications && <NotificationsDropdown notifications={notifications} setNotifications={setNotifications} onClose={() => setShowNotifications(false)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back! How are you feeling today?</h1>
          <p className="text-gray-600">Track your wellness journey and access the support you need.</p>
        </div>

        {/* Mood Check-in */}
        <MoodCheckin currentMood={currentMood} moodOptions={moodOptions} handleSaveMoods={handleSaveMoods} />

        {/* Quick Stats */}
        <QuickStats />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            <QuickActions navigate={navigate} />
            {/* Recommendations */}
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
            <RecentActivity activities={recentActivity} />
            {/* Quick Access */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors" onClick={() => navigate('/privacy-settings')}>
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Privacy Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Download Records</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors" onClick={() => navigate('/account-settings')}>
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Account Settings</span>
                </button>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-red-700 mb-4">If you're experiencing a mental health crisis, reach out immediately.</p>
              <button
                onClick={() => setShowEmergencySupport(!showEmergencySupport)}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Emergency Support
              </button>
              {showEmergencySupport && <EmergencySupport />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
