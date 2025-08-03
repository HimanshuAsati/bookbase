import React from "react";

const Header: React.FC = () => {
    return (
        <header className="bg-gray-100 shadow-md py-4 px-6 flex justify-between items-center">
      {/* App Name */}
      <div className="text-2xl font-bold text-gray-800">
        BookBase
      </div>

      {/* Auth Buttons (for future) */}
      <div className="space-x-4">
        <button className="text-sm text-gray-700 hover:underline">
          Login
        </button>
        <button className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Sign Up
        </button>
      </div>
    </header>
    );
};