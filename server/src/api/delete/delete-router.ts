import { z } from "zod";
import { authProcedure, tError, tRouter } from "../../config/trpc";
import Log from "../../config/logger";
import { usePrisma } from "../../config/prisma";
import { Ok } from "../../helpers/result";

const deleteRouter = tRouter({
  withUrl: authProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      Log.info(`Deleting image with url: ${input}`);
      if (input.startsWith("p_")) {
        await usePrisma.permReference.delete({ where: { url: input } });
      } else {
        await usePrisma.tempReference.deleteMany({ where: { url: input } });
      }

      Log.info(`Deleted image with url: ${input}`);
      return Ok({});
    } catch (err) {
      Log.error(err, `Failed to delete image with url: ${input}`);
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete image with that url",
      });
    }
  }),
});

export default deleteRouter;
