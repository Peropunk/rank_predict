"use client"
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Filter,
  AlertCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import uptacData from '../../data.json' // Import the JSON data directly

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
  const [sortBy, setSortBy] = useState('rank') // 'rank' or 'name'
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    // Process and filter data from the JSON file
    const processData = () => {
      try {
        // Filter the data based on query parameters
        const filteredData = uptacData.filter((college) => {
          // Check rank
          if (rank) {
            const userRank = parseInt(rank, 10)
            const openRank = parseInt(college.openingRank, 10)
            const closeRank = parseInt(college.closingRank, 10)
            if (
              isNaN(openRank) ||
              isNaN(closeRank) ||
              userRank < openRank ||
              userRank > closeRank
            ) {
              return false
            }
          }

          // Filter by category
          if (category && category !== '') {
            if (quota && quota !== '') {
              // If quota is selected, check for category with quota
              if (!college.Category.includes(`${category}(${quota})`)) {
                return false
              }
            } else if (!college.Category.includes(category)) {
              return false
            }
          }

          // Filter by quota (Home State vs All India)
          if (domicile === 'Yes' && !college.Quota.includes('Home State')) {
            return false
          }
          if (domicile === 'No' && !college.Quota.includes('All India')) {
            return false
          }

          // Filter by seat type (gender)
          if (seatType && seatType !== '') {
            if (
              seatType === 'Female Only' &&
              !college.seatGender.includes('Female')
            ) {
              return false
            }
          }

          return true
        })

        // Transform data to the expected format
        const transformedData = filteredData.map((college) => {
          return {
            name: college.Institute,
            course: college.Stream,
            branch: college.Program,
            category: college.Category,
            quota: college.Quota,
            seatGender: college.seatGender,
            ranks: [
              {
                round: college.Round.replace('Round ', ''),
                opening: college.openingRank,
                closing: college.closingRank,
              },
            ],
          }
        })

        // Merge colleges with same name, course, branch, category, and quota
        const mergedData = []
        transformedData.forEach((college) => {
          const existingCollege = mergedData.find(
            (c) =>
              c.name === college.name &&
              c.course === college.course &&
              c.branch === college.branch &&
              c.category === college.category &&
              c.quota === college.quota
          )

          if (existingCollege) {
            existingCollege.ranks.push(...college.ranks)
          } else {
            mergedData.push({ ...college })
          }
        })

        // Sort the merged data
        if (sortBy === 'rank') {
          mergedData.sort((a, b) => {
            const aRank = Math.min(
              ...a.ranks.map((r) => parseInt(r.closing, 10))
            )
            const bRank = Math.min(
              ...b.ranks.map((r) => parseInt(r.closing, 10))
            )
            return aRank - bRank
          })
        } else {
          mergedData.sort((a, b) => a.name.localeCompare(b.name))
        }

        setCollegeResults(mergedData)
      } catch (error) {
        console.error('❌ Error processing data:', error)
      } finally {
        setLoading(false)
      }
    }

    processData()
  }, [rank, domicile, category, seatType, quota, sortBy])

  const toggleDropdown = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  // Extract the college full name and display abbreviated version if too long
  const formatCollegeName = (name) => {
    if (name.length > 50) {
      // Get abbreviation for long names
      return name
        .split(/[ ,()]+/)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    }
    return name
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      <header className="w-full bg-gray-200 p-4 flex items-center justify-between text-black sticky top-0 z-10">
        <Link href="/upsee" className="text-lg font-bold">
          <ArrowLeft />
        </Link>
        <h2 className="flex-grow text-center text-lg font-semibold">
          UPTAC Prediction Results
        </h2>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 rounded-full hover:bg-gray-300"
        >
          <Filter size={20} />
        </button>
      </header>

      <div className="bg-blue-700 text-white p-4 rounded-md shadow-md text-center w-full max-w-2xl mt-4">
        <p className="text-sm md:text-base">
          <b>Rank:</b> {rank || 'Not specified'} | <b>State:</b>{' '}
          {domicile === 'Yes'
            ? 'Uttar Pradesh'
            : domicile === 'No'
            ? 'Other'
            : 'Not specified'}{' '}
          | <b>Category:</b> {category || 'Not specified'}
          {quota && quota !== '' ? ` (${quota})` : ''}
        </p>
        <p className="text-sm mt-1">
          <b>Gender:</b> {seatType || 'Any'}
        </p>
      </div>

      {showFilter && (
        <div className="bg-white border rounded-md shadow-md mt-4 p-4 w-full max-w-2xl">
          <h3 className="font-semibold mb-2">Sort Options</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('rank')}
              className={`px-3 py-1 rounded-md ${
                sortBy === 'rank' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              By Rank
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`px-3 py-1 rounded-md ${
                sortBy === 'name' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              By College Name
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            <p className="text-gray-600 mt-4">Loading college predictions...</p>
          </div>
        ) : collegeResults.length > 0 ? (
          <>
            <p className="text-sm text-gray-600 mb-2">
              Found {collegeResults.length} colleges matching your criteria
            </p>
            {collegeResults.map((college, index) => (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-md shadow-md mt-4 border border-gray-200 hover:border-blue-300 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-800">{college.name}</h3>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 text-sm">
                      <p>
                        <span className="font-semibold">Course:</span>{' '}
                        {college.course}
                      </p>
                      <p>
                        <span className="font-semibold">Branch:</span>{' '}
                        {college.branch}
                      </p>
                      <p>
                        <span className="font-semibold">Category:</span>{' '}
                        {college.category}
                      </p>
                      <p>
                        <span className="font-semibold">Quota:</span>{' '}
                        {college.quota}
                      </p>
                      {college.seatGender && (
                        <p className="md:col-span-2">
                          <span className="font-semibold">Seat Type:</span>{' '}
                          {college.seatGender}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="text-gray-700 bg-gray-200 hover:bg-gray-300 p-2 rounded-md shadow-sm flex items-center ml-2"
                    aria-label="Toggle details"
                  >
                    {expandedIndex === index ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>

                {expandedIndex === index && (
                  <div className="bg-gray-50 p-3 mt-3 rounded-lg shadow-inner">
                    <h4 className="font-semibold text-center mb-2 text-blue-700">
                      Opening & Closing Ranks
                    </h4>
                    {college.ranks.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {college.ranks.map((round, i) => (
                          <div
                            key={i}
                            className="bg-white p-3 rounded-md shadow-sm border border-gray-200 text-center"
                          >
                            <p className="font-semibold text-gray-700">
                              Round {round.round}
                            </p>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div className="bg-blue-50 p-1 rounded">
                                <p className="text-xs text-gray-500">Opening</p>
                                <p className="font-semibold">{round.opening}</p>
                              </div>
                              <div className="bg-green-50 p-1 rounded">
                                <p className="text-xs text-gray-500">Closing</p>
                                <p className="font-semibold">{round.closing}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">
                        No rank data available
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-center mt-8 flex flex-col items-center">
            <AlertCircle className="text-yellow-500 mb-2" size={24} />
            <h3 className="font-semibold text-gray-800">No colleges found</h3>
            <p className="text-gray-600 mt-1">
              Try adjusting your search criteria to see more results
            </p>
            <Link
              href="/uptac-predictor"
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Search
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
