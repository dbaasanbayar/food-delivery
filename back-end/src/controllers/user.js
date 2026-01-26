import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    const { phoneNumber, address, email, password } = req.body;

    const hashedPassword = await bcrypt.hashSync(password, 10);
    console.log("old password", password);
    console.log("hash password", hashedPassword);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
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
    const { email, password } = req.body;
    const result = await UserModel.findOne({
      email,
    });

    if (!result) {
      console.log("result is false: user does not exist");
      return res.status(401).json({ message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password does not match" });
    }

    const token = jwt.sign({ email: result.email }, "secret-key", {
      expiresIn: "1h",
    });
    console.log(result);
    console.log("Token awah:", token);

    res.json({ email: result.email, token });
  } catch (error) {
    console.error("signIn error", error);
    res.send(error);
  }
};

// 2. result unen hudal uu
// 2a. unen bol password shalgana
// 2ai. Password zov bol token butsaagaad ogno
// 2aii. Password buruu bol password doesn't match
// 2b. hudal bol user doesn't exist
