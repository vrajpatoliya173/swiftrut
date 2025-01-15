import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/">EventManager</Link>
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`lg:flex lg:space-x-6 ${
            isOpen ? "block" : "hidden"
          } absolute lg:static bg-blue-600 w-full lg:w-auto`}
        >
          <li>
            <Link to="/" className="block px-4 py-2 hover:bg-blue-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/events" className="block px-4 py-2 hover:bg-blue-700">
              Events
            </Link>
          </li>
          <li>
            <Link to="/about" className="block px-4 py-2 hover:bg-blue-700">
              About
            </Link>
          </li>
        </ul>

        {/* Action Button */}
        <div className="hidden lg:block">
          <Link
            to="/create-event"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            Create Event
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;