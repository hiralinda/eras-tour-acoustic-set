import SongTable from '../components/SongTable'
import SongsArray from '../app/SongsArray'
import Hero from '../components/Hero';

interface Song {
  title: string;
  datePerformed: string;
  location: string;
  featured: string;
  videoLink: string;
}

const songs: Song[] = SongsArray

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto py-0 my-10">
        <SongTable songs={songs} />
      </div>
    </div>
  )
}