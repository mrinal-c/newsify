import { useEffect, useState } from "react";
import "./Callback.css";
import Spinner from './Spinner';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
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
  const [loading, setLoading] = useState(false);
  const [fetchingNews, setFetchingNews] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (topItems != null) {
      getMyNews();
    }
  }, [topItems]);

  const loadData = async () => {
    setLoading(true);
    await checkAuth();
    await getUser();
    await showTopItems();
    setLoading(false);
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

  const getMyNews = async () => {;
    setFetchingNews(true);
  const getMyNews = async () => {
    let uid = "123";
    console.log(topItems);
    let data = await getUserNews(topItems.join(" OR "), uid);
    console.log(data);
    setNews(data);
    setFetchingNews(false);
  };

  const renderGenres = () => {
    return topItems?.map((genre, index) => (
      <div key={index} className="genre-tag">{genre}</div>
    ));
  };

  // Define the event handlers for like and dislike button clicks
  const handleLike = (articleId) => {
    console.log('Liked article with id:', articleId);
    // Here, you could also update the state or perform API calls as necessary
  };

  const handleDislike = (articleId) => {
    console.log('Disliked article with id:', articleId);
    // Similarly, update the state or perform API calls if required
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
              <div className="genre-tags-container">
                {renderGenres()}
              </div>
            </div>
            {fetchingNews && <div className="progress-indicator"><Spinner /></div>}
            <div className="news-container">
              {news?.map((article, index) => (
                <div key={index} className="card">
                  <a href={article.url} className="card-title">{article.title}</a>
                  <p className="card-content">{article.description}</p>
                  {/* Reaction buttons inside the card */}
                  <div className="reaction-buttons">
                    <button className="button-like" onClick={() => handleLike(article.id)}>
                      <FaThumbsUp />
                    </button>
                    <button className="button-dislike" onClick={() => handleDislike(article.id)}>
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