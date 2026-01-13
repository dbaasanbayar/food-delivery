import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import chalk from "chalk";

configDotenv();

const connectionString = process.env.MongoDB;

export const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log(chalk.blue("DB connected"));
  } catch (error) {
    console.log(error);
  }
};
