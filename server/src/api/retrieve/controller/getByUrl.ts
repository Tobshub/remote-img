import Log from "../../../config/logger";
import { usePrisma } from "../../../config/prisma";
import { Err, Ok } from "../../../helpers/result";

export default async function getImgByUrl(url: string) {
  try {
    let ref = null;
    if (url.startsWith("p_")) {
      ref = await usePrisma.permReference.findUnique({
        where: { url: url },
        select: { imageData: true, imageType: true },
      });
    } else {
      ref = await usePrisma.tempReference.findUnique({
        where: { url: url },
        select: { imageData: true, imageType: true },
      });
    }

    if (!ref) {
      return Err("Image not found");
    }

    return Ok({ data: ref.imageData, type: ref.imageType });
  } catch (err) {
    Log.error(err, "Failed to get image", { url });
    return Err("Failed to get image with url");
  }
}
