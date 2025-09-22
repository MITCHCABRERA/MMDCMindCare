import React from "react";
import EmailForm from "./EmailForm";
import GoogleButton from "./GoogleButton";
import { Brain, X, CheckCircle } from "lucide-react";

interface LoginProps {
  onClose?: () => void;
  isModal?: boolean;
}

const Login: React.FC<LoginProps> = ({ onClose, isModal = false }) => {
  const containerClasses = isModal
    ? "w-full max-w-md mx-auto"
    : "flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50";

  const cardClasses = isModal
    ? "bg-white rounded-2xl p-8 shadow-2xl border border-gray-100"
    : "w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/20";

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">MMDC MindCare</h1>
              <p className="text-sm text-gray-500">Mental Health Support</p>
            </div>
          </div>
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Welcome */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access your mental health dashboard</p>
        </div>

        {/* Auth options */}
        <GoogleButton />
        <div className="my-8 text-center text-gray-500 font-medium">OR</div>
        <EmailForm />

        {/* Security notice */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-800">Secure & Private</p>
            <p className="text-xs text-gray-600 mt-1">
              Your data is encrypted and protected with bank-level security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
