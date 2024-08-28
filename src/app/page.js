import { auth, signIn } from "@/auth";
import "@/app/styles/page.css";
import spotifyLogo from "../../public/spotify.png";

export default async function Page() {

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to Newsify!</p>
        <form
          action={async () => {
            "use server";
            await signIn('spotify', {redirectTo: '/dashboard'});
          }}
        >
          <button type="submit" className="login-btn">
            <img src={spotifyLogo} alt="Spotify Logo" className="logo" />
            Login with Spotify
          </button>
        </form>
      </header>
    </div>
  );
}
