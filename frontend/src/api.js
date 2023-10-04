// import { generateRandomString } from "./utils";
import { generateRandomString } from "./utils";
export async function requestAuth() {
  try {
        const res = await fetch("http://localhost:5000/requestAuth");
        const data = await res.json();
        let state = generateRandomString(16);
        let scope = "user-read-private user-read-email";

        let args = new URLSearchParams({
            response_type: "code",
            client_id: data.clientId,
            scope: scope,
            redirect_uri: "http://localhost:3000/callback",
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
    redirect_uri: "http://localhost:3000/callback",
  };
  try {
        const res = await fetch("http://localhost:5000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
    } catch (err) {
        console.log(err);
    }
}

export async function getUserData() {
  try {
        const res = await fetch("http://localhost:5000/userData", {
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

export async function getNews(queryString) {
  let params = new URLSearchParams({
    q: queryString,
  });
  try {
        const res = await fetch("http://localhost:5000/news?" + params);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
