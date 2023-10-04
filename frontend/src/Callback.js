import { useEffect, useState } from "react";
import "./Callback.css";
import { getAccessToken, getUserData } from "./api";

function Callback() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    getAccessToken(code)
      .then(() => {
        getUserData().then((data) => {
          console.log(data);
          setUser(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Callback">
      <header className="Callback-Header">
        <p>Welcome to Newsify!</p>
        <p>Here is your Spotify Display Name:</p>
        {user && <p>{user.display_name}</p>}
      </header>
    </div>
  );
}

export default Callback;
