import { Express, json, static as expressStatic } from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trpc";
import { appRouter, appRouterCaller } from "../api/router";
import path from "path";

export default function appHandler(app: Express) {
  app.use(cors(), json(), expressStatic(path.join(process.cwd(), "public")));
  app.use(
    "/api",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.get("/img/:url", async (req, res) => {
    const imgUrl = req.params.url;

    const image = await appRouterCaller.retrieve.getByUrl(imgUrl).catch((_) => null);

    if (!image || !image.ok) {
      res.status(404).send("Image not found");
      return;
    }

    res.setHeader("Content-Type", image.value.type);
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Length", image.value.data.length);
    res.status(200).send(image.value.data);
  });

  app.get("/", (_, res) => {
    res.sendFile("public/index.html", { root: process.cwd() });
  });
}
