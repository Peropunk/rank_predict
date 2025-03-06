

"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    rank: null,
    domicile: null,
    category: null,
    seatType: null,
    quota: null,
  });

  useEffect(() => {
    setQueryParams({
      rank: searchParams.get("rank"),
      domicile: searchParams.get("domicile"),
      category: searchParams.get("category"),
      seatType: searchParams.get("seatType"),
      quota: searchParams.get("quota"),
    });
  }, [searchParams]);

  const [collegeResults, setCollegeResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Mock data (Replace with API call later)
  const mockColleges = [
    {
      name: "AJAY KUMAR GARG ENGG. COLLEGE, GHAZIABAD",
      course: "B.Tech",
      branch: "Computer Science and Engineering",
      category: "BC",
      quota: "Home State",
      ranks: [
        { round: 1, opening: 5000, closing: 10000 },
        { round: 2, opening: 6000, closing: 11000 },
        { round: 3, opening: 7000, closing: 12000 },
      ],
    },
    {
      name: "AJAY KUMAR GARG ENGG. COLLEGE, GHAZIABAD",
      course: "B.Tech",
      branch: "Electronics and Communication Engineering",
      category: "BC",
      quota: "Home State",
      ranks: [
        { round: 1, opening: 8000, closing: 15000 },
        { round: 2, opening: 9000, closing: 16000 },
        { round: 3, opening: 10000, closing: 17000 },
      ],
    },
  ];

  useEffect(() => {
    setCollegeResults(mockColleges);
  }, []);

  const toggleDropdown = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      {/* Header */}
      <header className="w-full bg-gray-200 p-4 flex items-center text-black">
        <Link href="/" className="text-lg font-bold flex items-center gap-2">
          <ArrowLeft size={20} /> Back
        </Link>
        <h2 className="flex-grow text-center text-lg font-semibold">
          Prediction Results
        </h2>
      </header>

      {/* Rank Info */}
      <div className="bg-blue-700 text-white p-4 rounded-md shadow-md text-center w-full max-w-2xl mt-4">
        <p>
          <b>Rank:</b> {queryParams.rank} &nbsp;|&nbsp; 
          <b> State:</b> {queryParams.domicile === "Yes" ? "Uttar Pradesh" : "Other"} &nbsp;|&nbsp; 
          <b> Quota:</b> {queryParams.category}
        </p>
      </div>

      {/* Results */}
      <div className="w-full max-w-2xl mt-4">
        {collegeResults.length > 0 ? (
          collegeResults.map((college, index) => (
            <div key={index} className="bg-white text-black p-4 rounded-md shadow-md mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold uppercase">{college.name}</h3>
                  <p><b>Course:</b> {college.course}</p>
                  <p><b>Branch:</b> {college.branch}</p>
                  <p><b>Category:</b> {college.category} | <b>Quota:</b> {college.quota}</p>
                </div>
                {/* Dropdown Button */}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="text-gray-700 bg-gray-200 px-3 py-2 rounded-md shadow-md flex items-center"
                >
                  {expandedIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {/* Dropdown Content (Opening & Closing Ranks) */}
              {expandedIndex === index && (
                <div className="bg-gray-100 p-3 mt-3 rounded-lg shadow-md">
                  <h4 className="font-semibold text-center mb-2">Opening & Closing Ranks</h4>
                  {college.ranks.map((round, i) => (
                    <div key={i} className="bg-white p-3 rounded-md shadow-md mt-2 border text-center">
                      <p><b>Round {round.round}</b></p>
                      <p>Opening Rank: <span className="font-semibold">{round.opening}</span></p>
                      <p>Closing Rank: <span className="font-semibold">{round.closing}</span></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center mt-4">No colleges found.</p>
        )}
      </div>
    </div>
  );
}
