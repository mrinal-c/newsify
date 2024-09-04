import {  Poppins } from "next/font/google";
import "@/app/styles/globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });

export const metadata = {
  title: "Newsify",
  description: "Music + News in One",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
      
    </html>
  );
}
