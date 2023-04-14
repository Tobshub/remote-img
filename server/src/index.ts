import dotenv from "dotenv";
// load environment variables
dotenv.config();
import express from "express";
import appHandler from "./config/api";
import { PrismaConn } from "./config/prisma";
import Log from "./config/logger";

const env = {
  port: process.env.PORT ?? 4000,
};

const app = express();

appHandler(app);

PrismaConn().then(() => {
  app.listen(env.port, () => Log.info(`Live port: ${env.port}`));
});
