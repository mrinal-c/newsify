import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type');
    const session = await auth();
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/" + type,
      {
        method: "GET",
        headers: { "Authorization":  `Bearer ${session?.accessToken}` }
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}
