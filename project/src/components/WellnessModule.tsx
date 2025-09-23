import React, { useState, useEffect, useRef } from 'react';
import { getLocalStorage, setLocalStorage } from "./utils/storage";
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
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<Record<string|number, number>>({});

  // change: watch timer to count seconds while user stays in the session panel
  const [watchSeconds, setWatchSeconds] = useState(0);
  const watchIntervalRef = useRef<number | null>(null);

  // Load completed sessions from localStorage
  useEffect(() => {
    const saved = getLocalStorage<Record<string|number, number>>('wellness-completed-sessions', {});
    setCompletedSessions(saved);
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
      videoId: "YRPh_GaiL8s",
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
      videoId: "inpok4MKVLM",
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
      videoId: "86HUcX8ZtAk",
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
      videoId: "ZToicYcHIOU",
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
      videoId: "tybOi4hjZFQ",
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
      videoId: "aXItOY0sLRY",
      instructor: "Dr. Rachel Davis"
    },
    //test
    {
      id: 7,
      title: "Countdown Test Video",
      description: "Test session using the countdown video",
      duration: "5 sec",
      difficulty: "Beginner",
      category: "Test",
      icon: Clock,
      color: "bg-gray-500",
      rating: 5.0,
      videoId: "icPHcK_cCF4",
      instructor: "Test Instructor"
    }
  ];

  const startSession = (program: any) => {
    setCurrentSession(program);
    setProgress(0);
    setIsPlaying(true);
  };

  // change: small guard to avoid double-counting rapid clicks / duplicate handlers
  const markOnceGuard = (key: string) => {
    const marker = `wellness-${key}`;
    if (localStorage.getItem(marker)) return false;
    localStorage.setItem(marker, '1');
    setTimeout(() => localStorage.removeItem(marker), 1000);
    return true;
  };

  const completeSession = (programId: number | string) => {
    if (!markOnceGuard(programId.toString())) return; // change: use guard

    const newCompleted = {
      ...completedSessions,
      [programId]: (completedSessions[programId] || 0) + 1
    };
    setCompletedSessions(newCompleted);
    setLocalStorage('wellness-completed-sessions', newCompleted);

    // change: also record to global sessions-completed so QuickStats counts it
    const sessions = getLocalStorage<string[]>('sessions-completed', []);
    sessions.push(new Date().toISOString());
    setLocalStorage('sessions-completed', sessions);

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

  // change: helper to parse session duration string into seconds
  const getSessionDurationSeconds = (session: any) => {
  if (!session || !session.duration) return 60;
  const m = session.duration.match(/(\d+)\s*min/i);
  if (m) return Number(m[1]) * 60;
  const s = session.duration.match(/(\d+)\s*s(ec)?/i);
  if (s) return Number(s[1]);
  return 60; // default 60s
};

  // change: increment watchSeconds while panel visible & focused; auto-complete at threshold
  useEffect(() => {
  if (!currentSession) {
    if (watchIntervalRef.current) clearInterval(watchIntervalRef.current);
    setWatchSeconds(0);
    return;
  }

  setWatchSeconds(0);
  watchIntervalRef.current = window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if (!document.hasFocus()) return;

    setWatchSeconds(prev => {
       const dur = getSessionDurationSeconds(currentSession);
        const threshold = Math.max(6, Math.floor(dur * 0.95));

        if (prev + 1 >= threshold) {
          // increment completedSessions immediately
          setCompletedSessions(cs => ({
            ...cs,
            [currentSession.id]: (cs[currentSession.id] || 0) + 1
          }));

          completeSession(currentSession.id);  // marks complete and updates count

          if (watchIntervalRef.current) {
            clearInterval(watchIntervalRef.current); // stop timer
            watchIntervalRef.current = null;
          }
          return -1; // special value to indicate completion
        }
        return prev + 1;
      });
  }, 1000);

  return () => {
    if (watchIntervalRef.current) {
      clearInterval(watchIntervalRef.current);
      watchIntervalRef.current = null;
    }
  };
}, [currentSession]);


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
                    {/* change: show watched seconds */}
                    <div className="text-xs text-gray-500 mt-2">Watched:  {watchSeconds === -1 ? 'Completed' : `Watched: ${watchSeconds}s`}</div>
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
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{program.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{program.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{program.duration}</span>
                  <span>{program.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WellnessModule;
