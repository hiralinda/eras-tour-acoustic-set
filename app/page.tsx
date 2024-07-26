import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import SongTable from '../components/SongTable';

interface Song {
  title: string;
  datePerformed: string;
  location: string;
  featured: string;
  videoLink: string;
}

async function getSongs(): Promise<Song[]> {
  const csvFilePath = path.join(process.cwd(), 'public', 'songs.csv');
  const fileContent = await fs.readFile(csvFilePath, { encoding: 'utf-8' });

  const songs: Song[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    cast: (value, context) => {
      if (context.column === 'featured') {
        return value.toLowerCase() === 'true';
      }
      return value;
    },
  });

  return songs;
}

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Song List</h1>
      <SongTable songs={songs} />
    </div>
  );
}