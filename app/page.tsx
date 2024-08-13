import SongTable from '../components/SongTable'
import SongsArray from '../app/SongsArray'

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
    <div className="container mx-auto py-0 my-10">
      <h1 className="text-3xl font-bold text-center my-8 cedarville-cursive-regular">Every song performed on the acoustic set of Eras Tour</h1>
      <SongTable songs={songs} />
      
    </div>
  )
}