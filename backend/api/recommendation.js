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
import { v4 as uuidv4 } from "uuid";

export async function bulkReaction(req, res) {
  let texts = req.body.headlines;
  let embeddings = await getEmbedding(texts);
  let vectors = [];
  for (let i = 0; i < texts.length; i++) {
    vectors.push({
      id: uuidv4(),
      values: embeddings[i],
      metadata: {
        headline: texts[i],
        reaction: req.body.reactions[i],
        uid: "base",
      },
    });
  }
  fetch("https://newsify-a03f785.svc.gcp-starter.pinecone.io/vectors/upsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": process.env.PINECONE_API_KEY,
      accept: "application/json",
    },
    body: JSON.stringify({ vectors: vectors }),
  })
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
}

export async function reaction(req, res) {
  let texts = [req.body.headline];
  let embeddings = await getEmbedding(texts);
  let id = uuidv4();
  const record = {
    vectors: [
      {
        id: id,
        values: embeddings[0],
        metadata: {
          headline: req.body.headline,
          reaction: req.body.reaction,
          uid: req.body.uid,
        },
      },
    ],
  };

  fetch("https://newsify-a03f785.svc.gcp-starter.pinecone.io/vectors/upsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": process.env.PINECONE_API_KEY,
      accept: "application/json",
    },
    body: JSON.stringify(record),
  })
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
}

export async function getArticleScores(articles, uid) {
  let userScores = await queryVectors(articles, uid);
  let baseScores = await queryVectors(articles, "base");
  //return combined score, weigh user score more
  return userScores.map(
    (score, index) => (0.95 * score) + (0.05 * baseScores[index])
  );
}

async function queryVectors(articles, uid) {
  var scores = [];
  const titles = articles.map((article) => article.title);
  let embeddings = await getEmbedding(titles);
  for (const embedding of embeddings) {
    //get top 5 vectors
    let body = {
      topK: 25,
      filter: {
        uid: uid,
      },
      includeMetadata: true,
      vector: embedding,
    };
    let res = await fetch(
      "https://newsify-a03f785.svc.gcp-starter.pinecone.io/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Api-Key": process.env.PINECONE_API_KEY,
          "Api-Key": "f4773cd9-8eaa-422c-adf9-dc5b8f885fad",
          accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    let data = await res.json();
    scores.push(calculateScores(data.matches));
  }

  return scores;
}

function calculateScores(matches) {
  let score = 0;
  for (const match of matches) {
    if (match.metadata.reaction === "like") {
      score += match.score;
    } else {
      score -= match.score;
    }
  }
  return score;
}
