import "@/app/styles/dashboard.css";
import NewsGrid from "../components/NewsGrid";
import { auth, signOut } from "@/auth";
import { getDashboardData } from "./utils";

export default async function Dashboard() {
  const session = await auth();

  const { artists, genres, query } = await getDashboardData();

  const renderGenres = () => {
    return genres?.map((genre, index) => (
      <div
        key={index}
        className="bg-spotify-green rounded-2xl px-5 py-2 font-semibold uppercase text-sm"
      >
        {genre}
      </div>
    ));
  };

  const renderArtists = () => {
    return artists?.map((artist, index) => (
      <div
        key={index}
        className="bg-spotify-green rounded-2xl px-5 py-2 font-semibold uppercase text-sm"
      >
        {artist}
      </div>
    ));
  };

  return (
    <div className="">
      <nav className="flex items-center">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button type="submit" className="text-white ml-8">Sign Out</button>
        </form>
      </nav>

      <main>
        <div className="flex flex-col justify-center items-center rounded-lg p-8 m-8 text-center text-white shadow-xl bg-[#303030]">
          <h2 className="text-spotify-green text-2xl font-semibold">Welcome, {session?.user.name}!</h2>
          <p className="mt-4 text-base">Your top genres are:</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">{renderGenres()}</div>
          <p className="mt-4 text-base">Your top artists are:</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">{renderArtists()}</div>
        </div>

        <NewsGrid query={query} />
      </main>

      
    </div>
  );
}
