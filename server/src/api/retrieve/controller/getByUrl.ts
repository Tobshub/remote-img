import Log from "../../../config/logger";
import { usePrisma } from "../../../config/prisma";
import { Err, Ok } from "../../../helpers/result";

export default async function getImgByUrl(url: string) {
  try {
    const ref = await usePrisma.reference.findUnique({
      where: { url: url },
      select: { image: { select: { data: true, type: true } } },
    });

    if (!ref) {
      return Err("Image not found");
    }

    return Ok(ref.image);
  } catch (err) {
    Log.error(err, "Failed to get image", { url });
    return Err("Failed to get image with url");
  }
}
