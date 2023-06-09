import { z } from "zod";
import { tError, tProcedure, tRouter } from "../../config/trpc";
import appToken from "../token";
import Log from "../../config/logger";

const env = { email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD };

const authRouter = tRouter({
  login: tProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      Log.info("Attempting User Login");
      const valid = input.email === env.email && input.password === env.password;

      if (!valid) {
        Log.info("Login Failed");
        throw new tError({ code: "BAD_REQUEST", message: "Email or Password is wrong" });
      }

      const token = appToken.generate(input.email);
      if (token.ok) {
        Log.info("User Login");
        return token;
      }

      Log.info("Login Failed");
      throw new tError({ code: "INTERNAL_SERVER_ERROR", message: token.message });
    }),
});

export default authRouter;
