import Log from "../../../config/logger";
import { usePrisma } from "../../../config/prisma";
import { Err, Ok } from "../../../helpers/result";

export default async function getAllUrls(options?: { cursor?: string | null; sort?: string }) {
  try {
    const refs = await usePrisma.reference.findMany({
      take: 30,
      cursor: options?.cursor ? { url: options.cursor } : undefined,
      select: { url: true },
    });

    return Ok(refs)
  } catch (err) {
    Log.error(err, "Failed to get urls");
    return Err("Failed to get image urls");
  }
}
