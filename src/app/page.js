import { signIn } from "@/auth";
import "@/app/styles/page.css";
import Image from 'next/image';
import spotifyLogo from '/public/spotify.png';

export default async function Page() {

  return (
    <div className="text-center">
      <header className="">
        <p className="text-5xl">Welcome to Newsify!</p>
        <form
          action={async () => {
            "use server";
            await signIn('spotify', {redirectTo: '/dashboard'});
          }}
        >
          <button type="submit" className="login-btn">
            <Image src={spotifyLogo} width={25} height={25} alt="spotifyLogo"/>
            Login with Spotify
          </button>

        </form>
      </header>
    </div>
  );
}
