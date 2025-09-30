import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredSuggestions: string[]; // Now an array of strings (names)
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  onSearchSelect: (selectedItemName: string) => void; // New prop
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  handleSearchChange,
  filteredSuggestions,
  showSuggestions,
  setShowSuggestions,
  onSearchSelect, // Destructure the new prop
}) => {
  return (
    <div className="relative flex-grow max-w-md mx-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for wellness resources..."
          className="w-full p-2 pl-10 pr-4 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click on suggestion
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-3 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm"
              onClick={() => onSearchSelect(suggestion)} // Call the new prop on click
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
