"use server";
import { auth, signOut } from "@/auth";

export async function getArtists() {
  console.log('gay');
  try {
    const session = await auth();
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/artists",
      {
        method: "GET",
        headers: { "Authorization":  `Bearer ${session?.accessToken}` }
      }
    );

    if (res.status == 401) {
      await signOut({redirectTo: '/'});
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
