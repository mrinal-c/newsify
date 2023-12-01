//1. frontend signs user into Spotify
//2. frontend sends music profile to backend
//3. backend gets 15 articles from NewsAPI
//4. backend retrieves upvote and downvote vectors from Pinecone db
//5. backend calculates score for each article based on similarity/dissimilarity to upvote/downvote vectors
//6. backend returns top 5 articles
import fetch from "cross-fetch";
import { getArticleScores } from "./recommendation.js";

export async function getNews (query) {
  let params = new URLSearchParams({
    q: query,
    apiKey: process.env.NEWS_API_KEY,
  });
  let res = await fetch("https://newsapi.org/v2/everything?" + params);
  let data = await res.json();
  return data.articles.slice(0, 50);
};



export async function getUserNews(req, res) {
  let query = decodeURIComponent(req.query.query);
  console.log("Query: ", query);
  let articles = await getNews(query);
  console.log("Article Length: ", articles.length);
  if (articles.length === 0) {
    res.send([]);
    return;
  }
  let uid = req.query.uid;
  let scores = await getArticleScores(articles, uid);

  //sort articles by score
  let articlesWithScores = articles.map((article, index) => ({
    ...article,
    score: scores[index],
  }));
  articlesWithScores.sort((a, b) => b.score - a.score);
  res.send(articlesWithScores.slice(0, 5));

}
