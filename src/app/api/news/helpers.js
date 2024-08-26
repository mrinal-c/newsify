export async function getNews(query) {
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
