import { tRouter } from "../config/trpc";
import uploadRouter from "./upload/upload-router";

export const appRouter = tRouter({
  /** Router that handles image uploads */
  upload: uploadRouter,
});

export const appRouterCaller = appRouter.createCaller({ auth: undefined });

export type AppRouter = typeof appRouter;
