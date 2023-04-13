import { PrismaClient } from "@prisma/client";
import LOG from "./logger";

/**
 * Prisma Client API
 *
 * Typesafe interface to perform database operations
 */
export const usePrisma = new PrismaClient();

/** Connect to database with Prisma Client */
export async function PrismaConn() {
  try {
    await usePrisma.$connect();
    LOG.info("Prisma Client Connected");
  } catch (error) {
    LOG.error(error, "Error: Prisma couldn't connect to database");
  }
}
