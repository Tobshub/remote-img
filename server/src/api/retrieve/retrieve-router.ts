import { z } from "zod";
import { tError, tProcedure, tRouter } from "../../config/trpc";
import getImgByUrl from "./controller/getByUrl";

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
  // getAll: ,
});

export default retrieveRouter;
