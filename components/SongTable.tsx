'use client'

import React, { useState, useMemo } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

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
    <div className="overflow-x-auto">
      <table className="w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="px-2 py-3 border-b-2 w-1/6 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th
              className="px-2 py-3 border-b-2 w-1/6 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
              onClick={() => toggleSort('datePerformed')}
            >
              Date
              {sortField === 'datePerformed' && (
                sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 inline-block ml-1" /> : <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
              )}
            </th>
            <th className="px-2 py-3 border-b-2 w-1/6 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Location
            </th>
            <th className="px-2 py-3 border-b-2 w-1/6 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Featured
            </th>
            <th className="px-2 py-3 border-b-2 w-1/6 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Video
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSongs.map((song, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-2 py-3 whitespace-normal text-xs">{song.title}</td>
              <td className="px-2 py-3 whitespace-nowrap text-xs">{song.datePerformed}</td>
              <td className="px-2 py-3 whitespace-normal text-xs">{song.location}</td>
              <td className="px-2 py-3 whitespace-nowrap text-xs">{song.featured}</td>
              <td className="px-2 py-3 whitespace-nowrap text-xs">
                <a href={song.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  Watch
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  
}
export default SongTable;