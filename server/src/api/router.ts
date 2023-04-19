import { tRouter } from "../config/trpc";
import authRouter from "./auth/auth-router";
import deleteRouter from "./delete/delete-router";
import retrieveRouter from "./retrieve/retrieve-router";
import uploadRouter from "./upload/upload-router";

export const appRouter = tRouter({
  /** Router that handles image uploads */
  upload: uploadRouter,
  /** Router that handles image retrieval */
  retrieve: retrieveRouter,
  /** Router that handles user auth */
  auth: authRouter,
  /** Router that handles deleting images */
  delete: deleteRouter,
});

export const appRouterCaller = appRouter.createCaller({ auth: undefined, isAuth: true });

export type AppRouter = typeof appRouter;
