import Log from "../../../config/logger";
import { usePrisma } from "../../../config/prisma";
import { Err, Ok } from "../../../helpers/result";
import createUrl from "./url";

export default async function permUpload(data: string) {
  try {
    const newUrl = createUrl();
    const image = await usePrisma.image.create({
      data: {
        data,
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

    return Ok(image.reference.url);
  } catch (err) {
    Log.error(err, "Failed to perm upload image");
    return Err("upload failed");
  }
}
