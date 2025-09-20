import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Bot,
  User,
  Heart,
  Brain,
  MessageCircle,
  Sparkles,
  Clock,
  MoreVertical,
  Trash2,
  Download
} from 'lucide-react';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi there! I'm your AI wellness companion. I'm here to provide emotional support, answer questions about mental health, and help you navigate the MindCare platform. How are you feeling today?",
      timestamp: new Date(Date.now() - 60000),
      mood: 'supportive'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickSuggestions = [
    "I'm feeling stressed about my studies",
    "Can you help me with breathing exercises?",
    "I'm having trouble sleeping",
    "I want to improve my mood",
    "Tell me about the wellness features",
    "I need someone to talk to"
  ];

  const botResponses = {
    stress: {
      content: "I understand you're feeling stressed about your studies. This is completely normal for students. Here are some immediate steps you can take:\n\n1. Try the breathing exercises in our Wellness Module\n2. Take short breaks every 30-45 minutes\n3. Consider writing in your digital journal to process your thoughts\n\nWould you like me to guide you to the breathing exercises now?",
      mood: 'supportive',
      suggestions: ["Yes, show me breathing exercises", "Tell me more about stress management", "I'd like to try journaling"]
    },
    breathing: {
      content: "Great choice! Breathing exercises are one of the most effective ways to reduce stress quickly. I can guide you through a simple technique right now, or direct you to our full Wellness Module where you'll find professional-guided sessions.\n\n**Quick technique**: Breathe in for 4 counts, hold for 4, exhale for 6. Repeat 5 times.\n\nWould you like to try this now or explore more options?",
      mood: 'encouraging',
      suggestions: ["Let's try it now", "Show me the Wellness Module", "Tell me about other techniques"]
    },
    sleep: {
      content: "Sleep difficulties can really affect your wellbeing and academic performance. Here are some evidence-based strategies:\n\n• Create a consistent bedtime routine\n• Try our sleep preparation meditation\n• Limit screen time 1 hour before bed\n• Keep your room cool and dark\n\nOur Light & Sound Therapy module has specific sessions designed for better sleep. Would you like me to recommend some?",
      mood: 'caring',
      suggestions: ["Show me sleep meditations", "Tell me about sleep hygiene", "I want to try sound therapy"]
    },
    mood: {
      content: "I'm glad you want to work on improving your mood! Small daily actions can make a big difference:\n\n✨ Start with our daily mood check-in\n✨ Try gratitude journaling\n✨ Use positive affirmations\n✨ Connect with supportive friends\n\nOur Mood Tracker can help you identify patterns and see your progress over time. Have you tried tracking your mood before?",
      mood: 'uplifting',
      suggestions: ["Show me the Mood Tracker", "Tell me about gratitude practices", "I need professional help"]
    },
    features: {
      content: "MindCare offers comprehensive mental health support:\n\n🧘 **Wellness Module**: Guided meditation and breathing exercises\n📝 **Digital Journal**: Secure, encrypted personal journaling\n📊 **Mood Tracker**: Daily mood logging with insights\n🎵 **Light & Sound Therapy**: Calming audiovisual experiences\n💬 **24/7 Chat Support**: That's me!\n📅 **Virtual Consultations**: Book sessions with licensed counselors\n\nWhich feature interests you most?",
      mood: 'informative',
      suggestions: ["Tell me about journaling", "I want to book a consultation", "Show me meditation options"]
    },
    talk: {
      content: "I'm here to listen and support you. Sometimes just having someone to talk to can make a big difference. What's been on your mind lately? Remember, everything we discuss is confidential and this space is completely safe for you to express your feelings.",
      mood: 'compassionate',
      suggestions: ["I'm feeling overwhelmed", "I'm worried about my future", "I feel lonely sometimes"]
    }
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('stress') || message.includes('anxious') || message.includes('worried')) {
      return botResponses.stress;
    } else if (message.includes('breath') || message.includes('calm') || message.includes('relax')) {
      return botResponses.breathing;
    } else if (message.includes('sleep') || message.includes('tired') || message.includes('insomnia')) {
      return botResponses.sleep;
    } else if (message.includes('mood') || message.includes('happy') || message.includes('sad') || message.includes('depression')) {
      return botResponses.mood;
    } else if (message.includes('feature') || message.includes('help') || message.includes('what can')) {
      return botResponses.features;
    } else if (message.includes('talk') || message.includes('listen') || message.includes('alone')) {
      return botResponses.talk;
    } else {
      return {
        content: "Thank you for sharing that with me. I want to make sure I give you the most helpful response. Could you tell me a bit more about what you're experiencing? I'm here to support you through whatever you're going through.",
        mood: 'supportive',
        suggestions: ["I'm feeling stressed", "I need coping strategies", "Tell me about your features"]
      };
    }
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        mood: botResponse.mood,
        suggestions: botResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      content: "Hi there! I'm your AI wellness companion. I'm here to provide emotional support, answer questions about mental health, and help you navigate the MindCare platform. How are you feeling today?",
      timestamp: new Date(),
      mood: 'supportive'
    }]);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
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
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">AI Wellness Assistant</h1>
                <p className="text-sm text-green-600">Online • Ready to help</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        {/* Messages */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`p-4 rounded-2xl max-w-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white ml-auto' 
                        : 'bg-gray-50 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                    
                    <div className={`mt-1 text-xs text-gray-500 ${message.type === 'user' ? 'text-right' : ''}`}>
                      {formatTime(message.timestamp)}
                    </div>

                    {/* Bot Suggestions */}
                    {message.type === 'bot' && message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(suggestion)}
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="border-t border-gray-100 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quick suggestions to get started:</h3>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here... I'm here to help!"
                  rows={1}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex items-start space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">AI Assistant Disclaimer</p>
              <p>This AI provides general wellness support and information. For serious mental health concerns or emergencies, please contact a licensed professional or emergency services immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;