import { z } from "zod";
import { authProcedure, tError, tProcedure, tRouter } from "../../config/trpc";
import permUpload from "./controller/perm";
import tempUpload from "./controller/temp";
import Log from "../../config/logger";

const uploadRouter = tRouter({
  /** Images uploaded this way are stored permanently */
  permUpload: authProcedure
    .input(z.object({ data: z.string(), type: z.string().default("image/jpg"), name: z.string() }))
    .mutation(async ({ input }) => {
      Log.info(`Perm uploading image file ${input.name}`);
      const res = await permUpload(input.data, input.type, input.name);

      if (res.ok) return res;

      switch (res.message) {
        default: {
          throw new tError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occured",
            cause: res.message,
          });
        }
      }
    }),
  // TODO: allow user to specify duration
  /** Images uploaded this way are stored temporarily - duration specified in seconds */
  tempUpload: authProcedure
    .input(z.object({ data: z.string(), type: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const res = await tempUpload(input.data, input.type, input.name);

      if (res.ok) return res;

      switch (res.message) {
        default: {
          throw new tError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occured",
            cause: res.message,
          });
        }
      }
    }),
});

export default uploadRouter;
