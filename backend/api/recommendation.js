// getting top 5 articles
//1. frontend signs user into Spotify
//2. frontend sends music profile to backend
//3. backend gets 15 articles from NewsAPI
//4. backend retrieves upvote and downvote vectors from Pinecone db
//5. backend calculates score for each article based on similarity/dissimilarity to upvote/downvote vectors
//6. backend returns top 5 articles

// responding to like/dislike
//1. frontend sends article headline, like/dislike, and user-id to backend
//2. backend gets headline embedding and upserts to DB w/ proper metadata

//backend APIs
//GET /articles
//POST /reaction
import { getEmbedding } from "./embedding.js";
import { fetch } from "cross-fetch";
import { Pinecone } from "@pinecone-database/pinecone";
const pinecone = new Pinecone({
  apiKey: `${process.env.PINECONE_API_KEY}`,
  environment: `${process.env.PINECONE_ENVIRONMENT}`,
});
const index = pinecone.index("newsify");
import { v4 as uuidv4 } from "uuid";

export async function reaction(req, res) {
  let texts = [req.body.headline];
  let embeddings = await getEmbedding(texts);
  let id = uuidv4();
  const record = [
    {
      "id": id,
      "values": embeddings[0],
      "metadata": {
        "headline": req.body.headline,
        "reaction": req.body.reaction,
        "uid": req.body.uid,
      },
    },
  ];

  fetch("https://newsify-a03f785.svc.gcp-starter.pinecone.io/vectors/upsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": `${process.env.PINECONE_API_KEY}`,
      "Accept": "application/json",
    },
    body: record,
  })
    .then((resp) =>  JSON.stringify(resp))
    .then((data) => {
      console.log(data);
    })
    .catch((err) => res.send(err));
}
