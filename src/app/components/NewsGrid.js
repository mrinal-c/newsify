'use server';
import { getUserNews } from "@/app/actions/news";
import ArticleCard from "./ArticleCard";

export default async function NewsGrid({query}) {
  const data = await getUserNews(query);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-8 p-4">
      {data?.articles.map((article, index) => (
        <ArticleCard article={article} index={index} key={index}/>
      ))}
    </div>
  );
}
