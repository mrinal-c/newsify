"use server";
import { getArtists } from "../api/artists/api";

export async function getDashboardData() {
  const data = await getArtists();

  const artists = data.items.slice(0, 5).map((item) => item.name);
  const genreSet = new Set();
  data.items
    .slice(0, 5)
    .forEach((artistData) =>
      artistData.genres.forEach((genre) => genreSet.add(genre))
    );

  const genres = Array.from(genreSet);
  const query =
    artists.join(" OR ") +
    " OR " +
    genres.filter((genre) => genre.split(" ").length >= 2).join(" OR ");

  return { artists, genres, query };
}
