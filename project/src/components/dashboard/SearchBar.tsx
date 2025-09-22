import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredSuggestions: string[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

const SearchBar: React.FC<Props> = ({ searchQuery, handleSearchChange, filteredSuggestions, showSuggestions, setShowSuggestions }) => (
  <div className="flex-1 max-w-md mx-8">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search tools, resources, or ask a question..."
        value={searchQuery}
        onChange={handleSearchChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onFocus={() => { if (filteredSuggestions.length > 0) setShowSuggestions(true); }}
        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => {
                // select suggestion
              }}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default SearchBar;
