"use client";

import { sendMail } from "@/app/actions/email";
import { toast } from "react-hot-toast";

export default function EmailForm() {
  const isInvalid = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");

    if (isInvalid(email)) {
      toast.error("Please provide a valid email address");
    } else {
      await sendMail(email);
      toast.success(
        "Thank you for joining Newsify! You should receive a confirmation within 24 hours."
      );
    }
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <p className="text-xl">
        Want to get started for free? Submit your email here.
      </p>
      <div className="mt-4">
        <input
          type="text"
          name="email"
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
  );
}
