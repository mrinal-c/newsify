"use server";
import { auth } from "@/auth";

export async function getArtists() {
  try {
    const session = await auth();
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/artists",
      {
        method: "GET",
        headers: { "Authorization":  `Bearer ${session?.accessToken}` }
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
