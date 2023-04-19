import Log from "../../../config/logger";
import { usePrisma } from "../../../config/prisma";
import { Err, Ok } from "../../../helpers/result";

export default async function filterImagesByName(query: string) {
  try {
    const permImages = await usePrisma.permReference.findMany({
      where: { name: { contains: query } },
      select: { url: true },
    });
    const tempImages = await usePrisma.tempReference.findMany({
      where: { name: { contains: query } },
      select: { url: true },
    });

    const images = permImages.concat(tempImages);
    return Ok(images);
  } catch (err) {
    Log.error(err, "Failed to filter images");
    return Err("Failed to filter images with query");
  }
}
