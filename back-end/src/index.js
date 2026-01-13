import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import { connectDB } from "./database/db.js";
import chalk from "chalk";
import { foodRouter } from "./routes/food.route.js";
import { userRouter } from "./routes/user.route.js";

configDotenv();

const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.use("/food", foodRouter);

app.use("/user", userRouter);

app.listen(port, () => {
  connectDB();
  console.log(chalk.green(`server is running ${port}`));
});
