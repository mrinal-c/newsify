const fetch = require("cross-fetch");

exports.getNews = function (req, res) {
  let params = new URLSearchParams({
    q: req.query.q,
    apiKey: process.env.NEWS_API_KEY,
  });
  fetch("https://newsapi.org/v2/everything?" + params)
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    });
};
