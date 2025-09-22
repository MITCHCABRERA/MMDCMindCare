import React from 'react';
import { Heart, BookOpen, MessageCircle, Sparkles, Calendar, BarChart3 } from 'lucide-react';

interface Props {
  navigate: (path: string) => void;
}

const quickActions = [
  { icon: Heart, title: "Wellness Tutorials", description: "Guided meditation & breathing", color: "bg-pink-500", route: "/wellness" },
  { icon: BookOpen, title: "Digital Journal", description: "Record your thoughts", color: "bg-green-500", route: "/journal" },
  { icon: MessageCircle, title: "AI Support Chat", description: "24/7 emotional assistance", color: "bg-purple-500", route: "/chatbot" },
  { icon: Sparkles, title: "Light & Sound Therapy", description: "Calming audio-visuals", color: "bg-indigo-500", route: "/therapy" },
  { icon: Calendar, title: "Book Consultation", description: "Private counselor sessions", color: "bg-teal-500", route: "/consultation" },
  { icon: BarChart3, title: "Mood Tracker", description: "Track your mental health", color: "bg-blue-500", route: "/mood-tracker" }
];

const QuickActions: React.FC<Props> = ({ navigate }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {quickActions.map((action, index) => (
        <div
          key={index}
          onClick={() => navigate(action.route)}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default QuickActions;
