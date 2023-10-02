
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/requestAuth")
      .then((res) => res.json())
      .then((data) => {
        let scope = "user-read-private user-read-email";
        localStorage.setItem("code_verifier", data.code_verifier);

        let args = new URLSearchParams({
          response_type: 'code',
          client_id: data.clientId,
          scope: scope,
          redirect_uri: 'http://localhost:3000/callback',
          state: data.state,
          code_challenge_method: 'S256',
          code_challenge: data.codeChallenge
        });
        window.location = 'https://accounts.spotify.com/authorize?' + args;
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Spotify Playlist Generator
        </p>
      </header>
    </div>
  );
}

export default App;
