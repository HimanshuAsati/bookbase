// apps/frontend/src/components/SearchBar.tsx

import React, { useState, useEffect} from "react";

// Hardcoded mock data for book suggestions
const mockResults = [
  { id: 1, title: "The Great Gatsby" },
  { id: 2, title: "To Kill a Mockingbird" },
  { id: 3, title: "1984" },
];

// React functional component
const SearchBar: React.FC = () => {
  // State for the user's input
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // State to control whether dropdown is shown
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter book list based on the user's query (case-insensitive match)
  // Filter only when debouncedQuery updates
  const filteredResults = mockResults.filter((book) =>
    book.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  // Debounce effect: runs after user stops typing for 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // delay in ms

    return () => {
      clearTimeout(handler); // clear timeout on cleanup (if query changes quickly)
    };
  }, [query]);
  

  // When user types in the input box
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);                      // update input state
    setShowDropdown(value.length > 0);   // show dropdown only if input is not empty
  };

  // When user selects a book from dropdown
  const handleSelect = (title: string) => {
    setQuery(title);       // set input to selected title
    setShowDropdown(false); // close dropdown
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">
      {/* Search input box */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for books..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown suggestions */}
      {showDropdown && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
          {/* Show filtered results if any match */}
          {filteredResults.length > 0 ? (
            filteredResults.map((book) => (
              <li
                key={book.id}
                onClick={() => handleSelect(book.title)} // When clicked, populate input with title
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {book.title}
              </li>
            ))
          ) : (
            // If no matches found
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

// Exporting the component to be used in Home.tsx or elsewhere
export default SearchBar;
