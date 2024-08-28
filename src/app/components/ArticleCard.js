'use server';
import '@/app/styles/more.css';

export default async function ArticleCard({article, index}) {
  return (
    <div key={index} className="card">
      <a href={article.url} className="card-title" target="_blank">
        {article.title}
      </a>
      <p className="card-content">{article.description}</p>
      {/* Reaction buttons inside the card */}
      {/* <div className="reaction-buttons">
        <button className="button-like" onClick={() => handleLike(article)}>
          <FaThumbsUp />
        </button>
        <button
          className="button-dislike"
          onClick={() => handleDislike(article)}
        >
          <FaThumbsDown />
        </button>
      </div> */}
    </div>
  );
}
