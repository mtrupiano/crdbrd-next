import { auth } from "@/auth";

// TODO: Delete this page & directory
export default async function AuthTest() {
  const session = await auth();
  return (
    <main>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}