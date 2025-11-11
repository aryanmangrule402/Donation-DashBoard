import React from "react";

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 py-4 mt-10 text-center">
    <p>© {new Date().getFullYear()} Donation Tracker. All rights reserved.</p>
    <p className="text-sm mt-1">Built with ❤️ using React + Tailwind CSS</p>
  </footer>
);

export default Footer;
