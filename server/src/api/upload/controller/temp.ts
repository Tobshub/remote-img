import Log from "../../../config/logger";
import { usePrisma } from "../../../config/prisma";
import { Err, Ok } from "../../../helpers/result";
import createUrl from "./url";

export default async function tempUpload(data: string, type: string) {
  try {
    const newUrl = createUrl();
    const image = await usePrisma.tempReference.create({
      data: {
        imageData: Buffer.from(data, "base64"),
        imageType: type,
        url: newUrl,
      },
      select: { url: true },
    });

    if (!image) {
      throw new Error("Image upload to prisma failed");
    }

    Log.info("Image upload successful");
    return Ok(image.url);
  } catch (err) {
    Log.error(err, "Failed to temp upload image");
    return Err("Upload failed");
  }
}
