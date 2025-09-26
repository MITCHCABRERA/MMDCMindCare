import React, { useState, useEffect } from 'react';
import { useAuth } from "../components/auth/useAuth";
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MessageCircle, 
  Bell, 
  User,
  Clock,
  CheckCircle,
  X,
  Video,
  Phone,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Stethoscope,
  Send,
  Plus
} from 'lucide-react';

const DoctorPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [chatNotifications, setChatNotifications] = useState([]);

  useEffect(() => {
    // Check if doctor is logged in
    //const doctorSession = localStorage.getItem('doctor-session');
    //if (!doctorSession) {
    //  navigate('/doctor-login');
    //  return;
    //}

    // Load bookings and notifications
    loadBookings();
    loadNotifications();
    loadChatNotifications();
  }, [navigate]);

  const loadBookings = () => {
    const savedBookings = JSON.parse(localStorage.getItem('consultation-bookings') || '[]');
    setBookings(savedBookings);
  };

  const loadNotifications = () => {
    const savedNotifications = JSON.parse(localStorage.getItem('doctor-notifications') || '[]');
    setNotifications(savedNotifications);
  };

  const loadChatNotifications = () => {
    const savedChatNotifications = JSON.parse(localStorage.getItem('doctor-notifications') || '[]')
      .filter(notification => notification.type === 'chat_message');
    setChatNotifications(savedChatNotifications);
  };

  const confirmBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        const meetLink = `https://meet.google.com/abc-defg-hij`;
        return { ...booking, status: 'confirmed', meetLink };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    localStorage.setItem('consultation-bookings', JSON.stringify(updatedBookings));
    
    // Add notification for student
    const booking = bookings.find(b => b.id === bookingId);
    const studentNotification = {
      id: Date.now(),
      type: 'booking_confirmed',
      title: 'Session Confirmed',
      message: `Your session with ${booking.counselor} on ${booking.date} at ${booking.time} has been confirmed.`,
      meetLink: `https://meet.google.com/abc-defg-hij`,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const existingNotifications = JSON.parse(localStorage.getItem('user-notifications') || '[]');
    localStorage.setItem('user-notifications', JSON.stringify([studentNotification, ...existingNotifications]));
  };

  const rejectBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'rejected' };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    localStorage.setItem('consultation-bookings', JSON.stringify(updatedBookings));
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim() || !selectedBooking) return;

    const newMessage = {
      id: Date.now(),
      sender: 'doctor',
      message: chatMessage,
      timestamp: new Date().toISOString()
    };

    const bookingId = selectedBooking.id;
    const updatedMessages = {
      ...chatMessages,
      [bookingId]: [...(chatMessages[bookingId] || []), newMessage]
    };

    setChatMessages(updatedMessages);
    localStorage.setItem('chat-messages', JSON.stringify(updatedMessages));
    setChatMessage('');
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();         
    navigate('/');    // go back to landing page
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const todayBookings = bookings.filter(booking => {
    const today = new Date().toISOString().split('T')[0];
    return booking.date === today;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Doctor Panel</h1>
                <p className="text-xs text-gray-500">MMDC MindCare Professional</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowChatPanel(!showChatPanel)}
                className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Bell className="w-6 h-6" />
                {(notifications.length > 0 || chatNotifications.filter(n => !n.read).length > 0) && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
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

      {/* Chat Notifications Panel */}
      {showChatPanel && (
        <div className="fixed top-16 right-4 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Chat Messages</h3>
              <button
                onClick={() => setShowChatPanel(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {chatNotifications.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No chat messages yet</p>
            ) : (
              <div className="space-y-3">
                {chatNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                      notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                    onClick={() => {
                      // Mark as read and open chat
                      const updatedNotifications = JSON.parse(localStorage.getItem('doctor-notifications') || '[]').map(n => 
                        n.id === notification.id ? { ...n, read: true } : n
                      );
                      localStorage.setItem('doctor-notifications', JSON.stringify(updatedNotifications));
                      loadChatNotifications();
                      setActiveTab('chat');
                      setShowChatPanel(false);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm text-gray-800">{notification.title}</p>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <nav className="space-y-2">
                {[
                  { id: 'bookings', label: 'Bookings', icon: Calendar },
                  { id: 'chat', label: 'Patient Chat', icon: MessageCircle },
                  { id: 'calendar', label: 'Calendar', icon: Calendar },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
              {todayBookings.length === 0 ? (
                <p className="text-gray-500 text-sm">No appointments today</p>
              ) : (
                <div className="space-y-3">
                  {todayBookings.map((booking) => (
                    <div key={booking.id} className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-gray-800 text-sm">{booking.studentName}</p>
                      <p className="text-sm text-gray-600">{booking.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Patient Bookings</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Total: {bookings.length}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No bookings yet</p>
                    </div>
                  ) : (
                    bookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800">{booking.studentName}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Video className="w-4 h-4" />
                                <span>{booking.type}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{booking.studentEmail}</span>
                              </div>
                            </div>
                            {booking.meetLink && (
                              <div className="mb-4">
                                <a
                                  href={booking.meetLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  Join Google Meet →
                                </a>
                              </div>
                            )}
                          </div>
                          
                          {booking.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => confirmBooking(booking.id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Confirm</span>
                              </button>
                              <button
                                onClick={() => rejectBooking(booking.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                              >
                                <X className="w-4 h-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          )}
                          
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Chat</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">All Patient Chats</h2>
                
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Chat List */}
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Chats</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {Object.keys(chatMessages).length === 0 ? (
                        <p className="text-gray-500 text-sm">No active chats</p>
                      ) : (
                        Object.keys(chatMessages).map((chatId) => {
                          const messages = chatMessages[chatId] || [];
                          const lastMessage = messages[messages.length - 1];
                          const chatInfo = bookings.find(b => b.id.toString() === chatId) || {
                            studentName: `Student ${chatId}`,
                            studentEmail: 'student@mmdc.edu.ph'
                          };
                          
                          return (
                            <button
                              key={chatId}
                              onClick={() => setSelectedBooking({ ...chatInfo, id: chatId })}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedBooking?.id.toString() === chatId
                                  ? 'bg-blue-50 border-blue-200'
                                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-gray-800 text-sm">{chatInfo.studentName}</p>
                                {lastMessage && (
                                  <span className="text-xs text-gray-500">
                                    {new Date(lastMessage.timestamp).toLocaleTimeString()}
                                  </span>
                                )}
                              </div>
                              {lastMessage && (
                                <p className="text-xs text-gray-600 truncate">
                                  {lastMessage.sender === 'doctor' ? 'You: ' : ''}{lastMessage.message}
                                </p>
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Chat Window */}
                  <div className="lg:col-span-2">
                    {selectedBooking ? (
                      <div className="border border-gray-200 rounded-xl overflow-hidden h-full">
                        <div className="bg-gray-50 p-4 border-b">
                          <h3 className="font-semibold text-gray-800">{selectedBooking.studentName}</h3>
                          <p className="text-sm text-gray-600">{selectedBooking.studentEmail}</p>
                        </div>
                        
                        <div className="h-96 overflow-y-auto p-4 space-y-4">
                          {(chatMessages[selectedBooking.id] || []).map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${
                                  msg.sender === 'doctor'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <p>{msg.message}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {new Date(msg.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-4 border-t bg-gray-50">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                              placeholder="Type your message..."
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={sendChatMessage}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-gray-200 rounded-xl">
                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Select a chat to start messaging</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendar View</h2>
                <div className="grid grid-cols-7 gap-4 mb-6">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - date.getDay() + i);
                    const dateStr = date.toISOString().split('T')[0];
                    const hasBooking = bookings.some(booking => booking.date === dateStr);
                    const dayBookings = bookings.filter(booking => booking.date === dateStr);
                    
                    return (
                      <div
                        key={i}
                        className={`p-2 text-center rounded-lg border ${
                          hasBooking 
                            ? 'bg-blue-50 border-blue-200 text-blue-800' 
                            : 'border-gray-200 text-gray-600'
                        } hover:bg-gray-50 cursor-pointer`}
                      >
                        <div className="text-sm">{date.getDate()}</div>
                        {hasBooking && (
                          <div className="mt-1 space-y-1">
                            {dayBookings.slice(0, 2).map((booking, idx) => (
                              <div key={idx} className="text-xs bg-blue-500 text-white rounded px-1 py-0.5 truncate">
                                {booking.time} - {booking.studentName.split(' ')[0]}
                              </div>
                            ))}
                            {dayBookings.length > 2 && (
                              <div className="text-xs text-blue-600">+{dayBookings.length - 2} more</div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600">{bookings.length}</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="text-3xl font-bold text-green-600">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </div>
                    <div className="text-sm text-gray-600">Confirmed</div>
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-xl">
                    <div className="text-3xl font-bold text-yellow-600">
                      {bookings.filter(b => b.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week's Sessions</h3>
                    <div className="space-y-2">
                      {bookings
                        .filter(booking => {
                          const bookingDate = new Date(booking.date);
                          const today = new Date();
                          const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                          const weekEnd = new Date(weekStart);
                          weekEnd.setDate(weekStart.getDate() + 6);
                          return bookingDate >= weekStart && bookingDate <= weekEnd;
                        })
                        .map((booking) => (
                          <div key={booking.id} className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-sm text-gray-700">{booking.studentName}</span>
                            <span className="text-xs text-gray-500">{booking.date} {booking.time}</span>
                          </div>
                        ))}
                      {bookings.filter(booking => {
                        const bookingDate = new Date(booking.date);
                        const today = new Date();
                        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekStart.getDate() + 6);
                        return bookingDate >= weekStart && bookingDate <= weekEnd;
                      }).length === 0 && (
                        <p className="text-gray-500 text-sm">No sessions this week</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Types</h3>
                    <div className="space-y-3">
                      {['video', 'phone', 'chat'].map((type) => {
                        const count = bookings.filter(b => b.type === type).length;
                        const percentage = bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0;
                        return (
                          <div key={type} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 capitalize">{type}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          defaultValue="Dr. Maria Santos"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                        <input 
                          type="text" 
                          defaultValue="Clinical Psychology"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Monday - Friday</span>
                        <input 
                          type="text" 
                          defaultValue="9:00 AM - 5:00 PM"
                          className="px-3 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Saturday</span>
                        <input 
                          type="text" 
                          defaultValue="9:00 AM - 1:00 PM"
                          className="px-3 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span className="text-sm text-gray-700">Email notifications for new bookings</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span className="text-sm text-gray-700">SMS reminders for upcoming sessions</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-sm text-gray-700">Weekly analytics reports</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPanel;