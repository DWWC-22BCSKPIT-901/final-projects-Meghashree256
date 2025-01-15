import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl">SportCoachAI</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link to="/sessions" className="text-gray-600 hover:text-gray-900">Sessions</Link>
            <Link to="/progress" className="text-gray-600 hover:text-gray-900">Progress</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="text-gray-600 hover:text-gray-900"
            >
              Profile
            </Link>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Start Session
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}