import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import appToken from "../api/token";

export const createContext = ({ req }: trpcExpress.CreateExpressContextOptions) => ({
  auth: req.headers.authorization,
  isAuth: false,
});

export type Context = inferAsyncReturnType<typeof createContext>;
const trpc = initTRPC.context<Context>().create();

export const tRouter = trpc.router;
export const tProcedure = trpc.procedure;
export const tError = TRPCError;

const AuthMiddleware = trpc.middleware(async ({ ctx, next }) => {
  if (!ctx.auth) {
    throw new tError({ code: "UNAUTHORIZED", message: "Please Login or Sign up." });
  }
  const isValid = appToken.validate(ctx.auth);
  if (!isValid.ok) {
    throw new tError({ code: "UNAUTHORIZED", message: "Please Login again." });
  }
  return next({ ctx: { auth: ctx.auth, isAuth: true } });
});

export const authProcedure = tProcedure.use(AuthMiddleware);
