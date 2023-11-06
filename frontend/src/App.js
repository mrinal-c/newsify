import "./App.css";
import { useEffect } from "react";
import { requestAuth } from "./api.js";
import spotifyLogo from "./spotify.png";

function App() {
  const login = () => {
    requestAuth().then((url) => {
      window.location = url;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to Newsify!</p>
        <button className="login-btn" onClick={login}>
          <img src={spotifyLogo} alt="Spotify Logo" className="logo" />
          Login with Spotify
        </button>
      </header>
    </div>
  );
}

export default App;
