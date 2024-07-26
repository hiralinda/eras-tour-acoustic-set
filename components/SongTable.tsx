'use client'

import React, { useState, useMemo } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid'

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

  const sortedSongs = useMemo(() => {
    return [...songs].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [songs, sortField, sortDirection])

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Title
          </th>
          <th 
            className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
            onClick={() => toggleSort('datePerformed')}
          >
            Date Performed
            {sortField === 'datePerformed' && (
              sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 inline-block ml-1" /> : <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
            )}
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Location
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Featured
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Video Link
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedSongs.map((song, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="px-6 py-4 whitespace-nowrap">{song.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{song.datePerformed}</td>
            <td className="px-6 py-4 whitespace-nowrap">{song.location}</td>
            <td className="px-6 py-4 whitespace-nowrap">{song.featured}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a href={song.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                Watch
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SongTable