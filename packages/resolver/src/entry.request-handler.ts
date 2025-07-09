import * as React from "react";
import { renderToReadableStream } from "react-dom/server.edge" assert { env: "react-client" };
import {
  unstable_RouterContextProvider as RouterContextProvider,
  unstable_routeRSCServerRequest,
  unstable_RSCStaticRouter,
} from "react-router" assert { env: "react-client" };
// @ts-expect-error
import { createFromReadableStream } from "react-server-dom-parcel/client.edge" assert { env: "react-client" };

import { fetchServer } from "./entry.rsc.ts" assert { env: "react-server" };

const requestHandler = (requestContext?: RouterContextProvider) => {
  return (request: Request) => unstable_routeRSCServerRequest({
    request,
    fetchServer: fetchServer(requestContext),
    createFromReadableStream,
    async renderHTML(getPayload) {
      return await renderToReadableStream(
        React.createElement(unstable_RSCStaticRouter, { getPayload }),
        {
          bootstrapScriptContent: (
            fetchServer as unknown as { bootstrapScript: string }
          ).bootstrapScript,
        },
      );
    },
  });
};

export default requestHandler;
