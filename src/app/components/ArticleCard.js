'use server';

export default async function ArticleCard({article, index}) {
  return (
    <div key={index} className="rounded-lg p-4 transition-transform duration-200 hover:scale-105 bg-[#303030]">
      <a href={article.url} className="text-spotify-green text-xl" target="_blank">
        {article.title}
      </a>
      <p className="mt-2 text-white">{article.description}</p>
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
