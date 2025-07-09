import type { Route } from "./+types/route.ts";
import { log } from "./actions.ts";
import "./styles.css";

export function loader({ context }: Route.LoaderArgs) {
  return { env: structuredClone(context.env) };
}

export function ServerComponent({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <h1 className="home__heading">Home</h1>
      <p>This is the home page.</p>
      <p>loaderData: {JSON.stringify(Object.fromEntries(Object.entries(loaderData.env).filter(([k]) => k.endsWith('_VERSION'))), null, 2)}</p>
      <form action={log}>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
