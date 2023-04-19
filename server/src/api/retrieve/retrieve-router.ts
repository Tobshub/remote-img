import { z } from "zod";
import { tError, tProcedure, tRouter, authProcedure } from "../../config/trpc";
import getImgByUrl from "./controller/getByUrl";
import getAllUrls from "./controller/getAll";
import filterImagesByName from "./controller/filterByName";

const retrieveRouter = tRouter({
  getByUrl: tProcedure.input(z.string()).query(async ({ input }) => {
    const res = await getImgByUrl(input);
    if (res.ok) return res;

    switch (res.message) {
      case "Image not found": {
        throw new tError({ code: "NOT_FOUND", message: res.message });
      }
      default: {
        throw new tError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occured",
          cause: res.message,
        });
      }
    }
  }),
  getAll: authProcedure
    .input(z.object({ query: z.string().optional(), cursor: z.string().nullish() }))
    .query(async ({ input }) => {
      const res = input.query
        ? await filterImagesByName(input.query)
        : await getAllUrls({ cursor: input.cursor });
      if (res.ok) {
        (res as any).nextCursor = res.value[res.value.length - 1]?.url;
        return res as typeof res & { nextcursor: string };
      }

      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occured",
        cause: res.message,
      });
    }),
});

export default retrieveRouter;
