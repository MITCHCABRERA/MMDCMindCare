import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Heart, 
  Wind, 
  Brain,
  Clock,
  CheckCircle,
  Star,
  Volume2,
  VolumeX,
  X,
  Maximize,
  ExternalLink
} from 'lucide-react';

const WellnessModule = () => {
  const navigate = useNavigate();
  const [currentSession, setCurrentSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [completedSessions, setCompletedSessions] = useState({});

  // Load completed sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wellness-completed-sessions');
    if (saved) {
      setCompletedSessions(JSON.parse(saved));
    }
  }, []);

  const wellnessPrograms = [
    {
      id: 1,
      title: "Deep Breathing Basics",
      description: "Learn fundamental breathing techniques for instant calm",
      duration: "5 min",
      difficulty: "Beginner",
      category: "Breathing",
      icon: Wind,
      color: "bg-blue-500",
      rating: 4.8,
      videoId: "YRPh_GaiL8s", // Breathing exercise video
      instructor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Mindful Meditation",
      description: "Guided meditation for mental clarity and focus",
      duration: "10 min",
      difficulty: "Intermediate",
      category: "Meditation",
      icon: Brain,
      color: "bg-purple-500",
      rating: 4.9,
      videoId: "inpok4MKVLM", // Meditation video
      instructor: "Dr. Michael Chen"
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      description: "Release physical tension throughout your body",
      duration: "15 min",
      difficulty: "Beginner",
      category: "Relaxation",
      icon: Heart,
      color: "bg-pink-500",
      rating: 4.7,
      videoId: "86HUcX8ZtAk", // Progressive muscle relaxation
      instructor: "Dr. Lisa Martinez"
    },
    {
      id: 4,
      title: "Stress Relief Visualization",
      description: "Mental imagery techniques for stress reduction",
      duration: "12 min",
      difficulty: "Intermediate",
      category: "Visualization",
      icon: Brain,
      color: "bg-green-500",
      rating: 4.6,
      videoId: "ZToicYcHIOU", // Visualization meditation
      instructor: "Dr. Amanda White"
    },
    {
      id: 5,
      title: "Quick Energy Boost",
      description: "Energizing breathing exercises for mental alertness",
      duration: "3 min",
      difficulty: "Beginner",
      category: "Energy",
      icon: Wind,
      color: "bg-orange-500",
      rating: 4.5,
      videoId: "tybOi4hjZFQ", // Energizing breathing
      instructor: "Dr. James Wilson"
    },
    {
      id: 6,
      title: "Sleep Preparation",
      description: "Calming techniques to prepare for restful sleep",
      duration: "20 min",
      difficulty: "Beginner",
      category: "Sleep",
      icon: Heart,
      color: "bg-indigo-500",
      rating: 4.8,
      videoId: "aXItOY0sLRY", // Sleep meditation
      instructor: "Dr. Rachel Davis"
    }
  ];

  const startSession = (program) => {
    setCurrentSession(program);
    setProgress(0);
    setIsPlaying(true);
  };

  const completeSession = (programId) => {
    const newCompleted = {
      ...completedSessions,
      [programId]: (completedSessions[programId] || 0) + 1
    };
    setCompletedSessions(newCompleted);
    localStorage.setItem('wellness-completed-sessions', JSON.stringify(newCompleted));
    setCurrentSession(null);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  if (currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setCurrentSession(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Wellness</span>
              </button>
              <h1 className="text-lg font-semibold text-gray-800">{currentSession.title}</h1>
              <button
                onClick={() => completeSession(currentSession.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Complete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Session Interface */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentSession.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={currentSession.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentSession.title}</h2>
                      <p className="text-gray-600 mb-3">{currentSession.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Instructor: {currentSession.instructor}</span>
                        <span>•</span>
                        <span>{currentSession.duration}</span>
                        <span>•</span>
                        <span>{currentSession.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{currentSession.rating}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Session Guidelines</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Find a quiet, comfortable space</li>
                      <li>• Use headphones for better audio experience</li>
                      <li>• Follow along at your own pace</li>
                      <li>• Stop if you feel uncomfortable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Progress</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-800">{completedSessions[currentSession.id] || 0}</div>
                    <div className="text-sm text-gray-600">Times Completed</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Category</span>
                      <span className="text-sm font-medium text-gray-800">{currentSession.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Duration</span>
                      <span className="text-sm font-medium text-gray-800">{currentSession.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Difficulty</span>
                      <span className="text-sm font-medium text-gray-800">{currentSession.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">💡 Tip</h3>
                <p className="text-sm opacity-90">
                  Regular practice enhances the benefits. Try to complete this session at least 3 times this week for optimal results.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Sessions</h3>
                <div className="space-y-3">
                  {wellnessPrograms
                    .filter(p => p.category === currentSession.category && p.id !== currentSession.id)
                    .slice(0, 2)
                    .map((program) => (
                      <button
                        key={program.id}
                        onClick={() => setCurrentSession(program)}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${program.color} rounded-lg flex items-center justify-center`}>
                            <program.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{program.title}</p>
                            <p className="text-xs text-gray-500">{program.duration}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-xl font-semibold text-gray-800">Wellness Tutorials</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Guided Wellness Tutorials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-guided exercises for breathing, meditation, and relaxation. 
            Start your wellness journey with expert-designed programs.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['All', 'Breathing', 'Meditation', 'Relaxation', 'Energy', 'Sleep'].map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-full text-gray-700 hover:text-blue-700 transition-all font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wellnessPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={`https://img.youtube.com/vi/${program.videoId}/maxresdefault.jpg`}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => startSession(program)}
                    className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all group-hover:scale-110"
                  >
                    <Play className="w-8 h-8 text-gray-800 ml-1" />
                  </button>
                </div>
                <div className={`absolute top-3 left-3 w-8 h-8 ${program.color} rounded-lg flex items-center justify-center`}>
                  <program.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{program.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{program.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {program.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {program.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>By {program.instructor}</p>
                    <p>Completed {completedSessions[program.id] || 0} times</p>
                  </div>
                  <button
                    onClick={() => startSession(program)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Benefits of Regular Wellness Practice
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Reduced Stress",
                description: "Lower cortisol levels and improved stress management",
                icon: Heart
              },
              {
                title: "Better Focus",
                description: "Enhanced concentration and mental clarity",
                icon: Brain
              },
              {
                title: "Improved Sleep",
                description: "Better sleep quality and faster sleep onset",
                icon: CheckCircle
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessModule;