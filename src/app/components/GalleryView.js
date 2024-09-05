"use client";

import { useState } from "react";
import spotifyGreenImg from "/public/spotify-green.png";
import searchImg from "/public/search.png";
import diagramImg from "/public/diagram.png";
import newspaperImg from "/public/newspaper.png";
import Image from "next/image";

export default function GalleryView() {
  // State to track the current div
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data for each div
  const divs = [
    {
      title: "1. Pull Spotify History",
      imgSrc: spotifyGreenImg,
      imgAlt: "spotify logo",
      description:
        "Login to Spotify to provide Newsify with your recent listening history",
    },
    {
      title: "2. Find Articles based on Keywords",
      imgSrc: searchImg,
      imgAlt: "search image",
      description: (
        <>
          I use your top artists and genres to pull content from the{" "}
          <a href="https://newsapi.org/" target="_blank">
            NewsAPI
          </a>
        </>
      ),
    },
    {
      title: "3. Rank Articles using ML Strategies",
      imgSrc: diagramImg,
      imgAlt: "image of machine learning",
      description: "Generate Article Embeddings to compare results",
    },
    {
      title: "4. Show Results, Get Feedback",
      imgSrc: newspaperImg,
      imgAlt: "Newspaper Image",
      description: "Read and Enjoy!",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Render only the current div */}
      <div className="flex flex-col p-4 m-4 items-center gap-6 rounded-xl border-2 border-black shadow-2xl drop-shadow-xl bg-gray-600">
        <p className="text-xl">{divs[currentIndex].title}</p>
        <Image
          src={divs[currentIndex].imgSrc}
          width={100}
          height={100}
          alt={divs[currentIndex].imgAlt}
        />
        <p className="text-sm">{divs[currentIndex].description}</p>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          disabled={currentIndex == 0}
          className={`px-2 py-1 ${
            currentIndex == 0 ? "bg-gray-400" : "bg-spotify-green"
          } rounded`}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={currentIndex == 3}
          className={`px-2 py-1 ${
            currentIndex == 3 ? "bg-gray-400" : "bg-spotify-green"
          } rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
