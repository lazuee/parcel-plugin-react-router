import { unstable_RouterContextProvider } from "react-router";
import { test } from "../../request-handler.ts";
import type { Route } from "./+types/route.ts";
import { log } from "./actions.ts";
import "./styles.css";

export function loader({ context }: { context: unstable_RouterContextProvider}) {
  return context?.get(test) ?? "hello, world";
}

export function ServerComponent({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <h1 className="home__heading">Home</h1>
      <p>This is the home page.</p>
      <p>loaderData: {loaderData}</p>
      <form action={log}>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
