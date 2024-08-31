'use server';
import { getUserNews } from "@/app/actions/news";
import ArticleCard from "./ArticleCard";

export default async function NewsGrid({query}) {
  const data = await getUserNews(query);

  return (
    <div className="news-container">
      {data?.articles.map((article, index) => (
        <ArticleCard article={article} index={index} key={index}/>
      ))}
    </div>
  );
}
