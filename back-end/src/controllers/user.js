import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;

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
