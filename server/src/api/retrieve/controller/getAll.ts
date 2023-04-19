import Log from "../../../config/logger";
import { usePrisma } from "../../../config/prisma";
import { Err, Ok } from "../../../helpers/result";

export default async function getAllUrls(options?: { cursor?: string | null; sort?: string }) {
  try {
    const permRefs = await usePrisma.permReference.findMany({ select: { url: true, name: true } });
    const tempRefs = await usePrisma.tempReference.findMany({ select: { url: true, name: true } });

    Log.info("Success getting image refs");
    return Ok(permRefs.concat(tempRefs));
  } catch (err) {
    Log.error(err, "Failed to get urls");
    return Err("Failed to get image urls");
  }
}
