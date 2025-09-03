import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User,
  Video,
  Phone,
  MessageSquare,
  Star,
  Shield,
  CheckCircle,
  Plus,
  Filter,
  Search
} from 'lucide-react';

const Consultation = () => {
  const navigate = useNavigate();
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

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
      rate: "$80/hour",
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
      rate: "$75/hour",
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
      rate: "$85/hour",
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
      rate: "$90/hour",
      bio: "Specializes in psychiatric medication management for students with complex mental health needs. Collaborative approach with therapy providers."
    }
  ];

  const specialties = ['all', 'Anxiety', 'Depression', 'Student Stress', 'Trauma Therapy', 'Family Therapy', 'Medication Management'];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const upcomingAppointments = [
    {
      id: 1,
      counselor: "Dr. Maria Santos",
      date: "2024-01-18",
      time: "2:00 PM",
      type: "video",
      status: "confirmed"
    },
    {
      id: 2,
      counselor: "Dr. Sarah Chen",
      date: "2024-01-25",
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

  const handleBooking = () => {
    if (selectedCounselor && selectedDate && selectedTime) {
      // Here you would process the booking
      alert(`Booking confirmed with ${selectedCounselor.name} on ${selectedDate} at ${selectedTime}`);
      setSelectedCounselor(null);
      setSelectedDate('');
      setSelectedTime('');
    }
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
                Upcoming Appointments
              </h3>
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
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Get Immediate Help
              </button>
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
                      { type: 'phone', icon: Phone, label: 'Phone' },
                      { type: 'chat', icon: MessageSquare, label: 'Chat' }
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
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg border transition-all text-sm ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
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
      </div>
    </div>
  );
};

export default Consultation;