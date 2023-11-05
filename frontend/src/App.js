import "./App.css";
import { useEffect } from "react";
import { requestAuth } from "./api.js";
import spotifyLogo from "./spotify.png";
import LoginCard from "./LoginCard.js"
import {Button} from '@chakra-ui/react';

function App() {
  const login = () => {
    requestAuth().then((url) => {
      window.location = url;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <LoginCard onLogin={login}/>
      </header>
    </div>
  );
}

export default App;
