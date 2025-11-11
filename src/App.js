import React, { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DonationSummary from "./components/DonationSummary";
import DonationChart from "./components/DonationChart";
import DonationTable from "./components/DonationTable";
import YearMonthSelector from "./components/YearMonthSelector";
import dataFile from "./data/donations.json";
import { motion, AnimatePresence } from "framer-motion";

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

        {/* Animated data change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedYear}-${selectedMonth}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <DonationSummary totalDonations={totalDonations} totalDonors={totalDonors} />
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
