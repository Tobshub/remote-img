import { z } from "zod";
import { authProcedure, tError, tProcedure, tRouter } from "../../config/trpc";
import permUpload from "./controller/perm";

const uploadRouter = tRouter({
  /** Images uploaded this way are stored permanently */
  permUpload: authProcedure
    .input(z.object({ data: z.string(), type: z.string().optional().default("image/jpg") }))
    .mutation(async ({ input }) => {
      const res = await permUpload(input.data, input.type);

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
  /** Images uploaded this way are stored temporarily - duration specified in seconds */
  tempUpload: tProcedure
    .input(z.object({ data: z.string(), duration: z.number().max(60 * 60 * 24) }))
    .mutation(async () => {}),
});

export default uploadRouter;
