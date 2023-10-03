import "./App.css";
import { useEffect } from "react";
import { generateRandomString } from "./utils/utils";

function App() {
  useEffect(() => {
    requestAuth();
  }, []);

  const requestAuth = () => {
    fetch("http://localhost:5000/requestAuth")
      .then((res) => res.json())
      .then((data) => {
        let state = generateRandomString(16);
        let scope = "user-read-private user-read-email";

        let args = new URLSearchParams({
          response_type: "code",
          client_id: data.clientId,
          scope: scope,
          redirect_uri: "http://localhost:3000/callback",
          state: state,
        });
        window.location = "https://accounts.spotify.com/authorize?" + args;
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to Newsify!</p>
      </header>
    </div>
  );
}

export default App;
