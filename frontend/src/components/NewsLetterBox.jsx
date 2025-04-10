import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Thank you for subscribing with ${email}!`);
    setEmail(''); 
  };

  return (
    <div className="bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest news, offers, and exclusive content.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md py-2 px-4 mb-4 sm:mb-0 sm:mr-2 w-full sm:w-auto"
            required
          />
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
          >
            Subscribe
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default Newsletter;