import { signIn } from "@/auth";
import "@/app/styles/page.css";
import Image from "next/image";
import spotifyWhiteImg from "/public/spotify-white.png";
import spotifyGreenImg from "/public/spotify-green.png";
import searchImg from "/public/search.png";
import diagramImg from "/public/diagram.png";
import newspaperImg from "/public/newspaper.png";

export default async function Page() {
  return (
    <div className="text-center text-white min-h-screen flex flex-col">
      <header>
        <nav className="flex justify-around items-center">
          <div className="text-3xl">Newsify</div>
          <form
            action={async () => {
              "use server";
              await signIn("spotify", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="flex items-center justify-center px-2 py-3 rounded-2xl bg-spotify-green text-lg cursor-pointer gap-2 transition duration-300 hover:bg-[#168e3a]"
            >
              <Image
                src={spotifyWhiteImg}
                width={25}
                height={25}
                alt="spotify logo"
              />
              My Dashboard
            </button>
          </form>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="mt-8">
          <p className="text-5xl underline">Music + News. All in One.</p>
          <div className="flex justify-center mt-10 gap-36 px-20 items-center">
            <div className="flex flex-col p-4 items-center gap-6">
              <p className="text-xl text-wrap">Pull Spotify History</p>
              <Image
                src={spotifyGreenImg}
                width={100}
                height={100}
                alt="spotify logo"
              />
              <p className="text-sm text-wrap">
                Login to Spotify to provide Newsify with your recent listening
                history
              </p>
            </div>
            <div className="flex flex-col p-4 items-center gap-6">
              <p className="text-xl text-wrap">
                Find Articles based on Keywords
              </p>
              <Image
                src={searchImg}
                width={100}
                height={100}
                alt="search image"
              />
              <p className="text-sm text-wrap">
                Use top artists and genres to pull content from the{" "}
                <a href="https://newsapi.org/" target="_blank">
                  NewsAPI
                </a>
              </p>
            </div>
            <div className="flex flex-col p-4 items-center gap-6">
              <p className="text-xl text-wrap">
                Rank Articles using ML Strategies
              </p>
              <Image
                src={diagramImg}
                width={100}
                height={100}
                alt="image of machine learning"
              />
              <p className="text-sm  text-wrap">
                Generate Article Embeddings to compare results
              </p>
            </div>
            <div className="flex flex-col p-4 items-center gap-6">
              <p className="text-xl text-wrap">Show Results, Get Feedback</p>
              <Image
                src={newspaperImg}
                width={100}
                height={100}
                alt="Newspaper Image"
              />
              <p className="text-sm  text-wrap">Read and Enjoy!</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="py-4 text-sm">
          <p>Copyright © 2024 Mrinal Chanshetty. All Rights Reserved.</p>
          <a href="https://www.flaticon.com/free-icons" title="find icons">
            Icons created by iconset.co - Flaticon
          </a>
        </div>
      </footer>
    </div>
  );
}
