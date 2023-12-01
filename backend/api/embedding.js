import fetch from "cross-fetch";

export async function getEmbedding(texts) {
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