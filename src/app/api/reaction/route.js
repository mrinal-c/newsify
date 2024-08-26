import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { getEmbedding } from "./helpers";

export async function POST(request) {
  try {
    const session = await auth();

    const body = await request.json();

    let texts = [req.body.headline];

    let embeddings = await getEmbedding(texts);

    const record = {
      vectors: [
        {
          id: uuidv4(),
          values: embeddings[0],
          metadata: {
            headline: body.headline,
            reaction: body.reaction,
            uid: body.uid,
          },
        },
      ],
    };

    const res = await fetch(
      "https://newsify-a03f785.svc.gcp-starter.pinecone.io/vectors/upsert",
      {
        method: "POST",
        headers: {
        //   "Content-Type": "application/json",
          "Api-Key": process.env.PINECONE_API_KEY,
        //   accept: "application/json",
        },
        body: JSON.stringify(record),
      }
    );


    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}
