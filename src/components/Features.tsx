import React from 'react';
import { Zap, Shield, Smartphone, Globe } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: 'Lightning Fast',
    description: 'Optimized for speed and performance, ensuring your website loads instantly.'
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: 'Secure by Default',
    description: 'Built-in security features to protect your data and your users.'
  },
  {
    icon: <Smartphone className="h-8 w-8 text-blue-600" />,
    title: 'Mobile First',
    description: 'Responsive design that looks great on any device, any screen size.'
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: 'Global Scale',
    description: 'Deploy worldwide with edge computing and global CDN integration.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to build modern web applications, all in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}