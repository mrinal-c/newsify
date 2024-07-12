import { auth, signIn } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session)
    return (
      <div>
        Not authenticated
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button type="submit">Sign in</button>
        </form>
      </div>
    );

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
