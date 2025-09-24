import React from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacySettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="w-7 h-7 text-blue-600" />
              <span className="font-bold text-lg text-blue-700">Privacy Settings</span>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Privacy Preferences</h2>
          <form className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">Allow data collection for analytics</label>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">Show my mood stats on leaderboard</label>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">Receive wellness newsletter</label>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            </div>
            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
