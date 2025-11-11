import React from "react";
import DonationChart from "../components/DonationChart";

const Dashboard = () => {
  const donations = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 2100 },
    { month: "Mar", amount: 800 },
    { month: "Apr", amount: 1600 },
    { month: "May", amount: 2400 },
    { month: "Jun", amount: 3000 },
  ];

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const numberOfDonors = 45;

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-brand mb-2">
          Donation Tracking Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor your donation trends and statistics with ease.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-blue-100 text-blue-700 p-6 rounded-xl shadow-sm text-center">
          <h2 className="text-xl font-semibold">Total Donations</h2>
          <p className="text-3xl font-bold mt-2">
            ${totalDonations.toLocaleString()}
          </p>
        </div>

        <div className="bg-green-100 text-green-700 p-6 rounded-xl shadow-sm text-center">
          <h2 className="text-xl font-semibold">Number of Donors</h2>
          <p className="text-3xl font-bold mt-2">{numberOfDonors}</p>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow p-6">
        <DonationChart data={donations} />
      </section>

      <footer className="text-center text-gray-500 mt-10 text-sm">
        Built with ❤️ using React + Tailwind CSS
      </footer>
    </main>
  );
};

export default Dashboard;
