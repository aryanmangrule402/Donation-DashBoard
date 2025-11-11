import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

const Dashboard = ({ selectedYear, filteredData, totalDonations, totalDonors }) => {
  // ✅ Function to generate and download PDF
  const handleDownloadPDF = async () => {
    const input = document.getElementById("dashboard-report");

    if (!input) {
      alert("Dashboard section not found!");
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    // Add summary table
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text(`Donation Report - ${selectedYear}`, 14, 20);

    pdf.setFontSize(12);
    pdf.text(`Total Donations: ₹${totalDonations.toLocaleString()}`, 14, 30);
    pdf.text(`Total Donors: ${totalDonors}`, 14, 40);

    // Add Data Table
    const tableData = filteredData.map((item) => [
      item.month,
      `₹${item.amount.toLocaleString()}`,
      item.donors,
    ]);

    pdf.autoTable({
      head: [["Month", "Donations", "Donors"]],
      body: tableData,
      startY: 50,
    });

    pdf.save(`Donation_Report_${selectedYear}.pdf`);
  };

  return (
    <div className="p-6">
      {/* 🌟 Header with download button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Donation Dashboard - {selectedYear}
        </h1>

        {/* ✅ Download Button */}
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md transition duration-200"
        >
          📄 Download PDF Report
        </button>
      </motion.div>

      {/* 📊 Everything below this div will be captured in PDF */}
      <div id="dashboard-report" className="bg-white p-6 rounded-lg shadow-md">
        {/* Example summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-green-100 rounded-lg shadow text-center"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Total Donations
            </h2>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ₹{totalDonations.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-blue-100 rounded-lg shadow text-center"
          >
            <h2 className="text-xl font-semibold text-gray-800">Total Donors</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">{totalDonors}</p>
          </motion.div>
        </div>

        {/* Example table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Donations (₹)</th>
                <th className="p-2 border">Donors</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-2 border text-center">{item.month}</td>
                  <td className="p-2 border text-center">{item.amount}</td>
                  <td className="p-2 border text-center">{item.donors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
