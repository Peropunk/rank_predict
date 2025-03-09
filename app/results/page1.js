'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const rank = searchParams.get('rank')
  const domicile = searchParams.get('domicile')
  const category = searchParams.get('category')
  const seatType = searchParams.get('seatType')
  const quota = searchParams.get('quota')

  const [collegeResults, setCollegeResults] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(
          `/api/predictions?rank=${rank}&domicile=${domicile}&category=${category}&seatType=${seatType}&quota=${quota}`
        )
        const data = await response.json()
        if (data.success) {
          setCollegeResults(data.data)
        }
      } catch (error) {
        console.error('❌ Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [rank, domicile, category, seatType, quota])

  const toggleDropdown = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      <header className="w-full bg-gray-200 p-4 flex items-center text-black">
        <Link href="/" className="text-lg font-bold">
          <ArrowLeft />
        </Link>
        <h2 className="flex-grow text-center text-lg font-semibold">
          Prediction Results
        </h2>
      </header>

      <div className="bg-blue-700 text-white p-4 rounded-md shadow-md text-center w-full max-w-2xl mt-4">
        <p>
          <b>Rank:</b> {rank} | <b>State:</b>{' '}
          {domicile === 'Yes' ? 'Uttar Pradesh' : 'Other'} | <b>Category:</b>{' '}
          {category}
        </p>
      </div>

      <div className="w-full max-w-2xl mt-4">
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : collegeResults.length > 0 ? (
          collegeResults.map((college, index) => (
            <div
              key={index}
              className="bg-white text-black p-4 rounded-md shadow-md mt-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold uppercase">{college.name}</h3>
                  <p>
                    <b>Course:</b> {college.course}
                  </p>
                  <p>
                    <b>Branch:</b> {college.branch}
                  </p>
                  <p>
                    <b>Category:</b> {college.category} | <b>Quota:</b>{' '}
                    {college.quota}
                  </p>
                </div>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="text-gray-700 bg-gray-200 px-3 py-2 rounded-md shadow-md flex items-center"
                >
                  {expandedIndex === index ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>

              {expandedIndex === index && (
                <div className="bg-gray-100 p-3 mt-3 rounded-lg shadow-md">
                  <h4 className="font-semibold text-center mb-2">
                    Opening & Closing Ranks
                  </h4>
                  {college.ranks.map((round, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded-md shadow-md mt-2 border text-center"
                    >
                      <p>
                        <b>Round {round.round}</b>
                      </p>
                      <p>
                        Opening Rank:{' '}
                        <span className="font-semibold">{round.opening}</span>
                      </p>
                      <p>
                        Closing Rank:{' '}
                        <span className="font-semibold">{round.closing}</span>
                      </p>
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
  )
}
