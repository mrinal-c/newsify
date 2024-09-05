import { signIn } from "@/auth";
import "@/app/styles/page.css";
import Image from "next/image";
import spotifyWhiteImg from "/public/spotify-white.png";
import spotifyGreenImg from "/public/spotify-green.png";
import searchImg from "/public/search.png";
import diagramImg from "/public/diagram.png";
import newspaperImg from "/public/newspaper.png";
import { sendMail } from "./actions/email";

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
      <main className="flex-grow mt-20">
        <section id="#how-it-works">
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

        <section id="#add-email" className="mt-12">
          <form
            className="flex flex-col items-center"
            action={async (formData) => {
              "use server";
              await sendMail(formData.get('email'));
            }}
          >
            <p className="text-xl">
              Want to get started for free? Submit your email here.
            </p>
            <div className="mt-4">
              <input
                type="text"
                name="email"
                required
                className="w-64 rounded-md h-8 text-black"
              ></input>
              <button
                type="submit"
                className="ml-8 bg-spotify-green rounded-md px-3 py-1"
              >
                Submit
              </button>
            </div>
          </form>
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
