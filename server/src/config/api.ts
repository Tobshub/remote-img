import { Express, json } from "express";
import cors from "cors";
import trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trpc";
import { appRouter } from "../api/router";

export default function appHandler(app: Express) {
  app.use(cors(), json());
  app.use(
    "/api",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
}
