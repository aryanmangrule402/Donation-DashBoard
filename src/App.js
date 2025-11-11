import React, { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DonationSummary from "./components/DonationSummary";
import DonationChart from "./components/DonationChart";
import DonationTable from "./components/DonationTable";
import YearMonthSelector from "./components/YearMonthSelector";
import dataFile from "./data/donations.json";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const years = Object.keys(dataFile);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Filter the data dynamically
  const yearData = useMemo(() => {
    let data = dataFile[selectedYear] || [];
    if (selectedMonth !== "All") {
      data = data.filter((d) => d.month === selectedMonth);
    }
    return data;
  }, [selectedYear, selectedMonth]);

  const totalDonations = useMemo(
    () => yearData.reduce((sum, d) => sum + Number(d.amount || 0), 0),
    [yearData]
  );

  const totalDonors = useMemo(
    () => yearData.reduce((sum, d) => sum + Number(d.donors || 0), 0),
    [yearData]
  );

  // 🧾 Function to generate and download PDF
  const handleDownloadPDF = async () => {
    const input = document.getElementById("report-content");
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Donation_Report_${selectedYear}_${selectedMonth}.pdf`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Donation Tracking Dashboard
        </h1>
        <p className="text-gray-500 mb-6">
          Monitor your donation trends and statistics with ease.
        </p>

        {/* Filters */}
        <YearMonthSelector
          years={years}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
        />

        {/* Download Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            📄 Download Report (PDF)
          </button>
        </div>

        {/* Animated data section */}
        <AnimatePresence mode="wait">
          <motion.div
            id="report-content"
            key={`${selectedYear}-${selectedMonth}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <DonationSummary
              totalDonations={totalDonations}
              totalDonors={totalDonors}
            />
            <DonationChart data={yearData} />
            <DonationTable data={yearData} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
