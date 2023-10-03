import { useEffect } from "react";
import { useState } from "react";
import "./Callback.css";

function Callback() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getAccessToken();
  }
    , []);


  const getAccessToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    let body = {
      code: code,
      redirect_uri: "http://localhost:3000/callback"
    };
    fetch("http://localhost:5000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        getUserData();
      })
      .catch((err) => console.log(err));
  };

  const getUserData = () => {
    fetch("http://localhost:5000/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log("printing");
        console.log(data);
      });
  }

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
