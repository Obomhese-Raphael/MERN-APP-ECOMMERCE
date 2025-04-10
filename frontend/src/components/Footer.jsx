import React from 'react';
import assets from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-white py-8 px-4">
      <div className="container mx-auto">
        <div className="mt-8 mb-8 border-t pt-8 text-center text-sm text-gray-600"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Gift Cards</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Find a Store</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Membership</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Journal</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Site Feedback</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Get Help</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Order Status</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Shipping and Delivery</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Returns</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Order Cancellation</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Payment Options</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Gift Card Balance</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:underline">About Forever</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">News</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Investors</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Purpose</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Promotions & Discounts</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Student</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Military</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Teacher</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">First Responders & Medical Professionals</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:underline">Birthday</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Forever, Inc. All Rights Reserved</p>
          <div className="flex justify-center mt-5 space-x-4">
            <a href="#" className="hover:underline">Guides</a>
            <a href="#" className="hover:underline">Terms of Sale</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Forever Privacy Policy</a>
            <a href="#" className="hover:underline">Your Privacy Choices</a>
            <a href="#" className="hover:underline">CA Supply Chains Act</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;