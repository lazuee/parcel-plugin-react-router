import { createRequestListener } from "@mjackson/node-fetch-server";
import express from "express";
import { 
  unstable_createContext as createContext, unstable_RouterContextProvider as RouterContextProvider } from "react-router";

import reactRouterRequestHandler from "virtual:react-router/request-handler";

const app = express();

app.use(express.static("public"));
app.use("/client", express.static("dist/request-handler/client"));

app.get("/.well-known/appspecific/com.chrome.devtools.json", (_, res) => {
  res.status(404);
  res.send("Not Found");
});

const requestContext = new RouterContextProvider();
export const test = createContext(`hello`)
requestContext.set(test, `hello world from request-handler`)
app.use(createRequestListener(reactRouterRequestHandler(requestContext)));

app.listen(3000);
console.log("Server listening on port 3000 (http://localhost:3000)");

export default app;
