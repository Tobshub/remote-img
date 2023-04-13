import { PrismaClient } from "@prisma/client";
import Log from "./logger";

/**
 * Prisma Client API
 *
 * Typesafe interface to perform database operations
 */
export const usePrisma = new PrismaClient();

/** Connect to database with Prisma Client */
export async function PrismaConn() {
  try {
    Log.info("Prisma Client Connecting...");
    await usePrisma.$connect();
    Log.info("Prisma Client Connected");
  } catch (error) {
    Log.error(error, "Error: Prisma couldn't connect to database");
  }
}
