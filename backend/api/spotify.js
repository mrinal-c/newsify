const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const fetch = require('cross-fetch');

exports.requestAuth = function (req, res) {
  res.send({
    clientId: clientId
  });
};

exports.getAccessToken = function (req, res) {

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: req.body.code,
    redirect_uri: req.body.redirect_uri,
  });

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: params.toString(),
  })
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
};

exports.getUserData = function (req, res) {
  fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + req.headers.authorization.split(" ")[1],
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    });
}
