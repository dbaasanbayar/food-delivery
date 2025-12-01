import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hashSync(password, 1);
    console.log("old password", password);
    console.log("hash password", hashedPassword);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
    console.log(user, "user details");
    res.status(200).send({ message: "Success", data: user });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Error", error });
  }
};

export const signIn = async (req, res) => {
  try {
    const result = await UserModel.findById();
    const token = jwt.sign(
      { name: "baasanabayar", gender: "male" },
      "secret-key",
      {
        expiresIn: "1h",
      }
    );
    console.log(result);
    console.log(token, "token");

    res.send({ ...result, token });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};
