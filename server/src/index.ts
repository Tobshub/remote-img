import express from "express";
import { config } from "dotenv";
import appHandler from "./config/api";
import { PrismaConn } from "./config/prisma";
import Log from "./config/logger";

// load environment variables
config();

/** environemnt variables used throughout the app */
export const env = {
  port: process.env.PORT ?? 4000,
  jwtSecret: process.env.JWT_SECRET,
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
};

const app = express();

appHandler(app);

PrismaConn().then(() => {
  app.listen(env.port, () => Log.info(`Live port: ${env.port}`));
});
