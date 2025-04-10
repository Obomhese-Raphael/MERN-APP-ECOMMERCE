import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets'; // Import your images/icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically connect to your backend
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset submission status after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We're here to help with any questions about orders, products, or partnerships.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Contact Form Section */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
                Thank you! Your message has been sent. We'll respond within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="lg:w-1/2">
          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg h-full">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img src={assets.location_icon} alt="" className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold">Our Flagship Store</h3>
                   <p className="text-gray-600">
                    The Palms Shopping Mall<br />
                    Lagos Island, Lagos<br />
                    Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img src={assets.phone_icon} alt="" className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold">Phone Support</h3>
                  <p className="text-gray-600">
                    +234 567 870 1234<br />
                    Mon-Fri: 8AM - 6PM<br />
                    Sat: 9AM - 3PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img src={assets.email_icon} alt="" className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-gray-600">
                    forever_support@gmail.com<br />
                    support@forever@gmail.com
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-black">
                    <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black">
                    <img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black">
                    <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  to="/faq" 
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Visit our FAQ page
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Find Our Store</h2>
        <div className="bg-gray-200 h-64 md:h-96 rounded-lg overflow-hidden">
          <iframe
            title="Lagos Store Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.622444040567!2d3.422441415393941!3d6.447980595338382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4b5e11a5197%3A0xcb1d5ab6c7984b6d!2sThe%20Palms%20Shopping%20Mall!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
            allowFullScreen
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
       <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Nigerian Customers</h3>
        <p className="text-blue-700">
          For faster service, WhatsApp us at <strong>+234 567 870 1234</strong> or visit our Ikeja City Mall location.
        </p>
      </div>
    </div>
  );
};

export default Contact;