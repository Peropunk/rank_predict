"use client";
import { useState } from "react";

export default function JOSAAredictor() {
  const [rank, setRank] = useState("");
  const [domicile, setDomicile] = useState("Yes");
  const [category, setCategory] = useState("OPEN");
  const [seatType, setSeatType] = useState("Gender-Neutral");
  const [quota, setQuota] = useState("Freedom Fighter");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rank, domicile, category, seatType, quota });
    // Add prediction logic or API call here
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      {/* Header */}
      <header className="w-full bg-white shadow p-4 flex items-center">
        <button className="text-lg font-bold text-black">&larr;</button>
        <h2 className="flex-grow text-center text-lg font-semibold text-gray-900">
          JOSAA Predictor
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
          <option value="0">Select Your State</option>
          <option value="AP">Andhra Pradesh</option>
	<option value="AR">Arunachal Pradesh</option>
	<option value="AS">Assam</option>
	<option value="BR">Bihar</option>
	<option value="CT">Chhattisgarh</option>
	<option value="GA">Gujarat</option>
	<option value="HR">Haryana</option>
	<option value="HP">Himachal Pradesh</option>
	<option value="JK">Jammu and Kashmir</option>
	<option value="GA">Goa</option>
	<option value="JH">Jharkhand</option>
	<option value="KA">Karnataka</option>
	<option value="KL">Kerala</option>
	<option value="MP">Madhya Pradesh</option>
	<option value="MH">Maharashtra</option>
        <option value="MN">Manipur</option>
        <option value="ML">Meghalaya</option>
	<option value="MZ">Mizoram</option>
	<option value="NL">Nagaland</option>
	<option value="OR">Odisha</option>
	<option value="PB">Punjab</option>
	<option value="RJ">Rajasthan</option>
	<option value="SK">Sikkim</option>
	<option value="TN">Tamil Nadu</option>
	<option value="TG">Telangana</option>
	<option value="TR">Tripura</option>
	<option value="UT">Uttarakhand</option>
	<option value="UP">Uttar Pradesh</option>
	<option value="WB">West Bengal</option>
	<option value="AN">Andaman and Nicobar Islands</option>
	<option value="CH">Chandigarh</option>
	<option value="DN">Dadra and Nagar Haveli</option>
	<option value="DD">Daman and Diu</option>
	<option value="DL">Delhi</option>
	<option value="LD">Lakshadweep</option>
	<option value="PY">Puducherry</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border text-black border-gray-300 rounded-lg mb-4">
          <option value="OPEN">OPEN</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>

        <select value={seatType} onChange={(e) => setSeatType(e.target.value)} className="w-full p-2 border text-black border-gray-300 rounded-lg mb-4">
          <option value="Gender-Neutral">Gender-Neutral</option>
          <option value="Female Only">Female Only</option>
        </select>

        <select value={quota} onChange={(e) => setQuota(e.target.value)} className="w-full p-2 border text-black border-gray-300 rounded-lg mb-4">
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
