require("dotenv").config();
const envVars = process.env;

import http from "http";
import socketIo from "socket.io";
import express from "express";
import os from "os";
const MongoClient = require("mongodb").MongoClient;
import assert from "assert";
import cors from "cors";
import { config } from "./config";
import { FindAllDocument, FindLastNDocument } from "./database/Repository";
import cron from "node-cron";
import { seedDataIntoDB, getCookie } from "./cronjob/updateCookie";
// Use connect method to connect to the server
const {
  url,
  collectionNameBankNiftyOptionChainOI,
  collectionNameBankNiftyFuturesOI,
} = config;

const app = express();
app.use(cors()); // We're telling express to use CORS

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin:
      envVars.NODE_ENV === "dev"
        ? "http://localhost:3000"
        : "*",
    methods: ["GET", "POST"],
  },
}); // < Interesting

//Hello WORLD
app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

const getApiAndEmit = async (socket, date) => {
  const startOfDay = new Date(
    new Date(date).setUTCHours(0, 0, 0, 0)
  ).toISOString();
  const endOfDay = new Date(
    new Date(date).setUTCHours(23, 59, 59, 999)
  ).toISOString();

  try {
    const bankNiftyoptionChainData = await FindLastNDocument(
      collectionNameBankNiftyOptionChainOI,
      {
        createdAt: {
          $gte: new Date(startOfDay),
          $lt: new Date(endOfDay),
        },
      },
      { createdAt: 1 },
      200
    );

    const bankNiftyFutureData = await FindLastNDocument(
      collectionNameBankNiftyFuturesOI,
      {
        createdAt: {
          $gte: new Date(startOfDay),
          $lt: new Date(endOfDay),
        },
      },
      { createdAt: 1 },
      200
    );
    
    console.log('date ***', date)
    console.log(' emit FromAPI ***')
    console.log(' bankNiftyFutureData ***',bankNiftyFutureData)

    socket.emit("FromAPI", {
      bankNiftyoptionChainData,
      bankNiftyFutureData,
    });
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  let date = socket.handshake.query["date"];
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket, date), 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 8080, async () => {
  console.log(`Listening on port ${process.env.PORT || 8080}!`);

  try {
    let client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    global.client = client;

    const cleanup = (event) => {
      // SIGINT is sent for example when you Ctrl+C a running process from the command line.
      client.close(); // Close MongodDB Connection when Process ends
      process.exit(); // Exit with default success-code '0'.
    };

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);

    console.log(`Database connection successfully ${url}`);
    cron.schedule("*/3 9-15 * * 1-5", seedDataIntoDB);
    cron.schedule("*/10 9-16 * * 1-5", getCookie);
  } catch (error) {
    console.log(`Database connection failed`);
  }
});
