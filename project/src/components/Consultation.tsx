import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./auth/useAuth";
import EmergencySupport from './dashboard/EmergencySupport';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User,
  Video,
  PhoneCall,
  MessagesSquare,
  Star,
  Shield,
  CheckCircle,
  Plus,
  Filter,
  Search,
  MessageCircle,
  Send,
  X
} from 'lucide-react';

const Consultation = () => {
  const navigate = useNavigate();
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [currentChatMessage, setCurrentChatMessage] = useState('');
  const [selectedChatBooking, setSelectedChatBooking] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showEmergencySupport, setShowEmergencySupport] = useState(false);
  

const cleanupExpiredChats = () => {
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Get all chat messages
    const allChatMessages = JSON.parse(localStorage.getItem('chat-messages') || '{}');
    const updatedChatMessages = {};
    
    // Filter out expired conversations
    Object.keys(allChatMessages).forEach(chatId => {
      const messages = allChatMessages[chatId];
      if (messages && messages.length > 0) {
        // Check if the last message is within 24 hours
        const lastMessage = messages[messages.length - 1];
        const messageTime = new Date(lastMessage.timestamp).getTime();
        
        if (now - messageTime < twentyFourHours) {
          updatedChatMessages[chatId] = messages;
        }
      }
    });
    
    // Update localStorage with filtered messages
    localStorage.setItem('chat-messages', JSON.stringify(updatedChatMessages));
    setChatMessages(updatedChatMessages);
  };
  

  const counselors = [
    {
      id: 1,
      name: "Dr. Maria Santos",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Student Stress"],
      rating: 4.9,
      reviews: 127,
      experience: "10+ years",
      languages: ["English", "Filipino"],
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
      nextAvailable: "Today, 2:00 PM",
      rate: "₱599/hour",
      bio: "Specializes in helping students manage academic stress and mental health challenges. Uses evidence-based approaches including CBT and mindfulness techniques."
    },
    {
      id: 2,
      name: "Dr. John Rivera",
      title: "Licensed Professional Counselor",
      specialties: ["Trauma Therapy", "PTSD", "Crisis Intervention"],
      rating: 4.8,
      reviews: 89,
      experience: "8+ years",
      languages: ["English", "Spanish"],
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
      nextAvailable: "Tomorrow, 10:00 AM",
      rate: "₱799/hour",
      bio: "Experienced in trauma-informed care and crisis intervention. Passionate about helping students overcome difficult experiences and build resilience."
    },
    {
      id: 3,
      name: "Dr. Sarah Chen",
      title: "Clinical Social Worker",
      specialties: ["Family Therapy", "Relationship Counseling", "Social Anxiety"],
      rating: 4.9,
      reviews: 156,
      experience: "12+ years",
      languages: ["English", "Mandarin"],
      image: "https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=400",
      nextAvailable: "Today, 4:30 PM",
      rate: "₱599/hour",
      bio: "Focuses on helping students navigate relationships and social challenges. Integrates family systems theory with individual counseling approaches."
    },
    {
      id: 4,
      name: "Dr. Michael Torres",
      title: "Psychiatric Nurse Practitioner",
      specialties: ["Medication Management", "Bipolar Disorder", "ADHD"],
      rating: 4.7,
      reviews: 73,
      experience: "6+ years",
      languages: ["English", "Filipino"],
      image: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400",
      nextAvailable: "Next Week, Mon 9:00 AM",
      rate: "₱699/hour",
      bio: "Specializes in psychiatric medication management for students with complex mental health needs. Collaborative approach with therapy providers."
    }
  ];

  // Load notifications on component mount
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('user-notifications') || '[]');
    setNotifications(savedNotifications);
    
    // Load chat messages
    const savedChatMessages = JSON.parse(localStorage.getItem('chat-messages') || '{}');
    setChatMessages(savedChatMessages);

  // Clean up expired chats
    cleanupExpiredChats();
  }, []);

  const specialties = ['all', 'Anxiety', 'Depression', 'Student Stress', 'Trauma Therapy', 'Family Therapy', 'Medication Management'];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '10;30 PM'
  ];

  // Helper function to check if a time slot is in the past
  const isTimeSlotPast = (timeSlot) => {
    if (!selectedDate) return false;
    
    const today = new Date();
    const selected = new Date(selectedDate);
    
    if (selected.toDateString() !== today.toDateString()) {
      return false;
    }
    
    //check if the time has passed
    const [time, period] = timeSlot.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    //24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    const slotTime = new Date(selected);
    slotTime.setHours(hours, minutes, 0, 0);
    
    return slotTime < today;
  };
  const handleEmergencyCall = () => {
    // Find available doctor (first one for demo)
    const availableDoctor = counselors[0];
    
    // Create emergency call notification for doctor
    const emergencyNotification = {
      id: Date.now(),
      type: 'emergency_call',
      title: 'EMERGENCY CALL',
      sender: 'student',
      read: false,
      priority: 'high'
    };
    
    const existingDoctorNotifications = JSON.parse(localStorage.getItem('doctor-notifications') || '[]');
    localStorage.setItem('doctor-notifications', JSON.stringify([emergencyNotification, ...existingDoctorNotifications]));
    
    // Simulate call initiation
    alert(`Emergency call initiated to ${availableDoctor.name}. Please stay on the line.`);
    
    // In a real app, this would initiate an actual call
    window.open(`tel:+1234567890`, '_self');
  };

  const upcomingAppointments = [
    {
      id: 1,
      counselor: "Dr. Maria Santos",
      date: "2025-10-03",
      time: "2:00 PM",
      type: "video",
      status: "confirmed"
    },
    {
      id: 2,
      counselor: "Dr. Sarah Chen",
      date: "2025-11-25",
      time: "4:30 PM", 
      type: "video",
      status: "pending"
    }
  ];

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         counselor.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = filterSpecialty === 'all' || counselor.specialties.includes(filterSpecialty);
    return matchesSearch && matchesSpecialty;
  });

   const { user } = useAuth();

  const handleBooking = () => {
    if (selectedCounselor && selectedDate && selectedTime) {
      const newBooking = {
        id: Date.now(),
        studentName: user?.name || "Anonymous User",
        studentEmail: user?.email || "no-email@mmdc.edu.ph",
        counselor: selectedCounselor.name,
        date: selectedDate,
        time: selectedTime,
        type: consultationType,
        status: "pending",
        timestamp: new Date().toISOString(),
      };

      // Save booking
      const existingBookings = JSON.parse(localStorage.getItem('consultation-bookings') || '[]');
      localStorage.setItem('consultation-bookings', JSON.stringify([newBooking, ...existingBookings]));

      // Add notification for doctor
      const doctorNotification = {
        id: Date.now(),
        type: 'new_booking',
        title: 'New Booking Request',
        message: `New consultation request from ${newBooking.studentName} for ${selectedDate} at ${selectedTime}`,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      const existingDoctorNotifications = JSON.parse(localStorage.getItem('doctor-notifications') || '[]');
      localStorage.setItem('doctor-notifications', JSON.stringify([doctorNotification, ...existingDoctorNotifications]));

      // Add confirmation notification for student
      const studentNotification = {
        id: Date.now() + 1,
        type: 'booking_sent',
        title: 'Booking Request Sent',
        message: `Your consultation request with ${selectedCounselor.name} has been sent. You'll receive a confirmation soon.`,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      const updatedNotifications = [studentNotification, ...notifications];
      setNotifications(updatedNotifications);
      localStorage.setItem('user-notifications', JSON.stringify(updatedNotifications));
      
      setSelectedCounselor(null);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim() || !selectedChatBooking) return;

    const newMessage = {
      id: Date.now(),
      sender: 'student',
      message: chatMessage,
      timestamp: new Date().toISOString()
    };

    // Update chat messages
    const updatedChatMessages = {
      ...chatMessages,
      [selectedChatBooking.id]: [...(chatMessages[selectedChatBooking.id] || []), newMessage]
    };
    setChatMessages(updatedChatMessages);
    localStorage.setItem('chat-messages', JSON.stringify(updatedChatMessages));

    // Create notification for doctor
    const doctorNotification = {
      id: Date.now(),
      type: 'chat_message',
      title: 'New Chat Message',
      message: `New message from student in consultation with ${selectedChatBooking.counselor}`,
      timestamp: new Date().toISOString(),
      read: false,
      chatId: selectedChatBooking.id
    };

    const existingDoctorNotifications = JSON.parse(localStorage.getItem('doctor-notifications') || '[]');
    localStorage.setItem('doctor-notifications', JSON.stringify([doctorNotification, ...existingDoctorNotifications]));

    // Clear input
    setChatMessage('');
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
            <h1 className="text-xl font-semibold text-gray-800">Virtual Consultations</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Book a Private Consultation
              </h1>
              <p className="text-gray-600 text-lg">
                Connect with licensed mental health professionals for personalized support and guidance.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search counselors by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty === 'all' ? 'All Specialties' : specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Counselors Grid */}
            <div className="space-y-6">
              {filteredCounselors.map((counselor) => (
                <div key={counselor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={counselor.image}
                        alt={counselor.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                              {counselor.name}
                            </h3>
                            <p className="text-gray-600 mb-2">{counselor.title}</p>
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600">{counselor.rating}</span>
                                <span className="text-sm text-gray-500">({counselor.reviews} reviews)</span>
                              </div>
                              <span className="text-sm text-gray-500">{counselor.experience}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-800">{counselor.rate}</p>
                            <p className="text-sm text-green-600">{counselor.nextAvailable}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {counselor.specialties.map((specialty, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{counselor.bio}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>Languages:</span>
                            <span>{counselor.languages.join(', ')}</span>
                          </div>
                          <button
                            onClick={() => setSelectedCounselor(counselor)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            Book Session
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Notifications & Appointments
              </h3>
              
              {/* Notifications */}
              {notifications.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Notifications</h4>
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className={`p-3 rounded-lg border ${
                        notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                      }`}>
                        <p className="font-medium text-sm text-gray-800">{notification.title}</p>
                        <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
                        {notification.meetLink && (
                          <a
                            href={notification.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                          >
                            Join Meeting →
                          </a>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Appointments */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Upcoming Appointments</h4>
                {upcomingAppointments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No upcoming appointments</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-800 text-sm">{appointment.counselor}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat with Doctor */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
                Chat with Doctor
              </h3>
              {(() => {
                const confirmedBookings = JSON.parse(localStorage.getItem('consultation-bookings') || '[]')
                  .filter(b => b.status === 'confirmed');
                
                // Filter bookings to only show those with recent chat activity (within 24 hours)
                const recentChatBookings = confirmedBookings.filter(booking => {
                  const bookingChatMessages = chatMessages[booking.id];
                  if (!bookingChatMessages || bookingChatMessages.length === 0) {
                    return false; // No chat messages, don't show
                  }
                  
                  // Check if the last message is within 24 hours
                  const lastMessage = bookingChatMessages[bookingChatMessages.length - 1];
                  const lastMessageTime = new Date(lastMessage.timestamp).getTime();
                  const now = new Date().getTime();
                  const twentyFourHours = 24 * 60 * 60 * 1000;
                  
                  return (now - lastMessageTime) < twentyFourHours;
                });
                
                return recentChatBookings.length > 0;
              })() ? (
                <div className="space-y-3">
                  {(() => {
                    const confirmedBookings = JSON.parse(localStorage.getItem('consultation-bookings') || '[]')
                      .filter(b => b.status === 'confirmed');
                    
                    // Filter bookings to only show those with recent chat activity (within 24 hours)
                    const recentChatBookings = confirmedBookings.filter(booking => {
                      const bookingChatMessages = chatMessages[booking.id];
                      if (!bookingChatMessages || bookingChatMessages.length === 0) {
                        return false; // No chat messages, don't show
                      }
                      
                      // Check if the last message is within 24 hours
                      const lastMessage = bookingChatMessages[bookingChatMessages.length - 1];
                      const lastMessageTime = new Date(lastMessage.timestamp).getTime();
                      const now = new Date().getTime();
                      const twentyFourHours = 24 * 60 * 60 * 1000;
                      
                      return (now - lastMessageTime) < twentyFourHours;
                    });
                    
                    return recentChatBookings;
                  })()
                    .map((appointment) => (
                    <button
                      key={appointment.id}
                      onClick={() => {
                        setSelectedChatBooking(appointment);
                        setShowChatModal(true);
                      }}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{appointment.counselor}</p>
                          <p className="text-xs text-gray-500">
                            {(() => {
                              const bookingChatMessages = chatMessages[appointment.id];
                              if (bookingChatMessages && bookingChatMessages.length > 0) {
                                const lastMessage = bookingChatMessages[bookingChatMessages.length - 1];
                                const lastMessageTime = new Date(lastMessage.timestamp).getTime();
                                const now = new Date().getTime();
                                const hoursAgo = Math.floor((now - lastMessageTime) / (1000 * 60 * 60));
                                
                                if (hoursAgo < 1) {
                                  return 'Active now';
                                } else {
                                  return `${hoursAgo}h ago`;
                                }
                              }
                              return 'Click to chat';
                            })()}
                          </p>
                        </div>
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                    ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-2">No recent conversations</p>
                  <p className="text-xs text-gray-400">Conversations are available for 24 hours after the last message</p>
                </div>
              )}
            </div>

            {/* Security & Privacy */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Privacy & Security
              </h3>
              <div className="space-y-3">
                {[
                  "End-to-end encrypted video calls",
                  "HIPAA compliant platform",
                  "No session recordings",
                  "Complete confidentiality"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Crisis Support</h3>
              <p className="text-sm text-red-700 mb-4">
                If you're experiencing a mental health emergency, don't wait for an appointment.
              </p>
              <button 
              onClick={() => setShowEmergencySupport(!showEmergencySupport)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Get Immediate Help
              </button>
               {showEmergencySupport && <EmergencySupport />}
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {selectedCounselor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Book Session with {selectedCounselor.name}
              </h3>
              
              <div className="space-y-4">
                {/* Session Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'video', icon: Video, label: 'Video' },
                      { type: 'phone', icon: PhoneCall, label: 'Phone' },
                      { type: 'chat', icon: MessagesSquare, label: 'Chat' }
                    ].map((option) => (
                      <button
                        key={option.type}
                        onClick={() => setConsultationType(option.type)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          consultationType === option.type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <option.icon className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                    {timeSlots.map((time) => {
                      const isPast = isTimeSlotPast(time);
                      return (
                        <button
                          key={time}
                          onClick={() => !isPast && setSelectedTime(time)}
                          disabled={isPast}
                          className={`p-2 rounded-lg border transition-all text-sm ${
                            isPast
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : selectedTime === time
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setSelectedCounselor(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {showChatModal && selectedChatBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Chat with {selectedChatBooking.counselor}
                </h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto max-h-96">
                <div className="space-y-3">
                  {(chatMessages[selectedChatBooking.id] || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.sender === 'student'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(chatMessages[selectedChatBooking.id] || []).length === 0 && (
                    <p className="text-gray-500 text-center text-sm">No messages yet. Start the conversation!</p>
                  )}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultation;
