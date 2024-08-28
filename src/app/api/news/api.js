import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { getArticleScores, getNews } from "./helpers";

export async function getUserNews(query) {
  "use server";
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
