import { Poppins, Rubik } from "next/font/google";
import "@/app/styles/globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const rubik = Rubik({
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Newsify",
  description: "Music + News in One",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} bg-gradient-to-br from-gray-500 to-black`}
      >
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
