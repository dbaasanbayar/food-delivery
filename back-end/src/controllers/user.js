import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = jwt.sign(
      { username: req.body.email },
      { password: req.body.password }
    );
    console.log(token, "token");

    const hashedPassword = await bcrypt.hashSync(password, 1);
    console.log("old password", password);
    console.log("hash password", hashedPassword);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
    res.status(200).send({ message: "Success", data: user });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Error", error });
  }
};

export const SignIn = async (req, res) => {
  try {
    const result = await UserModel.find(req.params.id);
    const token = jwt.sign(result);
    console.log();
  } catch (error) {}
};
