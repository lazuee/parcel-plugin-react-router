import { createRequestListener } from "@mjackson/node-fetch-server";
import express from "express";
import { env } from "node:process";

import reactRouterRequestHandler from "virtual:react-router/request-handler";

const app = express();

app.use(express.static("public"));
app.use("/client", express.static("dist/request-handler/client"));

app.get("/.well-known/appspecific/com.chrome.devtools.json", (_, res) => {
  res.status(404);
  res.send("Not Found");
});


declare module "react-router" {
  export interface AppLoadContext {
    readonly env: typeof env;
  }
}

app.use(createRequestListener(reactRouterRequestHandler({ env })));

app.listen(3000);
console.log("Server listening on port 3000 (http://localhost:3000)");

export default app;
