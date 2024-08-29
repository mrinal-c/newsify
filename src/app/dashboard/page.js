import '@/app/styles/more.css';
import '@/app/styles/globals.css';
import NewsGrid from "../components/NewsGrid";
import { auth, signOut } from "@/auth";
import { getArtists } from '../api/artists/api';
import { getDashboardData } from './utils';

export default async function Dashboard() {

  const session = await auth();

  const { artists, genres, query } = await getDashboardData();

  const renderGenres = () => {
    return genres?.map((genre, index) => (
      <div key={index} className="genre-tag">
        {genre}
      </div>
    ));
  };

  const renderArtists = () => {
    return artists?.map((artist, index) => (
      <div key={index} className="genre-tag">
        {artist}
      </div>
    ));
  };

  return (
    <div className="Callback">
      <nav className="nav">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </nav>

      <header className="Callback-Header">
        <div className="user-card">
          <h2 className="user-name">Welcome, {session?.user.name}!</h2>
          <p className="top-genres-intro">Your top genres are:</p>
          <div className="genre-tags-container">{renderGenres()}</div>
          <p className="top-genres-intro">Your top artists are:</p>
          <div className="genre-tags-container">{renderArtists()}</div>
        </div>
      </header>

      <NewsGrid query={query}/>
    </div>
  );
}
