import { tRouter } from "../config/trpc";

export const appRouter = tRouter({});

export type AppRouter = typeof appRouter;
