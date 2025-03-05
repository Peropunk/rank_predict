"use client";
import { useState } from "react";
import Link from "next/link";

export default function UPSEEPredictor() {
  const [rank, setRank] = useState("");
  const [domicile, setDomicile] = useState("");
  const [category, setCategory] = useState("");
  const [seatType, setSeatType] = useState("");
  const [quota, setQuota] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rank, domicile, category, seatType, quota });
    // Add prediction logic or API call here
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      {/* Header */}
      <header className="w-full bg-white shadow p-4 flex items-center">
      <Link href="/" className="text-lg font-bold text-black">
  &larr;
</Link>
        <h2 className="flex-grow text-center text-lg font-semibold text-gray-900">
          UPTAC Predictor
        </h2>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4">
        <label className="block font-semibold text-gray-900 mb-2">
          Fill Your All India Rank - CRL/Overall
        </label>
        <input
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full p-2 border border-gray-300 text-black rounded-lg mb-4"
          placeholder="Enter Rank"
          required
        />
        
        <select value={domicile} onChange={(e) => setDomicile(e.target.value)} className="w-full p-2 border text-black border-gray-300 rounded-lg mb-4">
          <option value="0">Are you a resident of UP?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border text-black border-gray-300 rounded-lg mb-4">
        <option value="yes">Select Your Category</option>
          <option value="OPEN">OPEN</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>

        <select value={seatType} onChange={(e) => setSeatType(e.target.value)} className="w-full p-2 border text-black border-gray-300 rounded-lg mb-4">
        <option value="0">Select Gender</option>
          <option value="Gender-Neutral">Gender-Neutral</option>
          <option value="Female Only">Female Only</option>
        </select>

        <select value={quota} onChange={(e) => setQuota(e.target.value)} className="w-full p-2 border text-black border-gray-300 rounded-lg mb-4">
        <option value="0">Quota</option>
          <option value="Freedom Fighter">Freedom Fighter</option>
          <option value="PWD">PWD</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" className="w-full bg-[#1350ff] text-white p-3 rounded-lg font-semibold">
          Predict College
        </button>
      </form>
    </div>
  );
}
