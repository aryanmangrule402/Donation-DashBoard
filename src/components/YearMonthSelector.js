import React from "react";

const YearMonthSelector = ({ years, selectedYear, selectedMonth, onYearChange, onMonthChange }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center mb-8">
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">Select Year</label>
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">Select Month</label>
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearMonthSelector;
