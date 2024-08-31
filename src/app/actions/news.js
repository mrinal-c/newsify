"use server";
import { auth } from "@/auth";

export async function getUserNews(query) {
  try {
    const session = await auth();

    const articles = await getNews(query);

    if (articles.length === 0) {
      return {
        articles: [],
      };
    }

    const uid = session.user.id;
    const scores = await getArticleScores(articles, uid);

    //sort articles by score
    let articlesWithScores = articles.map((article, index) => ({
      ...article,
      score: scores[index],
    }));
    articlesWithScores.sort((a, b) => b.score - a.score);

    return {
      articles: articlesWithScores.slice(0, 15),
    };
  } catch (err) {
    console.log(err);
  }
}

async function getNews(query) {
    try {
      let params = new URLSearchParams({
        q: query,
        apiKey: process.env.NEWS_API_KEY,
        sortBy: "relevancy",
        language: "en",
      });
  
      let res = await fetch("https://newsapi.org/v2/everything?" + params);
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      let data = await res.json();
      return data.articles.slice(0, 50);
    } catch (error) {
      console.error("Error fetching news:", error);
      return []; // Return an empty array or handle the error accordingly
    }
  }
  
  export async function getArticleScores(articles, uid) {
    let userScores = await queryVectors(articles, uid);
    let baseScores = await queryVectors(articles, "base");
    //return combined score, weigh user score more
    return userScores.map(
      (score, index) => 0.8 * score + 0.2 * baseScores[index]
    );
  }
  
  async function queryVectors(articles, uid) {
    try {
      var scores = [];
      const titles = articles.map((article) => article.title);
      let embeddings = await getEmbedding(titles);
  
      for (const embedding of embeddings) {
        // Get top 5 vectors
        let body = {
          topK: 25,
          filter: {
            uid: uid,
          },
          includeMetadata: true,
          vector: embedding,
        };
  
        let res = await fetch(
          "https://newsify-a03f785.svc.aped-4627-b74a.pinecone.io/query",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Api-Key": process.env.PINECONE_API_KEY,
              accept: "application/json",
            },
            body: JSON.stringify(body),
          }
        );
  
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
  
        let data = await res.json();
        scores.push(calculateScores(data.matches));
      }
  
      return scores;
    } catch (error) {
      console.error("Error querying vectors:", error);
      return []; // Return an empty array or handle the error accordingly
    }
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
  
  async function getEmbedding(texts) {
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
  
    let data = await res.json();
    return data.embeddings;
  }
  