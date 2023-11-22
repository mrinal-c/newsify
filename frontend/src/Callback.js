import { useEffect, useState } from "react";
import "./Callback.css";
import Spinner from "./Spinner";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import {
  getAccessToken,
  getUserData,
  getUserNews,
  getUserTopItems,
  refreshAccessToken,
  postReaction,
} from "./api";

function Callback() {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState(null);
  const [topGenres, setTopGenres] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingNews, setFetchingNews] = useState(false);
  const [recordAction, setRecordAction] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (topGenres != null) {
      getMyNews();
    }
  }, [topGenres]);

  const loadData = async () => {
    setLoading(true);
    await checkAuth();
    await getUser();
    await showTopItems();
    setLoading(false);
  };

  const checkAuth = async () => {
    console.log("checking auth");
    console.log(localStorage.getItem("access_token"));
    if (
      localStorage.getItem("access_token") == null ||
      localStorage.getItem("access_token") == "undefined"
    ) {
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
    setTopGenres([...genreSet]);
    setTopArtists(data.items.slice(0, 5).map((item) => item.name));
  };

  const getMyNews = async () => {
    setFetchingNews(true);
    let data = await getUserNews(
      topArtists.join(" OR ") + " OR " + topGenres.join(" OR "),
      user.id
    );
    console.log(data);
    setNews(data);
    setFetchingNews(false);
  };

  const renderGenres = () => {
    return topGenres?.map((genre, index) => (
      <div key={index} className="genre-tag">
        {genre}
      </div>
    ));
  };

  const renderArtists = () => {
    return topArtists?.map((artist, index) => (
      <div key={index} className="genre-tag">
        {artist}
      </div>
    ));
  };

  // Define the event handlers for like and dislike button clicks
  const handleLike = (article) => {
    // Call the postReaction function from api.js
    if (recordAction) {
      postReaction(article.title, "like", user.id);
    }

    //color the button green
    
  };

  const handleDislike = (article) => {
    if (recordAction) {
      postReaction(article.title, "dislike", user.id);
    }
  };

  // ... the rest of your component

  return (
    <div className="Callback">
      <nav className="nav">
        <a href="/">Logout</a>
        {/* More nav items can be added here */}
      </nav>

      <header className="Callback-Header">
        {loading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="user-card">
              <h2 className="user-name">Welcome, {user?.display_name}!</h2>
              <p className="top-genres-intro">Your top genres are:</p>
              <div className="genre-tags-container">{renderGenres()}</div>
              <p className="top-genres-intro">Your top artists are:</p>
              <div className="genre-tags-container">{renderArtists()}</div>

              <div className="record-action">
                <label>
                  <input
                    type="checkbox"
                    checked={recordAction}
                    onChange={() => setRecordAction(!recordAction)}
                  />
                  Record Action
                </label>
              </div>
            </div>
            {fetchingNews && (
              <div className="progress-indicator">
                <Spinner />
              </div>
            )}
            <div className="news-container">
              {news?.map((article, index) => (
                <div key={index} className="card">
                  <a href={article.url} className="card-title" target="_blank">
                    {article.title}
                  </a>
                  <p className="card-content">{article.description}</p>
                  {/* Reaction buttons inside the card */}
                  <div className="reaction-buttons">
                    <button
                      className="button-like"
                      onClick={() => handleLike(article)}
                    >
                      <FaThumbsUp />
                    </button>
                    <button
                      className="button-dislike"
                      onClick={() => handleDislike(article)}
                    >
                      <FaThumbsDown />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default Callback;
