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
import { unstable_matchRSCServerRequest as matchRSCServerRequest, unstable_RouterContextProvider as RouterContextProvider } from "react-router";

import routes from "virtual:react-router/routes";
import rrConfig from "virtual:react-router/config";

import "./entry.browser.tsx";

export function fetchServer(requestContext?: RouterContextProvider ) {
  return (request: Request) => matchRSCServerRequest({
    // Provide the React Server touchpoints.
    createTemporaryReferenceSet,
    decodeReply,
    decodeAction,
    decodeFormState,
    loadServerAction,
    // The incoming request.
    request,
    requestContext,
    // The app routes.
    routes,
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
