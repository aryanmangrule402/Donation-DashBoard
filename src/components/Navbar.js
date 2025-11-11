import React from "react";

const Navbar = () => (
  <nav className="bg-gradient-to-r from-gray-600 to-indigo-700 text-white shadow-lg p-4">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-wide">Donation Dashboard</h1>
      <ul className="flex gap-6 text-sm sm:text-base">
        <li className="hover:text-gray-200 cursor-pointer">Dashboard</li>
        <li className="hover:text-gray-200 cursor-pointer">Reports</li>
        <li className="hover:text-gray-200 cursor-pointer">About</li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
