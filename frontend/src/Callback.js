import { useEffect } from "react";

function Callback() {
  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    let codeVerifier = localStorage.getItem("code_verifier");

    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/callback",
      code_verifier: codeVerifier
    });

    fetch("http://localhost:5000/token", {
      method: "POST",
      body: body
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <header>
        <p>Callback</p>
      </header>
    </div>
  );
}

export default Callback;
