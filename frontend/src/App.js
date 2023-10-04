import "./App.css";
import { useEffect } from "react";
import { requestAuth } from "./api.js";

function App() {
  useEffect(() => {
    requestAuth().then((url) => {
      window.location = url;
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to Newsify!</p>
      </header>
    </div>
  );
}

export default App;
