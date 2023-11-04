import fetch from 'cross-fetch';

export function requestAuth (req, res) {
  res.send({
    clientId: process.env.SPOTIFY_CLIENT_ID
  });
}

export function getAccessToken (req, res) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: req.body.code,
    redirect_uri: req.body.redirect_uri,
  });

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
    },
    body: params.toString(),
  })
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
}

export function refreshAccessToken (req, res) {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: req.body.refresh_token,
  });

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
    },
    body: params.toString(),
  })
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
}

export function getUserData (req, res) {
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

export function getTopItems (req, res) {
  fetch("https://api.spotify.com/v1/me/top/" + req.query.type, {
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
