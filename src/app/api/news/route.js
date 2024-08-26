import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { getArticleScores, getNews } from "./helpers";

export async function GET(request) {
  try {
    const session = await auth();

    const searchParams = request.nextUrl.searchParams;
    const query = decodeURIComponent(searchParams.get("query"));
    const articles = await getNews(query);

    if (articles.length === 0) {
      return NextResponse.json({
        articles: [],
      });
    }

    const uid = session.user.id;
    const scores = await getArticleScores(articles, uid);

    //sort articles by score
    let articlesWithScores = articles.map((article, index) => ({
      ...article,
      score: scores[index],
    }));
    articlesWithScores.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      articles: articlesWithScores.slice(0, 15),
    });
  } catch (err) {
    console.log(err);
  }
}
