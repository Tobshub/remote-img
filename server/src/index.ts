import express from "express";
import { config } from "dotenv";
import appHandler from "./config/api";
import { PrismaConn } from "./config/prisma";

// load environment variables
config();

/** environemnt variables used throughout the app */
export const env = { port: process.env.PORT ?? 4000 };

const app = express();

appHandler(app);

PrismaConn().then(() => app.listen(env.port));
