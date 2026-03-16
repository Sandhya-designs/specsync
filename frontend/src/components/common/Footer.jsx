import React from 'react';

export const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">SpecSync</h3>
          <p className="text-sm text-gray-600">
            Software Requirement Drift Detection System
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-primary">Features</a></li>
            <li><a href="#" className="hover:text-primary">Pricing</a></li>
            <li><a href="#" className="hover:text-primary">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-primary">About</a></li>
            <li><a href="#" className="hover:text-primary">Blog</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-primary">Privacy</a></li>
            <li><a href="#" className="hover:text-primary">Terms</a></li>
            <li><a href="#" className="hover:text-primary">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-8">
        <p className="text-center text-sm text-gray-600">
          © 2026 SpecSync. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
