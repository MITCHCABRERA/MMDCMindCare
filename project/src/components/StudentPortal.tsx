import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  BookOpen,
  Heart,
  MessageCircle,
  Download,
  Settings,
  Shield,
  Bell,
  Award,
  TrendingUp,
  Clock,
  Plus,
  X,
  CheckCircle
} from 'lucide-react';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({});
  const [sessionStats, setSessionStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadStudentData();
    loadSessionStats();
    loadRecentActivity();
  }, []);

  const loadStudentData = () => {
    // Mock student data - in real app, this would come from authentication
    const mockData = {
      name: "Maria Santos",
      studentId: "2024-001234",
      email: "maria.santos@mmdc.edu.ph",
      program: "Bachelor of Science in Nursing",
      year: "3rd Year",
      joinDate: "August 2022",
      avatar: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400"
    };
    setStudentData(mockData);
  };

  const loadSessionStats = () => {
    const wellnessCompleted = Object.keys(JSON.parse(localStorage.getItem('wellness-completed-sessions') || '{}')).length;
    const journalEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]').length;
    const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]').length;
    const consultationBookings = JSON.parse(localStorage.getItem('consultation-bookings') || '[]').length;
    const therapySessions = parseInt(localStorage.getItem('therapy-session-count') || '0');

    setSessionStats({
      wellnessCompleted,
      journalEntries,
      moodEntries,
      consultationBookings,
      therapySessions
    });
  };

  const loadRecentActivity = () => {
    const activities = [
      { action: "Completed breathing exercise", time: "2 hours ago", icon: Heart },
      { action: "Journal entry added", time: "Yesterday", icon: BookOpen },
      { action: "Mood check-in completed", time: "2 days ago", icon: CheckCircle },
      { action: "Booked consultation session", time: "3 days ago", icon: Calendar },
      { action: "Used light therapy session", time: "4 days ago", icon: Award }
    ];
    setRecentActivity(activities);
  };

  const exportData = () => {
    const data = {
      studentInfo: studentData,
      journalEntries: JSON.parse(localStorage.getItem('journal-entries') || '[]'),
      moodEntries: JSON.parse(localStorage.getItem('mood-entries') || '[]'),
      wellnessSessions: JSON.parse(localStorage.getItem('wellness-completed-sessions') || '{}'),
      consultations: JSON.parse(localStorage.getItem('consultation-bookings') || '[]'),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindcare-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            <h1 className="text-xl font-semibold text-gray-800">Student Portal</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="text-center">
                <img
                  src={studentData.avatar}
                  alt={studentData.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-gray-800 mb-1">{studentData.name}</h2>
                <p className="text-gray-600 mb-2">{studentData.studentId}</p>
                <p className="text-sm text-gray-500 mb-4">{studentData.program}</p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800 font-medium">{studentData.year}</p>
                  <p className="text-xs text-blue-600">Joined {studentData.joinDate}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={exportData}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Export My Data</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Account Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Privacy Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-700">Notification Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Session Statistics */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wellness Journey</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{sessionStats.wellnessCompleted}</div>
                  <div className="text-sm text-gray-600">Wellness Sessions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{sessionStats.journalEntries}</div>
                  <div className="text-sm text-gray-600">Journal Entries</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{sessionStats.moodEntries}</div>
                  <div className="text-sm text-gray-600">Mood Check-ins</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-xl">
                  <Calendar className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{sessionStats.consultationBookings}</div>
                  <div className="text-sm text-gray-600">Consultations Booked</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <Award className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{sessionStats.therapySessions}</div>
                  <div className="text-sm text-gray-600">Therapy Sessions</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <MessageCircle className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">24/7</div>
                  <div className="text-sm text-gray-600">AI Support</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-blue-600" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <activity.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-600" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "First Steps", description: "Completed first wellness session", earned: sessionStats.wellnessCompleted > 0 },
                  { title: "Journaler", description: "Written 5 journal entries", earned: sessionStats.journalEntries >= 5 },
                  { title: "Mood Tracker", description: "Tracked mood for 7 days", earned: sessionStats.moodEntries >= 7 },
                  { title: "Self Care", description: "Used therapy sessions 3 times", earned: sessionStats.therapySessions >= 3 }
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 text-center ${
                      achievement.earned
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      achievement.earned ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}>
                      <Award className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <h3 className={`font-semibold text-sm mb-1 ${
                      achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-xs ${
                      achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Need Additional Support?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Campus Counseling Center</h3>
                  <p className="text-sm opacity-90">Phone: (02) 8123-4567</p>
                  <p className="text-sm opacity-90">Email: counseling@mmdc.edu.ph</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Emergency Hotline</h3>
                  <p className="text-sm opacity-90">24/7 Crisis Line: 8-919-9999</p>
                  <p className="text-sm opacity-90">Text: 0917-899-8727</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;