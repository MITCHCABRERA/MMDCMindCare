import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  RotateCcw,
  Settings,
  Sparkles,
  Moon,
  Sun,
  Waves,
  Zap,
  Heart,
  Timer,
  Palette
} from 'lucide-react';

const TherapyModule = () => {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(600); // 10 minutes default
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const therapyThemes = [
    {
      id: 'calm-ocean',
      name: 'Calm Ocean',
      description: 'Soothing ocean waves with blue gradient visuals',
      icon: Waves,
      color: 'from-blue-400 to-blue-600',
      backgroundColor: 'from-blue-100 to-cyan-100',
      soundUrl: '/audio/ocean-waves.mp3',
      category: 'Relaxation'
    },
    {
      id: 'forest-rain',
      name: 'Forest Rain',
      description: 'Gentle rain sounds with green nature visuals',
      icon: Heart,
      color: 'from-green-400 to-green-600',
      backgroundColor: 'from-green-100 to-emerald-100',
      soundUrl: '/audio/forest-rain.mp3',
      category: 'Sleep'
    },
    {
      id: 'deep-meditation',
      name: 'Deep Meditation',
      description: 'Tibetan singing bowls with purple ambient visuals',
      icon: Sparkles,
      color: 'from-purple-400 to-purple-600',
      backgroundColor: 'from-purple-100 to-indigo-100',
      soundUrl: '/audio/singing-bowls.mp3',
      category: 'Meditation'
    },
    {
      id: 'focus-flow',
      name: 'Focus Flow',
      description: 'Binaural beats with geometric patterns for concentration',
      icon: Zap,
      color: 'from-orange-400 to-orange-600',
      backgroundColor: 'from-orange-100 to-yellow-100',
      soundUrl: '/audio/binaural-beats.mp3',
      category: 'Focus'
    },
    {
      id: 'sunset-calm',
      name: 'Sunset Calm',
      description: 'Warm sunset colors with gentle ambient sounds',
      icon: Sun,
      color: 'from-pink-400 to-orange-500',
      backgroundColor: 'from-pink-100 to-orange-100',
      soundUrl: '/audio/sunset-ambient.mp3',
      category: 'Relaxation'
    },
    {
      id: 'night-rest',
      name: 'Night Rest',
      description: 'Deep sleep sounds with dark, starry visuals',
      icon: Moon,
      color: 'from-indigo-500 to-purple-600',
      backgroundColor: 'from-indigo-100 to-purple-100',
      soundUrl: '/audio/night-sounds.mp3',
      category: 'Sleep'
    }
  ];

  const categories = ['All', 'Relaxation', 'Sleep', 'Meditation', 'Focus'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredThemes = selectedCategory === 'All' 
    ? therapyThemes 
    : therapyThemes.filter(theme => theme.category === selectedCategory);

  // Timer functionality
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsTimerActive(false);
            setIsPlaying(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!isTimerActive || timeRemaining === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  // Visual animations
  useEffect(() => {
    if (!currentTheme || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (currentTheme.id === 'calm-ocean') {
        drawOceanWaves(ctx, canvas.width, canvas.height, time);
      } else if (currentTheme.id === 'forest-rain') {
        drawRainEffect(ctx, canvas.width, canvas.height, time);
      } else if (currentTheme.id === 'deep-meditation') {
        drawMeditationCircles(ctx, canvas.width, canvas.height, time);
      } else if (currentTheme.id === 'focus-flow') {
        drawGeometricPatterns(ctx, canvas.width, canvas.height, time);
      } else if (currentTheme.id === 'sunset-calm') {
        drawSunsetGradient(ctx, canvas.width, canvas.height, time);
      } else if (currentTheme.id === 'night-rest') {
        drawStarField(ctx, canvas.width, canvas.height, time);
      }

      if (isPlaying) {
        animationId = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentTheme, isPlaying]);

  // Animation functions
  const drawOceanWaves = (ctx, width, height, time) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#60A5FA');
    gradient.addColorStop(1, '#1E40AF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const y = height / 2 + Math.sin((x + time * 50) * 0.01 + i) * 30;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  };

  const drawRainEffect = (ctx, width, height, time) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#10B981');
    gradient.addColorStop(1, '#059669');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 100; i++) {
      const x = (i * 13 + time * 2) % width;
      const y = (i * 17 + time * 100) % height;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 2, y + 20);
      ctx.stroke();
    }
  };

  const drawMeditationCircles = (ctx, width, height, time) => {
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
    gradient.addColorStop(0, '#A855F7');
    gradient.addColorStop(1, '#6366F1');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(time + i) * 0.1})`;
      ctx.lineWidth = 2;
      const radius = 50 + i * 40 + Math.sin(time + i) * 20;
      ctx.arc(width/2, height/2, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawGeometricPatterns = (ctx, width, height, time) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#F59E0B');
    gradient.addColorStop(1, '#EAB308');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    const size = 40;
    for (let x = 0; x < width; x += size) {
      for (let y = 0; y < height; y += size) {
        ctx.save();
        ctx.translate(x + size/2, y + size/2);
        ctx.rotate(time + (x + y) * 0.01);
        ctx.strokeRect(-size/4, -size/4, size/2, size/2);
        ctx.restore();
      }
    }
  };

  const drawSunsetGradient = (ctx, width, height, time) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#F472B6');
    gradient.addColorStop(0.5, '#FB923C');
    gradient.addColorStop(1, '#FBBF24');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Sun
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.arc(width * 0.7, height * 0.3, 30 + Math.sin(time) * 5, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawStarField = (ctx, width, height, time) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1E1B4B');
    gradient.addColorStop(1, '#581C87');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'white';
    for (let i = 0; i < 50; i++) {
      const x = (i * 47) % width;
      const y = (i * 83) % height;
      const brightness = Math.sin(time + i) * 0.5 + 0.5;
      ctx.globalAlpha = brightness;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const startTherapy = (theme) => {
    setCurrentTheme(theme);
    setTimeRemaining(duration);
    setIsPlaying(true);
    setIsTimerActive(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setIsTimerActive(!isTimerActive);
  };

  const resetSession = () => {
    setIsPlaying(false);
    setIsTimerActive(false);
    setTimeRemaining(duration);
  };

  const exitTherapy = () => {
    setCurrentTheme(null);
    setIsPlaying(false);
    setIsTimerActive(false);
    setTimeRemaining(duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentTheme) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.backgroundColor} relative overflow-hidden`}>
        {/* Visual Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'blur(0.5px)' }}
        />

        {/* Controls Overlay */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button
                  onClick={exitTherapy}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Exit Therapy</span>
                </button>
                <h1 className="text-lg font-semibold text-white">{currentTheme.name}</h1>
                <div className="w-20"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center text-white space-y-8">
              {/* Theme Icon */}
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <currentTheme.icon className="w-12 h-12" />
              </div>

              {/* Title and Description */}
              <div>
                <h2 className="text-3xl font-bold mb-2">{currentTheme.name}</h2>
                <p className="text-lg opacity-90">{currentTheme.description}</p>
              </div>

              {/* Timer Display */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-block">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="w-5 h-5" />
                  <span className="text-sm opacity-80">Time Remaining</span>
                </div>
                <div className="text-4xl font-bold">{formatTime(timeRemaining)}</div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={resetSession}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
                
                <button
                  onClick={togglePlayPause}
                  className="p-4 bg-white/30 hover:bg-white/40 rounded-full transition-colors backdrop-blur-md"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </button>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center justify-center space-x-3">
                <Volume2 className="w-4 h-4 opacity-60" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-32 accent-white"
                />
                <span className="text-sm opacity-60">{Math.round(volume * 100)}%</span>
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
            <h1 className="text-xl font-semibold text-gray-800">Light & Sound Therapy</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Light & Sound Therapy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in calming audiovisual experiences designed to reduce stress, 
            improve focus, and promote better sleep through scientifically-backed therapy techniques.
          </p>
        </div>

        {/* Session Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Session Settings</h3>
              <p className="text-gray-600">Customize your therapy experience</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Timer className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Duration:</span>
                <select
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={300}>5 minutes</option>
                  <option value={600}>10 minutes</option>
                  <option value={900}>15 minutes</option>
                  <option value={1200}>20 minutes</option>
                  <option value={1800}>30 minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Therapy Themes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => (
            <div
              key={theme.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => startTherapy(theme)}
            >
              <div className={`bg-gradient-to-br ${theme.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <theme.icon className="w-12 h-12 mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{theme.category}</span>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {theme.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {formatTime(duration)} session
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 group-hover:scale-105">
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Benefits of Light & Sound Therapy
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Stress Reduction",
                description: "Lower cortisol levels and activate the relaxation response",
                icon: Heart
              },
              {
                title: "Improved Focus",
                description: "Enhance concentration through binaural beats and visual patterns",
                icon: Zap
              },
              {
                title: "Better Sleep",
                description: "Regulate circadian rhythms and promote deep sleep",
                icon: Moon
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

export default TherapyModule;