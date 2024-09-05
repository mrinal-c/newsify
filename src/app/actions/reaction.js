"use server";
import { auth } from "@/auth";

export async function postReaction(headline, reaction) {
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

async function getEmbedding(texts) {
    try {
      let body = {
        texts: texts,
      };
      let res = await fetch("https://api.cohere.ai/v1/embed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + process.env.COHERE_API_KEY,
        },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      let data = await res.json();
      return data.embeddings;
    } catch (error) {
      console.error("Failed to fetch embeddings:", error);
      return null;
    }
  }
  
