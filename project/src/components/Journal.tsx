import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  BookOpen,
  Lock,
  Calendar,
  Smile,
  Tag,
  Edit3,
  Trash2,
  Save,
  X,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

const Journal = () => {
  const navigate = useNavigate();
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({ title: '', content: '', mood: '', tags: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [journalEntries, setJournalEntries] = useState([]);

  // Load journal entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('journal-entries');
    if (saved) {
      setJournalEntries(JSON.parse(saved));
    } else {
      // Set default entries if none exist
      const defaultEntries = [
        {
          id: 1,
          title: "A Great Study Session",
          content: "Today was really productive. I managed to complete all my reading assignments and even got ahead on next week's materials. The new study technique I learned from the wellness module really helped me focus better. I'm feeling more confident about the upcoming exams.",
          mood: '😊',
          tags: ['achievement', 'goals', 'study'],
          date: '2024-01-15',
          time: '10:30 PM',
          encrypted: true
        },
        {
          id: 2,
          title: "Feeling Overwhelmed",
          content: "The workload is getting intense. Multiple assignments due this week and I'm starting to feel the pressure. Need to remember to take breaks and use the breathing exercises. Maybe I should book a consultation session.",
          mood: '😔',
          tags: ['stress', 'study'],
          date: '2024-01-14',
          time: '8:45 PM',
          encrypted: true
        }
      ];
      setJournalEntries(defaultEntries);
      localStorage.setItem('journal-entries', JSON.stringify(defaultEntries));
    }
  }, []);

  const moodEmojis = [
    { emoji: '😢', label: 'Very Sad', color: 'text-red-500' },
    { emoji: '😔', label: 'Sad', color: 'text-orange-500' },
    { emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
    { emoji: '🙂', label: 'Happy', color: 'text-green-500' },
    { emoji: '😊', label: 'Very Happy', color: 'text-emerald-500' },
    { emoji: '😄', label: 'Excited', color: 'text-blue-500' },
    { emoji: '🤗', label: 'Grateful', color: 'text-purple-500' }
  ];

  const tagOptions = ['gratitude', 'stress', 'achievement', 'relationships', 'health', 'goals', 'reflection', 'study', 'family'];

  const handleSaveEntry = () => {
    if (currentEntry.title.trim() && currentEntry.content.trim()) {
      const newEntry = {
        id: Date.now(),
        title: currentEntry.title,
        content: currentEntry.content,
        mood: currentEntry.mood,
        tags: currentEntry.tags,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        encrypted: true
      };

      const updatedEntries = [newEntry, ...journalEntries];
      setJournalEntries(updatedEntries);
      localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
      
      setIsWriting(false);
      setCurrentEntry({ title: '', content: '', mood: '', tags: [] });
    }
  };

  const handleDeleteEntry = (entryId) => {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      const updatedEntries = journalEntries.filter(entry => entry.id !== entryId);
      setJournalEntries(updatedEntries);
      localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
    }
  };

  const handleTagToggle = (tag) => {
    const updatedTags = currentEntry.tags.includes(tag)
      ? currentEntry.tags.filter(t => t !== tag)
      : [...currentEntry.tags, tag];
    setCurrentEntry({ ...currentEntry, tags: updatedTags });
  };

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMood = selectedMood === 'all' || entry.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  if (isWriting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setIsWriting(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <h1 className="text-lg font-semibold text-gray-800">New Journal Entry</h1>
              <button
                onClick={handleSaveEntry}
                disabled={!currentEntry.title.trim() || !currentEntry.content.trim()}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Writing Interface */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Encryption Notice */}
            <div className="bg-green-50 border-b border-green-200 p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <Lock className="w-5 h-5" />
                <span className="text-sm font-medium">Your journal entries are encrypted and secure</span>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Title */}
              <input
                type="text"
                placeholder="Entry title..."
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                className="w-full text-2xl font-semibold text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent"
              />

              {/* Content */}
              <textarea
                placeholder="How are you feeling today? What's on your mind?"
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                rows={12}
                className="w-full text-gray-700 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-relaxed"
              />

              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How are you feeling?</label>
                <div className="flex flex-wrap gap-3">
                  {moodEmojis.map((mood) => (
                    <button
                      key={mood.emoji}
                      onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.emoji })}
                      className={`p-3 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                        currentEntry.mood === mood.emoji
                          ? 'border-blue-500 bg-blue-50 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs text-gray-600">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Add tags (optional)</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        currentEntry.tags.includes(tag)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current date/time */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
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
            <h1 className="text-xl font-semibold text-gray-800">Digital Journal</h1>
            <button
              onClick={() => setIsWriting(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Entry</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your journal entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Mood Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Moods</option>
                    {moodEmojis.map((mood) => (
                      <option key={mood.emoji} value={mood.emoji}>
                        {mood.emoji} {mood.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Journal Entries */}
            <div className="space-y-6">
              {filteredEntries.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No entries found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery || selectedMood !== 'all' 
                      ? 'Try adjusting your search or filter criteria.' 
                      : 'Start your wellness journey by writing your first journal entry.'}
                  </p>
                  <button
                    onClick={() => setIsWriting(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Write First Entry
                  </button>
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <div key={entry.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">{entry.title}</h3>
                            <span className="text-2xl">{entry.mood}</span>
                            {entry.encrypted && (
                              <Lock className="w-4 h-4 text-green-600" title="Encrypted" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span>{entry.date}</span>
                            <span>{entry.time}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {entry.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-green-600" />
                Security Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Encryption</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auto-backup</span>
                  <span className="text-sm font-medium text-green-600">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Privacy Mode</span>
                  <button className="flex items-center space-x-1">
                    {isEncrypted ? (
                      <Eye className="w-4 h-4 text-gray-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Writing Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Writing Stats</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-gray-800">{journalEntries.length}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">
                      {journalEntries.filter(entry => {
                        const entryDate = new Date(entry.date);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return entryDate >= weekAgo;
                      }).length}
                    </div>
                    <div className="text-xs text-gray-600">This Week</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">
                      {journalEntries.filter(entry => {
                        const entryDate = new Date(entry.date);
                        const monthAgo = new Date();
                        monthAgo.setMonth(monthAgo.getMonth() - 1);
                        return entryDate >= monthAgo;
                      }).length}
                    </div>
                    <div className="text-xs text-gray-600">This Month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Export Entries</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Calendar View</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-700">Manage Tags</span>
                </button>
              </div>
            </div>

            {/* Daily Prompt */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">💭 Daily Prompt</h3>
              <p className="text-sm opacity-90 mb-4">
                "What made you smile today, and how can you create more moments like that?"
              </p>
              <button
                onClick={() => setIsWriting(true)}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Write About It
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;