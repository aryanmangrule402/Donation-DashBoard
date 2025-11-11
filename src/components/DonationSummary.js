import React from "react";
import { motion } from "framer-motion";

const DonationSummary = ({ totalDonations, totalDonors }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-xl p-6 border border-gray-100"
    >
      <h3 className="text-gray-500 text-sm uppercase mb-2">Total Donations</h3>
      <p className="text-3xl font-bold text-blue-600">
        ₹{totalDonations.toLocaleString("en-IN")}
      </p>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-xl p-6 border border-gray-100"
    >
      <h3 className="text-gray-500 text-sm uppercase mb-2">Number of Donors</h3>
      <p className="text-3xl font-bold text-green-600">{totalDonors}</p>
    </motion.div>
  </motion.div>
);

export default DonationSummary;
