// import { generateRandomString } from "./utils";
import { generateRandomString } from "./utils";
export async function requestAuth() {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/requestAuth`);
    const data = await res.json();
    let state = generateRandomString(16);
    let scope = "user-read-private user-read-email user-top-read";

    let args = new URLSearchParams({
      response_type: "code",
      client_id: data.clientId,
      scope: scope,
      redirect_uri: `${process.env.REACT_APP_FRONTEND_URL}/callback`,
      state: state,
    });
    let url = "https://accounts.spotify.com/authorize?" + args;
    return url;
  } catch (err) {
    console.log(err);
  }
}

export async function getAccessToken(code) {
  let body = {
    code: code,
    redirect_uri: `${process.env.REACT_APP_FRONTEND_URL}/callback`,
  };
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log("Access Token: " + data.access_token);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("expires_at", Date.now() + data.expires_in * 1000);
  } catch (err) {
    console.log(err);
  }
}

export async function refreshAccessToken() {
  let body = {
    refresh_token: localStorage.getItem("refresh_token"),
  };
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log("Access Token: " + data.access_token);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("expires_at", Date.now() + data.expires_in * 1000);
  } catch (err) {
    console.log(err);
  }
}

export async function getUserData() {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserNews(query, uid) {
  let params = new URLSearchParams({
    query: query,
    uid: uid,
  });
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news?` + params);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserTopItems() {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/topItems?type=artists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function postReaction(headline, reaction, uid) {
  let body = {
    headline: headline,
    reaction: reaction,
    uid: uid,
  };
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
