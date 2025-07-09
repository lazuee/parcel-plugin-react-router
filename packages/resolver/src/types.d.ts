declare module "virtual:react-router/routes" {
  import { unstable_RSCRouteConfig } from "react-router";
  const routes: unstable_RSCRouteConfig;
  export default routes;
}

declare module "virtual:react-router/config" {
  import type { Config } from "@react-router/dev/config";
  const config: Config;
  export default config;
}

declare module "virtual:react-router/appLoadContext" {
  import { AppLoadContext, unstable_createContext } from 'react-router';
  const appLoadContext: unstable_createContext<AppLoadContext>;
  export default appLoadContext;
}