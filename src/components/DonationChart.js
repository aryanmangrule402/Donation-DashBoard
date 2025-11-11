import React, { useState, useEffect } from "react";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dataFile from "../data/donations.json";

// Utility function for ₹ formatting
const formatRupees = (num) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);

const DonationChart = () => {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("");
  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState([]);

  useEffect(() => {
    let yearlyData = dataFile[year] || [];
    if (month) yearlyData = yearlyData.filter((m) => m.month === month);
    setData(yearlyData);
  }, [year, month]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto mt-8">
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Donation Trends ({year})
        </h2>

        <div className="flex gap-3">
          {/* Year Selector */}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>

          {/* Month Selector */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="">All Months</option>
            {dataFile[year].map((m) => (
              <option key={m.month} value={m.month}>
                {m.month}
              </option>
            ))}
          </select>

          {/* Chart Type Selector */}
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        {chartType === "line" ? (
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `₹${v}`} />
            <Tooltip formatter={(v) => formatRupees(v)} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        ) : (
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `₹${v}`} />
            <Tooltip formatter={(v) => formatRupees(v)} />
            <Bar dataKey="amount" fill="#10b981" barSize={40} />
          </BarChart>
        )}
      </ResponsiveContainer>

      {/* Info */}
      <div className="text-sm text-gray-500 mt-4 text-center">
        Showing {chartType === "line" ? "Line" : "Bar"} Chart for{" "}
        <span className="font-semibold">{month || "All Months"}</span> of{" "}
        <span className="font-semibold">{year}</span>.
      </div>
    </div>
  );
};

export default DonationChart;
