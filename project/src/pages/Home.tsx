import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Brain, Trophy, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Transform Your Training with AI-Powered Coaching
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get personalized sports coaching and real-time performance tracking powered by advanced AI technology.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Training
          </Link>
          <Link
            to="/about"
            className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Dumbbell className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Personalized Training</h3>
          <p className="text-gray-600">
            Get customized workout plans tailored to your goals and skill level
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
          <p className="text-gray-600">
            Advanced AI tracks your form and provides real-time feedback
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
          <p className="text-gray-600">
            Monitor your improvements with detailed performance analytics
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Experience the Future of Sports Training
            </h2>
            <p className="text-gray-600 mb-6">
              Our platform combines cutting-edge AI technology with proven training methodologies to help you achieve your athletic goals faster.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
            >
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
              alt="AI Sports Training"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}