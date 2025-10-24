import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";

configDotenv();

const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  console.log(`server is running ${port}`);
});
