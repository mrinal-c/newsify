export async function getEmbedding(texts) {
  try {
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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    let data = await res.json();
    return data.embeddings;
  } catch (error) {
    console.error("Failed to fetch embeddings:", error);
    return null;
  }
}
