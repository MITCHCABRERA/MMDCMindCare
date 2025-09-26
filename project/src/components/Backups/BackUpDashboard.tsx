// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import EmergencySupport from './EmergencySupport';
// import { 
//   Brain, 
//   Heart, 
//   BookOpen, 
//   MessageCircle, 
//   Calendar,
//   Search,
//   Sparkles,
//   User,
//   Settings,
//   Bell,
//   TrendingUp,
//   Activity,
//   Shield,
//   Download,
//   BarChart3,
//   Smile,
//   Clock,
//   X
// } from 'lucide-react';

// const searchItems = [
//   "Wellness Tutorials",
//   "Digital Journal",
//   "AI Support Chat",
//   "Light & Sound Therapy",
//   "Book Consultation",
//   "Mood Tracker",
//   "Privacy Settings",
//   "Download Records",
//   "Account Settings",
//   "Student Portal",
// ];

// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [currentMood, setCurrentMood] = useState('😊');
//   const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showEmergencySupport, setShowEmergencySupport] = useState(false);


// // Search logic
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const query = e.target.value;
//   setSearchQuery(query);
//   if (query.length > 0) {
//     const filtered = searchItems.filter(item =>
//       item.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredSuggestions(filtered);
//     setShowSuggestions(true);
//   } else {
//     setFilteredSuggestions([]);
//     setShowSuggestions(false);
//   }
// };

//   // 🔄 Monthly reset logic
//   useEffect(() => {
//     const now = new Date();
//     const currentMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;

//     const lastResetMonth = localStorage.getItem("last-reset-month");

//     if (lastResetMonth !== currentMonth) {
//       localStorage.setItem("wellness-completed-sessions", JSON.stringify([]));
//       localStorage.setItem("journal-entries", JSON.stringify([]));
//       localStorage.setItem("mood-entries", JSON.stringify([]));
//       localStorage.setItem("sessions-completed", JSON.stringify([]));
//       localStorage.setItem("last-reset-month", currentMonth);
//     }
//   }, []);

//   // ✅ Load initial data (mood + notifications)
//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
//     const todayEntry = moodEntries.find((entry: any) => entry.date === today);
//     if (todayEntry) {
//       setCurrentMood(todayEntry.mood);
//     }

//     const savedNotifications = JSON.parse(localStorage.getItem('user-notifications') || '[]');
//     setNotifications(savedNotifications);
//   }, []);

//   const quickActions = [
//     {
//       icon: Heart,
//       title: "Wellness Tutorials",
//       description: "Guided meditation & breathing",
//       color: "bg-pink-500",
//       route: "/wellness"
//     },
//     {
//       icon: BookOpen,
//       title: "Digital Journal",
//       description: "Record your thoughts",
//       color: "bg-green-500",
//       route: "/journal"
//     },
//     {
//       icon: MessageCircle,
//       title: "AI Support Chat",
//       description: "24/7 emotional assistance",
//       color: "bg-purple-500",
//       route: "/chatbot"
//     },
//     {
//       icon: Sparkles,
//       title: "Light & Sound Therapy",
//       description: "Calming audio-visuals",
//       color: "bg-indigo-500",
//       route: "/therapy"
//     },
//     {
//       icon: Calendar,
//       title: "Book Consultation",
//       description: "Private counselor sessions",
//       color: "bg-teal-500",
//       route: "/consultation"
//     },
//     {
//       icon: BarChart3,
//       title: "Mood Tracker",
//       description: "Track your mental health",
//       color: "bg-blue-500",
//       route: "/mood-tracker"
//     }
//   ];

//   const recentActivity = [
//     { action: "Completed breathing exercise", time: "2 hours ago", icon: Heart },
//     { action: "Journal entry added", time: "Yesterday", icon: BookOpen },
//     { action: "Chatbot conversation", time: "2 days ago", icon: MessageCircle },
//     { action: "Mood check-in completed", time: "3 days ago", icon: Smile }
//   ];

//   const moodOptions = ['😢', '😐', '😊', '😄', '🤗'];

//   const handleSaveMoods = (selectedMood: string) => {
//     const today = new Date().toISOString().split('T')[0];
//     const currentTime = new Date().toLocaleTimeString();
//     const moodValue = moodOptions.indexOf(selectedMood) + 1;

//     const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]');

//     const newEntry = {
//       id: Date.now(),
//       date: today,
//       mood: selectedMood,
//       value: moodValue,
//       note: `Quick mood check-in at ${currentTime}`
//     };

//     const updatedEntries = [newEntry, ...moodEntries].sort(
//       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//     );
//     localStorage.setItem('mood-entries', JSON.stringify(updatedEntries));

//     alert(`Mood ${selectedMood} saved successfully!`);
//     setCurrentMood(selectedMood);
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Navigation Header */}
//       <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//                 <Brain className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-800">MMDC MindCare</h1>
//                 <p className="text-xs text-gray-500">Dashboard</p>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="flex-1 max-w-md mx-8">
//               <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                  <input
//                   type="text"
//                   placeholder="Search tools, resources, or ask a question..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
//                   onFocus={() => {
//                     if (filteredSuggestions.length > 0) setShowSuggestions(true);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//     />
//                {showSuggestions && filteredSuggestions.length > 0 && (
//                 <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-lg">
//                   {filteredSuggestions.map((suggestion, index) => (
//                      <li
//                      key={index}
//                      onMouseDown={() => {
//                       setSearchQuery(suggestion);
//                       setShowSuggestions(false);
//                       // Optionally navigate or trigger search here
//             }}
//                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
//                     >
//             {suggestion}
//               </li>
//         ))}
//       </ul>
//     )}
//   </div>
//   </div>

//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <Bell className="w-6 h-6" />
//                 {notifications.filter(n => !n.read).length > 0 && (
//                   <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
//                 )}
//               </button>
//               <button
//                 onClick={() => navigate('/')}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
//               >
//                 <span>Logout</span>
//               </button>
//               <button
//                 onClick={() => navigate('/student-portal')}
//                 className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
//               >
//                 <User className="w-6 h-6 text-gray-600" />
//                 <span className="text-sm font-medium text-gray-700">Student Portal</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Notifications Dropdown */}
//       {showNotifications && (
//         <div className="fixed top-16 right-4 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
//               <button
//                 onClick={() => setShowNotifications(false)}
//                 className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//           <div className="p-4">
//             {notifications.length === 0 ? (
//               <p className="text-gray-500 text-sm text-center py-4">No notifications yet</p>
//             ) : (
//               <div className="space-y-3">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-3 rounded-lg border ${
//                       notification.read
//                         ? 'bg-gray-50 border-gray-200'
//                         : 'bg-blue-50 border-blue-200'
//                     }`}
//                   >
//                     <div className="flex items-start justify-between mb-2">
//                       <p className="font-medium text-sm text-gray-800">
//                         {notification.title}
//                       </p>
//                       {!notification.read && (
//                         <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-600 mb-2">
//                       {notification.message}
//                     </p>
//                     {notification.meetLink && (
//                       <a
//                         href={notification.meetLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:text-blue-700 text-xs font-medium inline-block mb-2"
//                       >
//                         Join Meeting →
//                       </a>
//                     )}
//                     <p className="text-xs text-gray-500">
//                       {new Date(notification.timestamp).toLocaleString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Welcome back! How are you feeling today?
//           </h1>
//           <p className="text-gray-600">
//             Track your wellness journey and access the support you need.
//           </p>
//         </div>

//         {/* Mood Check-in */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//             <Smile className="w-6 h-6 mr-2 text-blue-600" />
//             Quick Mood Check-in
//           </h2>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">How are you feeling?</span>
//             <div className="flex space-x-3">
//               {moodOptions.map((mood, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleSaveMoods(mood)}
//                   className="text-3xl p-2 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all"
//                 >
//                   {mood}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="mt-3 text-sm text-gray-600">
//             Click any mood to save it instantly. You can add multiple mood entries
//             throughout the day.
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           {[
//             {
//               title: "Wellness Streak",
//               value: `${JSON.parse(localStorage.getItem('wellness-completed-sessions') || '[]').length} sessions`,
//               icon: TrendingUp,
//               color: "text-green-600"
//             },
//             {
//               title: "Journal Entries",
//               value: `${JSON.parse(localStorage.getItem('journal-entries') || '[]').length}`,
//               icon: BookOpen,
//               color: "text-blue-600"
//             },
//             {
//               title: "Sessions Completed",
//               value: `${JSON.parse(localStorage.getItem('sessions-completed') || '[]').length}`,
//               icon: Activity,
//               color: "text-purple-600"
//             },
//             {
//               title: "Mood Entries",
//               value: `${JSON.parse(localStorage.getItem('mood-entries') || '[]').length}`,
//               icon: Smile,
//               color: "text-yellow-600"
//             }
//           ].map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
//                   <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//                 </div>
//                 <stat.icon className={`w-8 h-8 ${stat.color}`} />
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {/* Quick Actions */}
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
//               <div className="grid md:grid-cols-2 gap-6">
//                 {quickActions.map((action, index) => (
//                   <div
//                     key={index}
//                     onClick={() => navigate(action.route)}
//                     className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
//                   >
//                     <div className="flex items-start space-x-4">
//                       <div
//                         className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
//                       >
//                         <action.icon className="w-6 h-6 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                           {action.title}
//                         </h3>
//                         <p className="text-gray-600 text-sm">
//                           {action.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recommendations */}
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
//               <h2 className="text-xl font-bold mb-4">Today's Personalized Recommendations</h2>
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
//                   <Heart className="w-5 h-5" />
//                   <span>Try a 5-minute breathing exercise to reduce stress</span>
//                 </div>
//                 <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
//                   <BookOpen className="w-5 h-5" />
//                   <span>Journal about three things you're grateful for today</span>
//                 </div>
//                 <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
//                   <Sparkles className="w-5 h-5" />
//                   <span>Listen to calming sounds for 10 minutes before bed</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Recent Activity */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                 <Clock className="w-5 h-5 mr-2 text-gray-600" />
//                 Recent Activity
//               </h3>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <div key={index} className="flex items-start space-x-3">
//                     <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                       <activity.icon className="w-4 h-4 text-gray-600" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-800">{activity.action}</p>
//                       <p className="text-xs text-gray-500">{activity.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Access */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>
//               <div className="space-y-3">
//                 <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
//                   <Shield className="w-5 h-5 text-blue-600" />
//                   <span className="text-sm text-gray-700">Privacy Settings</span>
//                 </button>
//                 <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
//                   <Download className="w-5 h-5 text-green-600" />
//                   <span className="text-sm text-gray-700">Download Records</span>
//                 </button>
//                 <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
//                   <Settings className="w-5 h-5 text-gray-600" />
//                   <span className="text-sm text-gray-700">Account Settings</span>
//                 </button>
//               </div>
//             </div>

//             {/* Emergency Support */}
//             <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold text-red-800 mb-2">Need Immediate Help?</h3>
//               <p className="text-sm text-red-700 mb-4">
//                 If you're experiencing a mental health crisis, reach out immediately.
//               </p>
//               <button 
//               onClick={() => setShowEmergencySupport(!showEmergencySupport)}
//               className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium">
//                 Emergency Support
//               </button>
//               {showEmergencySupport && <EmergencySupport />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;