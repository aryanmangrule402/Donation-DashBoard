import React from "react";
import { motion } from "framer-motion";

const DonationTable = ({ data }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-100 mt-8"
  >
    <table className="min-w-full text-sm text-left text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-6 py-3">Month</th>
          <th className="px-6 py-3">Donations (₹)</th>
          <th className="px-6 py-3">Donors</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <motion.tr
            key={index}
            whileHover={{ backgroundColor: "#f9fafb" }}
            className="border-t"
          >
            <td className="px-6 py-3 font-medium">{item.month}</td>
            <td className="px-6 py-3">₹{item.amount.toLocaleString("en-IN")}</td>
            <td className="px-6 py-3">{item.donors}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

export default DonationTable;
