import { signIn } from "@/auth";
import "@/app/styles/page.css";
import Image from "next/image";
import spotifyWhiteImg from "/public/spotify-white.png";
import EmailForm from "@/app/components/EmailForm";
import GalleryView from "@/app/components/GalleryView";

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
        <p className="text-5xl underline px-3">Music + News. All in One.</p>
        <section id="#how-it-works" className="mt-16">
          <GalleryView />
        </section>

        <section id='#disclaimer' className="mt-16 px-3">
            <p>Newsify is a work in progress. I will be refining the news selection algorithms, UI, and add features as time goes on.</p>
        </section>

        <section id="#add-email" className="mt-16 px-3">
          <EmailForm />
        </section>
      </main>

      <footer>
        <div className="pt-8 pb-4 text-xs">
          <a href="https://www.mrinalchanshetty.com" target="_blank">
            Copyright © 2024 Mrinal Chanshetty. All Rights Reserved.
          </a>
          <br></br>
          <a href="https://www.flaticon.com" target='_blank' title="find icons">
            Icons created by iconset.co - Flaticon
          </a>
        </div>
      </footer>
    </div>
  );
}
