import { auth } from "@/auth";
import { getEmbedding } from "./helpers";

export async function postReaction(headline, reaction) {
  "use server";
  try {
    const session = await auth();

    // const body = await request.json();

    let texts = [headline];

    let embeddings = await getEmbedding(texts);

    const record = {
      vectors: [
        {
          id: uuidv4(),
          values: embeddings[0],
          metadata: {
            headline: headline,
            reaction: reaction,
            uid: session.user.id,
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
    return data;
  } catch (err) {
    console.log(err);
  }
}
