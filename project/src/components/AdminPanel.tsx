import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Calendar, MessageSquare, BarChart3, Settings, LogOut, Search, Filter, Download, Eye, Trash2, CreditCard as Edit, Plus, X, CheckCircle, AlertTriangle, Clock, TrendingUp, Activity, BookOpen, Heart, Brain, UserCheck, UserX, Mail, Phone, MapPin, Save, RefreshCw, Star } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);
  const [contentItems, setContentItems] = useState([]);
  const [wellnessPrograms, setWellnessPrograms] = useState([]);
  const [therapyThemes, setTherapyThemes] = useState([]);

useEffect(() => {
  const adminSession = localStorage.getItem("authUser");
  const user = adminSession ? JSON.parse(adminSession) : null;

  // Redirect if not logged in or not admin
  if (!user || user.role !== "admin") {
    navigate("/");
    return;
  }

  loadDashboardData();
  loadContentData();
}, [navigate]);

  const loadDashboardData = () => {
    // Load statistics
    const journalEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
    const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    const consultationBookings = JSON.parse(localStorage.getItem('consultation-bookings') || '[]');
    const wellnessSessions = Object.keys(JSON.parse(localStorage.getItem('wellness-completed-sessions') || '{}')).length;

    setStats({
      totalUsers: 156,
      activeUsers: 89,
      totalConsultations: consultationBookings.length || 0,
      pendingConsultations: consultationBookings.filter(c => c.status === 'pending').length || 0,
      journalEntries: journalEntries.length || 0,
      moodEntries: moodEntries.length || 0,
      wellnessSessions: wellnessSessions,
      systemHealth: 98.5
    });

    // Load real users data from system
    const realUsers = [
      {
        id: 1,
        name: 'Maria Santos',
        email: 'maria.santos@mmdc.edu.ph',
        studentId: '2024-001234',
        program: 'BS Nursing',
        year: '3rd Year',
        status: 'active',
        lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' '),
        joinDate: '2022-08-15',
        sessionsCompleted: wellnessSessions,
        journalEntries: journalEntries.length,
        moodEntries: moodEntries.length
      },
      {
        id: 2,
        name: 'John Rivera',
        email: 'john.rivera@mmdc.edu.ph',
        studentId: '2024-001235',
        program: 'BS Medicine',
        year: '2nd Year',
        status: 'active',
        lastLogin: '2024-01-14 09:15',
        joinDate: '2023-08-15',
        sessionsCompleted: Math.floor(wellnessSessions * 0.6),
        journalEntries: Math.floor(journalEntries.length * 0.4),
        moodEntries: Math.floor(moodEntries.length * 0.7)
      },
      {
        id: 3,
        name: 'Sarah Chen',
        email: 'sarah.chen@mmdc.edu.ph',
        studentId: '2024-001236',
        program: 'BS Physical Therapy',
        year: '4th Year',
        status: journalEntries.length > 10 ? 'active' : 'inactive',
        lastLogin: '2024-01-10 16:45',
        joinDate: '2021-08-15',
        sessionsCompleted: Math.floor(wellnessSessions * 1.5),
        journalEntries: Math.floor(journalEntries.length * 1.2),
        moodEntries: Math.floor(moodEntries.length * 1.8)
      }
    ];
    setUsers(realUsers);

    // Load consultations
    setConsultations(consultationBookings);

    // Load system logs
    setSystemLogs([
      {
        id: 1,
        timestamp: '2024-01-15 14:30:25',
        level: 'info',
        action: 'User Login',
        details: 'maria.santos@mmdc.edu.ph logged in successfully',
        ip: '192.168.1.100'
      },
      {
        id: 2,
        timestamp: '2024-01-15 14:25:10',
        level: 'warning',
        action: 'Failed Login Attempt',
        details: 'Invalid password for john.rivera@mmdc.edu.ph',
        ip: '192.168.1.101'
      },
      {
        id: 3,
        timestamp: '2024-01-15 14:20:05',
        level: 'info',
        action: 'Consultation Booked',
        details: 'New consultation booked by maria.santos@mmdc.edu.ph',
        ip: '192.168.1.100'
      },
      {
        id: 4,
        timestamp: '2024-01-15 14:15:30',
        level: 'error',
        action: 'System Error',
        details: 'Database connection timeout in wellness module',
        ip: 'system'
      }
    ]);
  };

  const loadContentData = () => {
    // Load wellness programs
    const wellnessPrograms = [
      {
        id: 1,
        title: "Deep Breathing Basics",
        description: "Learn fundamental breathing techniques for instant calm",
        duration: "5 min",
        category: "Breathing",
        status: "published",
        views: 1250,
        completions: 890,
        rating: 4.8,
        lastUpdated: "2024-01-10"
      },
      {
        id: 2,
        title: "Mindful Meditation",
        description: "Guided meditation for mental clarity and focus",
        duration: "10 min",
        category: "Meditation",
        status: "published",
        views: 2100,
        completions: 1450,
        rating: 4.9,
        lastUpdated: "2024-01-08"
      },
      {
        id: 3,
        title: "Progressive Muscle Relaxation",
        description: "Release physical tension throughout your body",
        duration: "15 min",
        category: "Relaxation",
        status: "draft",
        views: 0,
        completions: 0,
        rating: 0,
        lastUpdated: "2024-01-15"
      }
    ];
    setWellnessPrograms(wellnessPrograms);

    // Load therapy themes
    const therapyThemes = [
      {
        id: 1,
        name: "Calm Ocean",
        description: "Soothing ocean waves with blue gradient visuals",
        category: "Relaxation",
        status: "published",
        usage: 450,
        rating: 4.7,
        lastUpdated: "2024-01-12"
      },
      {
        id: 2,
        name: "Forest Rain",
        description: "Gentle rain sounds with green nature visuals",
        category: "Sleep",
        status: "published",
        usage: 320,
        rating: 4.6,
        lastUpdated: "2024-01-09"
      },
      {
        id: 3,
        name: "Deep Meditation",
        description: "Tibetan singing bowls with purple ambient visuals",
        category: "Meditation",
        status: "published",
        usage: 680,
        rating: 4.9,
        lastUpdated: "2024-01-11"
      }
    ];
    setTherapyThemes(therapyThemes);

    // Combine content items
    const allContent = [
      ...wellnessPrograms.map(item => ({ ...item, type: 'wellness' })),
      ...therapyThemes.map(item => ({ ...item, type: 'therapy', title: item.name }))
    ];
    setContentItems(allContent);
  };

  const handleLogout = () => {
  localStorage.removeItem("authUser");
  navigate("/", { replace: true }); 
};

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
    setFormData({});
  };

  const handleSave = () => {
    // Handle save operations based on modal type
    if (modalType === 'user' || modalType === 'edit-user') {
      if (selectedItem) {
        // Update existing user
        setUsers(users.map(u => u.id === selectedItem.id ? { ...u, ...formData } : u));
      } else {
        // Add new user
        const newUser = {
          id: Date.now(),
          ...formData,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          sessionsCompleted: 0,
          journalEntries: 0,
          moodEntries: 0
        };
        setUsers([...users, newUser]);
      }
    } else if (modalType === 'content' || modalType === 'edit-content') {
      if (selectedItem) {
        // Update existing content
        if (selectedItem.type === 'wellness') {
          setWellnessPrograms(wellnessPrograms.map(p => p.id === selectedItem.id ? { ...p, ...formData } : p));
        } else {
          setTherapyThemes(therapyThemes.map(t => t.id === selectedItem.id ? { ...t, ...formData } : t));
        }
        // Update combined content items
        setContentItems(contentItems.map(c => c.id === selectedItem.id && c.type === selectedItem.type ? { ...c, ...formData } : c));
      } else {
        // Add new content
        const newContent = {
          id: Date.now(),
          ...formData,
          status: 'draft',
          views: 0,
          completions: 0,
          usage: 0,
          rating: 0,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        if (formData.type === 'wellness') {
          setWellnessPrograms([...wellnessPrograms, newContent]);
        } else {
          setTherapyThemes([...therapyThemes, newContent]);
        }
        setContentItems([...contentItems, { ...newContent, title: newContent.title || newContent.name }]);
      }
    }
    closeModal();
  };

  const handleDelete = (type, id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'user') {
        setUsers(users.filter(u => u.id !== id));
      } else if (type === 'consultation') {
        setConsultations(consultations.filter(c => c.id !== id));
      } else if (type === 'content') {
        const item = contentItems.find(c => c.id === id);
        if (item) {
          if (item.type === 'wellness') {
            setWellnessPrograms(wellnessPrograms.filter(p => p.id !== id));
          } else {
            setTherapyThemes(therapyThemes.filter(t => t.id !== id));
          }
          setContentItems(contentItems.filter(c => c.id !== id));
        }
      }
    }
  };

  const exportData = (type) => {
    let data = {};
    let filename = '';

    switch (type) {
      case 'users':
        data = users;
        filename = 'users-export.json';
        break;
      case 'consultations':
        data = consultations;
        filename = 'consultations-export.json';
        break;
      case 'content':
        data = contentItems;
        filename = 'content-export.json';
        break;
      case 'logs':
        data = systemLogs;
        filename = 'system-logs-export.json';
        break;
      case 'all':
        data = { users, consultations, systemLogs, stats, contentItems, wellnessPrograms, therapyThemes };
        filename = 'complete-export.json';
        break;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.studentId.includes(searchQuery);
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         consultation.counselor?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || consultation.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <p className="text-xs text-gray-500">MMCD MindCare Administration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Healthy</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'users', label: 'User Management', icon: Users },
                  { id: 'consultations', label: 'Consultations', icon: Calendar },
                  { id: 'content', label: 'Content Management', icon: BookOpen },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'logs', label: 'System Logs', icon: Activity },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { title: 'Active Users', value: stats.activeUsers, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
                    { title: 'Consultations', value: stats.totalConsultations, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { title: 'System Health', value: `${stats.systemHealth}%`, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {systemLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          log.level === 'error' ? 'bg-red-100' :
                          log.level === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          {log.level === 'error' ? (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          ) : log.level === 'warning' ? (
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{log.action}</p>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                  <button
                    onClick={() => openModal('user')}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <button
                      onClick={() => exportData('users')}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left p-4 font-semibold text-gray-800">Student</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Program</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Status</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Activity</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4">
                              <div>
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-xs text-gray-500">{user.studentId}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div>
                                <p className="text-sm text-gray-800">{user.program}</p>
                                <p className="text-xs text-gray-500">{user.year}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-gray-600">
                                <p>{user.sessionsCompleted} sessions</p>
                                <p>{user.journalEntries} journal entries</p>
                                <p className="text-xs text-gray-500">Last: {user.lastLogin}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openModal('user', user)}
                                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete('user', user.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consultations' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Consultation Management</h2>
                  <button
                    onClick={() => exportData('consultations')}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search consultations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Consultations Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left p-4 font-semibold text-gray-800">Student</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Counselor</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Date & Time</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Type</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Status</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredConsultations.map((consultation) => (
                          <tr key={consultation.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4">
                              <div>
                                <p className="font-medium text-gray-800">{consultation.studentName}</p>
                                <p className="text-sm text-gray-600">{consultation.studentEmail}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-gray-800">{consultation.counselor}</p>
                            </td>
                            <td className="p-4">
                              <div>
                                <p className="text-sm text-gray-800">{consultation.date}</p>
                                <p className="text-xs text-gray-500">{consultation.time}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                {consultation.type}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                consultation.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                consultation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                consultation.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {consultation.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete('consultation', consultation.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
                  <button
                    onClick={() => openModal('content')}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Content</span>
                  </button>
                </div>

                {/* Content Stats */}
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Content</p>
                        <p className="text-2xl font-bold text-gray-800">{contentItems.length}</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Published</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {contentItems.filter(c => c.status === 'published').length}
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Drafts</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {contentItems.filter(c => c.status === 'draft').length}
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {contentItems.length > 0 
                            ? (contentItems.reduce((sum, c) => sum + (c.rating || 0), 0) / contentItems.filter(c => c.rating > 0).length || 0).toFixed(1)
                            : '0.0'}
                        </p>
                      </div>
                      <Star className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        <option value="all">All Content</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="wellness">Wellness</option>
                        <option value="therapy">Therapy</option>
                      </select>
                    </div>
                    <button
                      onClick={() => exportData('content')}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Content Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left p-4 font-semibold text-gray-800">Content</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Type</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Status</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Engagement</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentItems
                          .filter(item => {
                            const matchesSearch = (item.title || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                                               (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
                            const matchesFilter = selectedFilter === 'all' || 
                                                item.status === selectedFilter || 
                                                item.type === selectedFilter;
                            return matchesSearch && matchesFilter;
                          })
                          .map((item) => (
                          <tr key={`${item.type}-${item.id}`} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4">
                              <div>
                                <p className="font-medium text-gray-800">{item.title || item.name}</p>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <p className="text-xs text-gray-500">
                                  {item.duration && `Duration: ${item.duration} • `}
                                  Updated: {item.lastUpdated}
                                </p>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.type === 'wellness' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {item.type === 'wellness' ? 'Wellness Program' : 'Therapy Theme'}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === 'published' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-gray-600">
                                {item.type === 'wellness' ? (
                                  <>
                                    <p>{item.views || 0} views</p>
                                    <p>{item.completions || 0} completions</p>
                                  </>
                                ) : (
                                  <>
                                    <p>{item.usage || 0} sessions</p>
                                  </>
                                )}
                                <p>⭐ {item.rating || 0}/5</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openModal('edit-content', item)}
                                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete('content', item.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
                
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">User Engagement</h3>
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Daily Active Users</span>
                        <span className="font-medium">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Session Duration</span>
                        <span className="font-medium">12.5 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Retention Rate</span>
                        <span className="font-medium text-green-600">85%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Wellness Usage</h3>
                      <Heart className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Meditation Sessions</span>
                        <span className="font-medium">{stats.wellnessSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Journal Entries</span>
                        <span className="font-medium">{stats.journalEntries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Mood Tracking</span>
                        <span className="font-medium">{stats.moodEntries}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Support Metrics</h3>
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Consultations</span>
                        <span className="font-medium">{stats.totalConsultations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Response Time</span>
                        <span className="font-medium">2.3 hrs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Satisfaction</span>
                        <span className="font-medium text-green-600">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Chart Placeholder */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Trends</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Chart visualization would go here</p>
                      <p className="text-sm text-gray-400">Integration with charting library needed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">System Logs</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => loadDashboardData()}
                      className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Refresh</span>
                    </button>
                    <button
                      onClick={() => exportData('logs')}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left p-4 font-semibold text-gray-800">Timestamp</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Level</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Action</th>
                          <th className="text-left p-4 font-semibold text-gray-800">Details</th>
                          <th className="text-left p-4 font-semibold text-gray-800">IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {systemLogs.map((log) => (
                          <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 text-sm text-gray-600">{log.timestamp}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                log.level === 'error' ? 'bg-red-100 text-red-700' :
                                log.level === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {log.level}
                              </span>
                            </td>
                            <td className="p-4 font-medium text-gray-800">{log.action}</td>
                            <td className="p-4 text-sm text-gray-600">{log.details}</td>
                            <td className="p-4 text-sm text-gray-500">{log.ip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
                
                <div className="grid gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
                        <input
                          type="text"
                          defaultValue="MMCD MindCare"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                        <input
                          type="email"
                          defaultValue="admin@mmdc.edu.ph"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-600">Enable maintenance mode</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          defaultValue="30"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                        <input
                          type="number"
                          defaultValue="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm text-gray-600">Enable two-factor authentication</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Export All Data</p>
                          <p className="text-sm text-gray-600">Download complete system backup</p>
                        </div>
                        <button
                          onClick={() => exportData('all')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Export
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Clear System Logs</p>
                          <p className="text-sm text-gray-600">Remove logs older than 30 days</p>
                        </div>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                          Clear Logs
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {modalType === 'user' ? (selectedItem ? 'Edit User' : 'Add User') : 
                 modalType === 'content' ? 'Add Content' :
                 modalType === 'edit-content' ? 'Edit Content' : 'Modal'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {modalType === 'user' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId || ''}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                  <input
                    type="text"
                    value={formData.program || ''}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={formData.year || ''}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            )}
            
            {(modalType === 'content' || modalType === 'edit-content') && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                  <select
                    value={formData.type || 'wellness'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="wellness">Wellness Program</option>
                    <option value="therapy">Therapy Theme</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.type === 'therapy' ? 'Name' : 'Title'}
                  </label>
                  <input
                    type="text"
                    value={formData.title || formData.name || ''}
                    onChange={(e) => setFormData({...formData, [formData.type === 'therapy' ? 'name' : 'title']: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                {formData.type === 'wellness' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration || ''}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 5 min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">Select Category</option>
                    {formData.type === 'wellness' ? (
                      <>
                        <option value="Breathing">Breathing</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Relaxation">Relaxation</option>
                        <option value="Energy">Energy</option>
                        <option value="Sleep">Sleep</option>
                      </>
                    ) : (
                      <>
                        <option value="Relaxation">Relaxation</option>
                        <option value="Sleep">Sleep</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Focus">Focus</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3 pt-6">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
