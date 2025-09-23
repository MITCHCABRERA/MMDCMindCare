import React, { useEffect, useRef, useState } from "react";
import { getLocalStorage, setLocalStorage } from "./utils/storage";
import { useNavigate } from "react-router-dom";
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
  Palette,
  Feather,
} from "lucide-react";

type Theme = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  backgroundColor: string;
  soundUrl: string;
  category: string;
  duration: number;
};

const TherapyModule: React.FC = () => {
  const navigate = useNavigate();

  // --- state & refs ---
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(600); // default 10 minutes (seconds)
  const [timeRemaining, setTimeRemaining] = useState<number>(600);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // guard to prevent double-completion (React dev double-invoke / duplicate calls)
  const completionGuardRef = useRef<boolean>(false);

  // --- themes ---
  const therapyThemes: Theme[] = [
    {
      id: "calm-ocean",
      name: "Calm Ocean",
      description: "Soothing ocean waves with blue gradient visuals",
      icon: Waves,
      color: "from-blue-400 to-blue-600",
      backgroundColor: "from-blue-100 to-cyan-100",
      soundUrl: "/audio/ocean-waves.mp3",
      category: "Relaxation",
      duration: 300,
    },
    {
      id: "forest-rain",
      name: "Forest Rain",
      description: "Gentle rain sounds with green nature visuals",
      icon: Heart,
      color: "from-green-400 to-green-600",
      backgroundColor: "from-green-100 to-emerald-100",
      soundUrl: "/audio/forest-rain.mp3",
      category: "Sleep",
      duration: 600,
    },
    {
      id: "deep-meditation",
      name: "Deep Meditation",
      description: "Tibetan singing bowls with purple ambient visuals",
      icon: Sparkles,
      color: "from-purple-400 to-purple-600",
      backgroundColor: "from-purple-100 to-indigo-100",
      soundUrl: "/audio/singing-bowls.mp3",
      category: "Meditation",
      duration: 900,
    },
    {
      id: "focus-flow",
      name: "Focus Flow",
      description: "Binaural beats with geometric patterns for concentration",
      icon: Zap,
      color: "from-orange-400 to-orange-600",
      backgroundColor: "from-orange-100 to-yellow-100",
      soundUrl: "/audio/binaural-beats.mp3",
      category: "Focus",
      duration: 1200,
    },
    {
      id: "sunset-calm",
      name: "Sunset Calm",
      description: "Warm sunset colors with gentle ambient sounds",
      icon: Sun,
      color: "from-pink-400 to-orange-500",
      backgroundColor: "from-pink-100 to-orange-100",
      soundUrl: "/audio/sunset-ambient.mp3",
      category: "Relaxation",
      duration: 300,
    },
    {
      id: "night-rest",
      name: "Night Rest",
      description: "Deep sleep sounds with dark, starry visuals",
      icon: Moon,
      color: "from-indigo-500 to-purple-600",
      backgroundColor: "from-indigo-100 to-purple-100",
      soundUrl: "/audio/night-sounds.mp3",
      category: "Sleep",
      duration: 900,
    },
    {
      id: "sample",
      name: "10 seconds sample",
      description: "This is a 10 seconds audio sample",
      icon: Feather,
      color: "from-teal-400 to-cyan-500",
      backgroundColor: "from-teal-100 to-cyan-100",
      soundUrl: "/audio/10secsample.mp3",
      category: "Sample",
      duration: 10,
    },
  ];

  const categories = ["All", "Relaxation", "Sleep", "Meditation", "Focus", "Sample"];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredThemes = therapyThemes.filter((theme) => {
    const matchesCategory = selectedCategory === "All" || theme.category === selectedCategory;
    const matchesDuration = duration === null || theme.duration === duration;
    return matchesCategory && matchesDuration;
  });

  // --- handleComplete (single source of truth) ---
  const handleComplete = () => {
    // guard: ensure only one completion recorded
    if (completionGuardRef.current) return;
    completionGuardRef.current = true;

    // log finished session (array of timestamps)
    const sessions = getLocalStorage<string[]>("sessions-completed", []);
    sessions.push(new Date().toISOString());
    setLocalStorage<string[]>("sessions-completed", sessions);

    // stop playback/animation and reset UI
    setIsPlaying(false);
    setIsTimerActive(false);

    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (e) {
        // ignore
      }
    }

    setCurrentTheme(null);
    setTimeRemaining(duration ?? 600);
  };

  // --- start therapy ---
  const startTherapy = (theme: Theme) => {
    completionGuardRef.current = false; // reset guard for new session
    setCurrentTheme(theme);
    setTimeRemaining(theme.duration ?? duration ?? 600);
    setIsPlaying(true);
    setIsTimerActive(true);
  };

  // --- toggle, reset, exit ---
  const togglePlayPause = () => {
    setIsPlaying((s) => !s);
    setIsTimerActive((s) => !s);
  };

  const resetSession = () => {
    setIsPlaying(false);
    setIsTimerActive(false);
    setTimeRemaining(currentTheme?.duration ?? duration ?? 600);
  };

  const exitTherapy = () => {
    setCurrentTheme(null);
    setIsPlaying(false);
    setIsTimerActive(false);
    setTimeRemaining(duration ?? 600);
  };

  // --- timer effect (single interval) ---
  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((time) => {
        if (time <= 1) {
          // final tick
          setIsTimerActive(false);
          setIsPlaying(false);
          // ensure we schedule completion after state updates (but guard prevents double)
          handleComplete();
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // only depend on isTimerActive to avoid multiple intervals
  }, [isTimerActive]);

  // --- audio effect: respond to currentTheme / isPlaying / volume / mute ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // update source when theme changes
    if (currentTheme) {
      audio.src = currentTheme.soundUrl;
      audio.loop = currentTheme.id !== "sample";
      audio.currentTime = 0;
    }

    audio.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audio.play().catch(() => {
        /* ignore play errors in some browsers */
      });
    } else {
      audio.pause();
    }
  }, [currentTheme, isPlaying, isMuted, volume]);

  // --- canvas animation effect (safe checks) ---
  useEffect(() => {
    if (!currentTheme) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number | null = null;
    let t = 0;

    const animate = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw based on theme id
      if (currentTheme.id === "calm-ocean") {
        drawOceanWaves(ctx, canvas.width, canvas.height, t);
      } else if (currentTheme.id === "forest-rain") {
        drawRainEffect(ctx, canvas.width, canvas.height, t);
      } else if (currentTheme.id === "deep-meditation") {
        drawMeditationCircles(ctx, canvas.width, canvas.height, t);
      } else if (currentTheme.id === "focus-flow") {
        drawGeometricPatterns(ctx, canvas.width, canvas.height, t);
      } else if (currentTheme.id === "sunset-calm") {
        drawSunsetGradient(ctx, canvas.width, canvas.height, t);
      } else if (currentTheme.id === "night-rest") {
        drawStarField(ctx, canvas.width, canvas.height, t);
      } else if (currentTheme.id === "sample") {
        drawFeatherPulse(ctx, canvas.width, canvas.height, t);
      }

      if (isPlaying) {
        animationId = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [currentTheme, isPlaying]);

  // --- drawing helpers (same as your originals) ---
  const drawOceanWaves = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#60A5FA");
    gradient.addColorStop(1, "#1E40AF");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
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

  const drawRainEffect = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#10B981");
    gradient.addColorStop(1, "#059669");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
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

  const drawMeditationCircles = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
    gradient.addColorStop(0, "#A855F7");
    gradient.addColorStop(1, "#6366F1");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(time + i) * 0.1})`;
      ctx.lineWidth = 2;
      const radius = 50 + i * 40 + Math.sin(time + i) * 20;
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawGeometricPatterns = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#F59E0B");
    gradient.addColorStop(1, "#EAB308");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    const size = 40;
    for (let x = 0; x < width; x += size) {
      for (let y = 0; y < height; y += size) {
        ctx.save();
        ctx.translate(x + size / 2, y + size / 2);
        ctx.rotate(time + (x + y) * 0.01);
        ctx.strokeRect(-size / 4, -size / 4, size / 2, size / 2);
        ctx.restore();
      }
    }
  };

  const drawSunsetGradient = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#F472B6");
    gradient.addColorStop(0.5, "#FB923C");
    gradient.addColorStop(1, "#FBBF24");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.arc(width * 0.7, height * 0.3, 30 + Math.sin(time) * 5, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawStarField = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#1E1B4B");
    gradient.addColorStop(1, "#581C87");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
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

  const drawFeatherPulse = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#2DD4BF");
    gradient.addColorStop(1, "#06B6D4");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const featherCount = 12;
    for (let i = 0; i < featherCount; i++) {
      const xBase = (i * 150) % width;
      const yBase = (i * 200) % height;

      const y = ((time * 30 + yBase) % (height + 200)) - 100;
      const x = xBase + Math.sin(time * 0.5 + i) * 80;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(time + i) * 0.5);

      ctx.beginPath();
      ctx.ellipse(0, 0, 40, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.25 + 0.25 * Math.sin(time * 2 + i)})`;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-35, 0);
      ctx.lineTo(35, 0);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }
  };

  // --- helpers ---
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // --- render ---
  if (currentTheme) {
    const Icon = currentTheme.icon;
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.backgroundColor} relative overflow-hidden`}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ filter: "blur(0.5px)" }} />

        <audio ref={audioRef} src={currentTheme.soundUrl} loop={currentTheme.id !== "sample"} />

        <div className="relative z-10 min-h-screen flex flex-col">
          <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button onClick={exitTherapy} className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Exit Therapy</span>
                </button>
                <h1 className="text-lg font-semibold text-white">{currentTheme.name}</h1>
                <div className="w-20" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center text-white space-y-8">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <Icon className="w-12 h-12" />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-2">{currentTheme.name}</h2>
                <p className="text-lg opacity-90">{currentTheme.description}</p>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-block">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="w-5 h-5" />
                  <span className="text-sm opacity-80">Time Remaining</span>
                </div>
                <div className="text-4xl font-bold">{formatTime(timeRemaining)}</div>
              </div>

              <div className="flex items-center justify-center space-x-6">
                <button onClick={resetSession} className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md">
                  <RotateCcw className="w-6 h-6" />
                </button>

                <button onClick={togglePlayPause} className="p-4 bg-white/30 hover:bg-white/40 rounded-full transition-colors backdrop-blur-md">
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </button>

                <button
                  onClick={() => setIsMuted((s) => !s)}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
              </div>

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
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate("/dashboard")} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Light & Sound Therapy</h1>
            <div className="w-32" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Light & Sound Therapy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in calming audiovisual experiences designed to reduce stress, improve focus, and promote better sleep through scientifically-backed therapy techniques.
          </p>
        </div>

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
                  value={duration === null ? "All" : duration}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDuration(value === "All" ? null : Number(value));
                  }}
                >
                  <option value="All">All</option>
                  <option value={10}>10 seconds</option>
                  <option value={300}>5 minutes</option>
                  <option value={600}>10 minutes</option>
                  <option value={900}>15 minutes</option>
                  <option value={1200}>20 minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => (
            <div
              key={theme.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => startTherapy(theme)}
            >
              <div className={`bg-gradient-to-br ${theme.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                <div className="relative z-10">
                  <theme.icon className="w-12 h-12 mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{theme.category}</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{theme.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{formatTime(theme.duration ?? (duration ?? 600))} session</div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 group-hover:scale-105">
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Benefits of Light & Sound Therapy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Stress Reduction", description: "Lower cortisol levels and activate the relaxation response", icon: Heart },
              { title: "Improved Focus", description: "Enhance concentration through binaural beats and visual patterns", icon: Zap },
              { title: "Better Sleep", description: "Regulate circadian rhythms and promote deep sleep", icon: Moon },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyModule;
