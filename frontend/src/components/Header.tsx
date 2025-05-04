import React from 'react';
const Header = ({ user, showDropdown, setShowDropdown }: {
  user: string;
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
}) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-xl font-semibold">Hello, {user}!</h1>
    <div className="relative inline-block text-left">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex justify-center items-center border border-gray-400 rounded px-4 py-2 bg-white text-sm font-medium hover:bg-gray-100"
      >
        {user}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
);

export default React.memo(Header);