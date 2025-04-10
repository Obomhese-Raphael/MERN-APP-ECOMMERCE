import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets"; // Import your images

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Story
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From a small sneaker store to Nigeria's leading footwear destination
        </p>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <img
            src={assets.about_img} // Replace with your image
            alt="Our store team"
            className="rounded-lg shadow-xl w-full h-auto"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why We Exist
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Founded in 2010 in Johannesburg, Sole Haven began with a simple
            mission: to bring premium footwear to Nigeria at accessible prices.
            What started as a single storefront is now the nation's
            fastest-growing online shoe retailer.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We partner directly with global brands to cut out middlemen, passing
            the savings directly to you. Every pair in our collection is
            hand-selected by our team of sneaker experts.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Shop Our Collection
          </Link>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: assets.quality_icon, // Replace with your icon
              title: "Quality First",
              description:
                "We test every product for durability and comfort before offering it to you.",
            },
            {
              icon: assets.shipping_icon,
              title: "Lightning Delivery",
              description:
                "Free next-day delivery to major cities across Nigeria.",
            },
            {
              icon: assets.support_img,
              title: "Community Focus",
              description:
                "10% of profits fund youth sports programs in underserved communities.",
            },
          ].map((value, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <img src={value.icon} alt="" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet The Founders
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {[
            {
              name: "Tebogo Moloi",
              role: "CEO & Buyer",
              bio: "Former pro athlete with a passion for performance footwear.",

              image: assets.founder2, // Replace with your image
            },
            {
              name: "Amahle Khumalo",
              role: "Operations",
              bio: "Retail veteran with 15 years in footwear distribution.",
              image: assets.founder1,
            },
          ].map((member, index) => (
            <div key={index} className="text-center max-w-xs">
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 mx-auto rounded-full object-cover mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 text-black rounded-lg p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Curious?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Visit our flagship store in Sandton or chat with our shoe experts
          24/7.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/contact"
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-300 hover:text-black transition"
          >
            Contact Us
          </Link>
          <Link
            to="/"
            className="border px-6 py-3 rounded-md hover:bg-gray-200 transition"
          >
            Read Our Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
