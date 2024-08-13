'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, MoonIcon } from '@heroicons/react/24/solid'

interface Song {
  title: string;
  datePerformed: string;
  location: string;
  featured: string;
  videoLink: string;
}

interface SongTableProps {
  songs: Song[];
}

type SortField = keyof Song;

const SongTable: React.FC<SongTableProps> = ({ songs }) => {
  const [sortField, setSortField] = useState<SortField>('datePerformed')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const filteredAndSortedSongs = useMemo(() => {
    return [...songs]
      .filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.datePerformed.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
  }, [songs, searchTerm, sortField, sortDirection])

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <div>
     <div className="mb-4 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300" />
        </div>
        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 bg-white text-dark-500 rounded-full hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <MoonIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 table-auto">
          <thead>
            <tr>
              <th className="px-2 py-3 border-b-2 w-1/6 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Title
              </th>
              <th className="px-2 py-3 border-b-2 w-1/6 border-gray-300 dark:border-gray-600 text-center text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Video
              </th>
              <th
                className="px-2 py-3 border-b-2 w-1/6 border-gray-300 dark:border-gray-600 text-center text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('datePerformed')}
              >
                Date
                {sortField === 'datePerformed' && (
                  sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 inline-block ml-1" /> : <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
                )}
              </th>
              <th className="px-2 py-3 border-b-2 w-1/6 border-gray-300 dark:border-gray-600 text-end text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedSongs.map((song, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                <td className="px-2 py-3 whitespace-normal text-xs text-gray-900 dark:text-gray-300">{song.title}</td>
                <td className="px-2 py-3 whitespace-nowrap text-center text-xs">
                  <a href={song.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Watch
                  </a>
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-center text-xs text-gray-900 dark:text-gray-300">{song.datePerformed}</td>
                <td className="px-2 py-3 whitespace-normal text-end text-xs text-gray-900 dark:text-gray-300">{song.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SongTable;