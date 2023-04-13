import { tRouter } from "../config/trpc";
import authRouter from "./auth/auth-router";
import retrieveRouter from "./retrieve/retrieve-router";
import uploadRouter from "./upload/upload-router";

export const appRouter = tRouter({
  /** Router that handles image uploads */
  upload: uploadRouter,
  /** Router that handles image retrieval */
  retrieve: retrieveRouter,
  /** Router that handles user auth */
  auth: authRouter,
});

export const appRouterCaller = appRouter.createCaller({ auth: undefined, isAuth: true });

export type AppRouter = typeof appRouter;
