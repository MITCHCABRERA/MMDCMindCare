import React, { MutableRefObject } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { ArrowLeft, CheckCircle } from "lucide-react";
import RelatedSessions from "./RelatedSessions";
import SessionProgress from "./SessionProgress";

interface SessionPlayerProps {
  session: any;
  onBack: () => void;
  onComplete: (id: string | number) => void;
  completedSessions: Record<string | number, number>;
  watchSeconds: number;
  countingStatus: "counting" | "paused" | "waiting";
  wellnessPrograms: any[];
  handleTimeUpdate: (currentTime: number, sessionId: string | number) => void;
  playerRef: MutableRefObject<any>;
  handlePlayerStateChange: (state: number, currentTime: number) => void;
}

const SessionPlayer = ({
  session,
  onBack,
  onComplete,
  completedSessions,
  watchSeconds,
  countingStatus,
  wellnessPrograms,
  handleTimeUpdate,
  playerRef,
  handlePlayerStateChange,
}: SessionPlayerProps) => {
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      enablejsapi: 1,
    },
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    const currentTime = playerRef.current.getCurrentTime();
    handlePlayerStateChange(event.data, currentTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Wellness</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">{session.title}</h1>
            <button
              onClick={() => onComplete(session.id)}
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
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <YouTube
                videoId={session.videoId}
                opts={opts}
                onReady={onPlayerReady}
                onStateChange={onStateChange}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{session.title}</h2>
                <p className="text-gray-600 mb-3">{session.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Instructor: {session.instructor}</span>
                  <span>•</span>
                  <span>{session.duration}</span>
                  <span>•</span>
                  <span>{session.difficulty}</span>
                </div>
                <div className="mt-2 text-sm text-gray-700 flex items-center gap-2">
                  <span>Sequential progress: {watchSeconds}s</span>
                  <div className="relative group">
                    <div className={`w-2 h-2 rounded-full ${
                      countingStatus === "counting" ? "bg-green-500" : 
                      countingStatus === "waiting" ? "bg-yellow-500" : 
                      "bg-red-500"
                    }`} />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {countingStatus === "counting" && "Counting progress"}
                      {countingStatus === "waiting" && "Waiting - return to last position to resume"}
                      {countingStatus === "paused" && "Paused"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SessionProgress session={session} completedSessions={completedSessions} watchSeconds={watchSeconds} />
            <RelatedSessions currentSession={session} wellnessPrograms={wellnessPrograms} onSelect={onBack} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPlayer;