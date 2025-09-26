import React from "react";
import { Play, Star } from "lucide-react";

interface SessionCardProps {
  program: any;
  onSelect: (program: any) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ program, onSelect }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={() => onSelect(program)}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-100">
        <img
          src={`https://img.youtube.com/vi/${program.videoId}/maxresdefault.jpg`}
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-gray-800 ml-1" />
          </div>
        </div>
        <div className={`absolute top-3 left-3 w-8 h-8 ${program.color} rounded-lg flex items-center justify-center`}>
          <program.icon className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Program Info */}
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
  );
};

export default SessionCard;
