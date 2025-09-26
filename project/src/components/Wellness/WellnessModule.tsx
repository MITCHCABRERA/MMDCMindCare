import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import SessionCard from "./SessionCard";
import SessionPlayer from "./SessionPlayer";
import { wellnessPrograms } from "./wellnessPrograms";
import { useWellnessSession } from "../hooks/useWellnessSession";

const WellnessModule = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentSession, setCurrentSession] = useState<any>(null);

  const {
    watchSeconds,
    completedSessions,
    countingStatus,
    completeSession,
    handleTimeUpdate,
    playerRef,
    resetSequential,
    handlePlayerStateChange,
  } = useWellnessSession(currentSession);

  const startSession = (program: any) => {
    setCurrentSession(program);
    resetSequential();
  };

  const filteredPrograms =
    selectedCategory === "All"
      ? wellnessPrograms
      : wellnessPrograms.filter((p) => p.category === selectedCategory);

  if (currentSession) {
    return (
      <SessionPlayer
        session={currentSession}
        onBack={() => setCurrentSession(null)}
        onComplete={completeSession}
        completedSessions={completedSessions}
        watchSeconds={watchSeconds}
        countingStatus={countingStatus}
        wellnessPrograms={wellnessPrograms}
        handleTimeUpdate={handleTimeUpdate}
        playerRef={playerRef}
        handlePlayerStateChange={handlePlayerStateChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Wellness Tutorials</h1>
            <div className="w-32" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Guided Wellness Tutorials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-guided exercises for breathing, meditation, and relaxation. Start your wellness journey with
            expert-designed programs.
          </p>
        </div>

        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <SessionCard key={program.id} program={program} onSelect={startSession} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WellnessModule;