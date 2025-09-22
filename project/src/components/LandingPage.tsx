import React, { useState } from 'react';
import { 
  Heart, 
  Brain, 
  Shield, 
  BookOpen, 
  MessageCircle, 
  Calendar,
  Sparkles,
  Play,
  CheckCircle,
  Star
} from 'lucide-react';
import Login from './auth/Login/Login';  // ✅ unified login component

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "Mental Health Assessment",
      description: "Regular mood check-ins and personalized recommendations",
      color: "bg-blue-500"
    },
    {
      icon: BookOpen,
      title: "Digital Journaling",
      description: "Secure, encrypted journaling with mood tracking",
      color: "bg-green-500"
    },
    {
      icon: MessageCircle,
      title: "AI Emotional Support",
      description: "24/7 AI-powered chatbot for immediate assistance",
      color: "bg-purple-500"
    },
    {
      icon: Heart,
      title: "Wellness Tutorials",
      description: "Guided meditation, breathing, and relaxation exercises",
      color: "bg-pink-500"
    },
    {
      icon: Sparkles,
      title: "Light & Sound Therapy",
      description: "Calming audio-visual experiences for stress relief",
      color: "bg-indigo-500"
    },
    {
      icon: Calendar,
      title: "Virtual Consultation",
      description: "Book private sessions with licensed counselors",
      color: "bg-teal-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Students Supported" },
    { number: "24/7", label: "Support Available" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "100%", label: "Privacy Protected" }
  ];

  return (
    

    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MMDC MindCare</h1>
                <p className="text-xs text-gray-500">Mental Health Support</p>
              </div>
            </div>
            {/* Login button opens modal */}
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Your Mental Health
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Matters Most
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive mental health support platform designed specifically for MMDC students. 
              Access professional tools, AI assistance, and wellness resources anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Get Started Today</span>
              </button>
              <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200 flex items-center space-x-2 shadow-sm">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Mental Health Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to support your mental wellness journey, backed by professional expertise and cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Your Privacy is Our Priority
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We implement industry-leading security measures to protect your sensitive information and ensure complete confidentiality.
              </p>
              <div className="space-y-4">
                {[
                  "End-to-end encryption for all journal entries",
                  "MMDC Gmail OAuth authentication",
                  "HIPAA-compliant data storage",
                  "Philippine Data Privacy Act compliance",
                  "Regular security audits and updates"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                <Shield className="w-24 h-24 text-blue-600 mx-auto mb-6" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Bank-Level Security
                  </h3>
                  <p className="text-gray-600">
                    Your data is protected with the same level of security used by financial institutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Students Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Santos",
                role: "Nursing Student",
                content: "MindCare helped me manage stress during my clinical rotations. The journaling feature is amazing!",
                rating: 5
              },
              {
                name: "John Rivera",
                role: "Medical Student",
                content: "The AI chatbot is incredibly supportive. It's like having a counselor available 24/7.",
                rating: 5
              },
              {
                name: "Sarah Chen",
                role: "Physical Therapy Student",
                content: "The wellness tutorials helped me develop healthy coping mechanisms for academic pressure.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of MMDC students who are already taking control of their mental health.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <span>Sign Up with MMDC Gmail</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">MMDC MindCare</h3>
                <p className="text-gray-400 text-sm">Mental Health Support Platform</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 MMDC MindCare. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Login UI */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Login isModal onClose={() => setShowLogin(false)} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
