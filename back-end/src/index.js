import express, { request, response } from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import { connectDB } from "./database/db.js";
import chalk from "chalk";
import { foodRouter } from "./routes/food.route.js";
import { userRouter } from "./routes/user.route.js";
import { categoryRouter } from "./routes/category.routes.js";
import cors from "cors";
import { getCategoryFoodRouter } from "./routes/category-food.routes.js";
configDotenv();

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/uploads", express.static("uploads"));
app.use("/categories-with-foods", getCategoryFoodRouter);

app.listen(port, () => {
  connectDB();
  console.log(chalk.green(`server aslaa at http://localhost:${port}`));
});
