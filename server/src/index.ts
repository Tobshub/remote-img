import express from "express";
import { config } from "dotenv";
import appHandler from "./config/api";
import { createServer } from "http";
import { Server } from "socket.io";
import socketHandler from "./config/socket";
import { PrismaConn } from "./config/prisma";

// load environment variables
config();

// connect to database
PrismaConn();

/** environemnt variables used throughout the app */
export const env = { port: process.env.PORT ?? 4000 };

const app = express();
appHandler(app);

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

server.listen(env.port, () => {});

io.on("connection", (socket) => {
  socketHandler(io, socket);
});
