import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
  req,
}: trpcExpress.CreateExpressContextOptions) => ({
  auth: req.headers.authorization,
});

export type Context = inferAsyncReturnType<typeof createContext>;
const trpc = initTRPC.context<Context>().create();

export const tRouter = trpc.router;
export const tProcedure = trpc.procedure;
export const tError = TRPCError;
