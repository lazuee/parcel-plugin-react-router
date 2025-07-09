"use server-entry";

import {
  createTemporaryReferenceSet,
  decodeAction,
  decodeFormState,
  decodeReply,
  loadServerAction,
  renderToReadableStream,
  // @ts-expect-error
} from "react-server-dom-parcel/server.edge";
import { type AppLoadContext, type UNSAFE_MiddlewareEnabled, unstable_matchRSCServerRequest, unstable_RouterContextProvider, unstable_InitialContext } from "react-router";

import routes from "virtual:react-router/routes";
import rrConfig from "virtual:react-router/config";
import appLoadContext from "virtual:react-router/appLoadContext";

import "./entry.browser.tsx";

export function fetchServer(initialContext?: UNSAFE_MiddlewareEnabled extends true
  ? unstable_InitialContext
  : AppLoadContext) {
  let loadContext: unstable_RouterContextProvider;
  if (rrConfig.future?.unstable_middleware) {
    if (initialContext == null) {
      loadContext = new unstable_RouterContextProvider();
    } else {
      try {
        loadContext = new unstable_RouterContextProvider(
          initialContext as unknown as unstable_InitialContext
        );
      } catch (e) {
        throw new Error(
          "Unable to create initial `unstable_RouterContextProvider` instance. " +
          "Please confirm you are returning an instance of " +
          "`Map<unstable_routerContext, unknown>` from your `getLoadContext` function." +
          `\n\nError: ${e instanceof Error ? e.toString() : e}`
        );
      }
    }
  } else {
    loadContext = new unstable_RouterContextProvider(new Map([[appLoadContext, initialContext]]))
  }

  return (request: Request) => unstable_matchRSCServerRequest({
    // Provide the React Server touchpoints.
    createTemporaryReferenceSet,
    decodeReply,
    decodeAction,
    decodeFormState,
    loadServerAction,
    // The incoming request.
    request,
    requestContext: loadContext,
    // The app routes.
    routes: routes,
    basename: rrConfig.basename,
    // Encode the match with the React Server implementation.
    generateResponse(match) {
      return new Response(renderToReadableStream(match.payload), {
        status: match.statusCode,
        headers: match.headers,
      });
    },
  });
}
