import { useEffect, useState } from "react";
import "./Callback.css";
import {
  getAccessToken,
  getUserData,
  getUserNews,
  getUserTopItems,
  refreshAccessToken,
} from "./api";

function Callback() {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState(null);
  const [topItems, setTopItems] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (topItems != null) {
      getMyNews();
    }
  }, [topItems]);

  const loadData = async () => {
    await checkAuth();
    await getUser();
    await showTopItems();
  };

  const checkAuth = async () => {
    console.log("checking auth");
    if (localStorage.getItem("access_token") == null || localStorage.getItem("access_token") == 'undefined') {
      console.log("no token");
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get("code");
      await getAccessToken(code);
    } else if (localStorage.getItem("expires_at") < Date.now()) {
      console.log("expired token");
      await refreshAccessToken();
    }
  };

  const getUser = async () => {
    let data = await getUserData();
    console.log(data);
    setUser(data);
  };

  const showTopItems = async () => {
    let data = await getUserTopItems();
    console.log(data);
    let genreSet = new Set();
    data.items[0].genres.forEach((genre) => {
      genreSet.add(genre);
    });
    data.items[1].genres.forEach((genre) => {
      genreSet.add(genre);
    });
    data.items[2].genres.forEach((genre) => {
      genreSet.add(genre);
    });
    setTopItems([...genreSet]);
  };

  const getMyNews = async () => {
    let uid = "123";
    console.log(topItems);
    let data = await getUserNews(topItems.join(" OR "), uid);
    console.log(data);
    setNews(data);
  };

  return (
    <div className="Callback">
      <header className="Callback-Header">
        <p>Welcome to Newsify!</p>
        <p>Here is your Spotify Display Name:</p>
        {user && <p>{user.display_name}</p>}
        <p>
          Here are your top genres from your favorite artists:
          {topItems != null ? topItems.join(", ") : null}
        </p>
        <div>
          Here are your recommended articles based on your top genres:
          <ul>
            {news != null
              ? news.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} className="news-link">
                      {article.title}
                    </a>
                    <p>{article.description}</p>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Callback;
