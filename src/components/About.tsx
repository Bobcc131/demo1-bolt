import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Building the Future of Web Development
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're passionate about creating tools and solutions that help developers
              build better websites faster. Our mission is to make web development
              accessible, enjoyable, and powerful for everyone.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">5K+</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">98%</h3>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">24/7</h3>
                <p className="text-gray-600">Support</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">100+</h3>
                <p className="text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}