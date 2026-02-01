import express from "express";
import cors from "cors";
import orderRouter from './routes/orders';
import catalogRouter from './routes/catalog';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.send({ status: "ok" });
});

app.use("/orders", orderRouter)
app.use("/catalog", catalogRouter)

export default app;
