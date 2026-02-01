import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedCatalog } from "./seed/catalog.seed";
import {createServer} from 'http'
import { initSocket } from "./socket";
dotenv.config();

const PORT = process.env.PORT || 4000;

const httpServer = createServer(app);

initSocket(httpServer)

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(async () => {
    console.log("MongoDB connected");

    await seedCatalog();

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(console.error);
