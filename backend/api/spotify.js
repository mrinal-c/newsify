const { generateRandomString, generateCodeChallenge } = require("./utils");
const clientId = process.env.SPOTIFY_CLIENT_ID;
const fetch = require('cross-fetch');

exports.requestAuth = function (req, res) {
  let code_verifier = generateRandomString(128);
  res.send({
    clientId: clientId,
    code_verifier: code_verifier,
    state: generateRandomString(16),
    codeChallenge: generateCodeChallenge(code_verifier),
  });
};

exports.getAccessToken = function (req, res) {

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: req.body.code,
    redirect_uri: req.body.redirect_uri,
    code_verifier: req.body.codeVerifier,
    client_id: clientId,
  });

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
};
