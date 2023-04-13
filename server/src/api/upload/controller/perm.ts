import Log from "../../../config/logger";
import { usePrisma } from "../../../config/prisma";
import { Err, Ok } from "../../../helpers/result";
import createUrl from "./url";

export default async function permUpload(data: string, type: string) {
  try {
    const newUrl = createUrl({ isPerm: true });
    const image = await usePrisma.image.create({
      data: {
        data: Buffer.from(data, "base64"),
        type: type,
        reference: { create: { url: newUrl } },
      },
      select: { id: true, reference: { select: { url: true } } },
    });

    if (!image || !image.reference) {
      throw new Error(
        `Image upload to prisma failed${
          image && !image.reference ? ": Failed to create image reference" : ""
        }`
      );
    }

    Log.info("Image upload successful");
    return Ok(image.reference.url);
  } catch (err) {
    Log.error(err, "Failed to perm upload image");
    return Err("Upload failed");
  }
}
