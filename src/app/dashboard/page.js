import { auth, signOut } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <form
        action={async () => {
          "use server";
          await signOut({redirectTo: '/'});
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
