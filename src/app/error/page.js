import { redirect } from "next/navigation";

export default function Error() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h5 className="mb-2 flex flex-row items-center justify-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Something went wrong
      </h5>
      <p className=" text-gray-400 text-center mb-4">
        Please make sure you submit your email on the main page to be added to
        the platform.
        <br></br>
        If you already have, please wait 24 - 48 hours before receiving a
        confirmation from me.
        <br></br>
        If the issue still persists, please reach out to me directly at{" "}
        <a>mrinal.chanshetty@outlook.com</a>
      </p>
      <form
        action={async () => {
          "use server";
          redirect("/");
        }}
      >
        <button className="px-2 py-2 bg-spotify-green rounded-md border-2 border-black text-white">
          Go Back
        </button>
      </form>
    </div>
  );
}
