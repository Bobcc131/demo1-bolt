import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="text-blue-600 font-medium">Innovate with confidence</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Transform Your Digital
            <span className="text-blue-600"> Presence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create stunning websites that captivate your audience and drive results. 
            Built with modern technologies for the modern web.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-4 border border-gray-300 rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}