import {  Poppins } from "next/font/google";
import "@/app/styles/globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata = {
  title: "Newsify",
  description: "Music + News in One",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gradient-to-br from-gray-500 to-black`}>{children}</body>
      
    </html>
  );
}
