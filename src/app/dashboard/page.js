import '@/app/styles/more.css';
import '@/app/styles/globals.css';
import NewsGrid from "../components/NewsGrid";
import { auth, signOut } from "@/auth";
import { getArtists } from '../api/artists/api';

export default async function Dashboard() {

  const session = await auth();

  const data = await getArtists();
  
  const artists = data.items.slice(0, 5).map((item) => item.name);
  const genres = [];
  data.items[0].genres.forEach((genre) => {
    genres.push(genre);
  });
  data.items[1].genres.forEach((genre) => {
    genres.push(genre);
  });
  const query = artists.join(" OR ") + " OR " + genres.join(" OR ");

  const renderGenres = () => {
    return genres.map((genre, index) => (
      <div key={index} className="genre-tag">
        {genre}
      </div>
    ));
  };

  const renderArtists = () => {
    return artists.map((artist, index) => (
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
          <h2 className="user-name">Welcome, {session.user.name}!</h2>
          <p className="top-genres-intro">Your top genres are:</p>
          <div className="genre-tags-container">{renderGenres()}</div>
          <p className="top-genres-intro">Your top artists are:</p>
          <div className="genre-tags-container">{renderArtists()}</div>
        </div>
      </header>

      <body>
        <NewsGrid query={query}/>
      </body>
    </div>
  );
}
