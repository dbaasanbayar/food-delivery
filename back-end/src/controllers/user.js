import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { sendOTPEmail } from "../../utils/sendEmail.js";

export const signUp = async (req, res) => {
  try {
    const { phoneNumber, address, email, password } = req.body;
    console.log("REQ BODY:", req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(typeof password)
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

    const result = await UserModel.findOne({ email });

    if (!result) {
      return res.status(401).json({ message: "user does not exist" });
    }

    // ✅ result.password байх ёстой
    const isMatch = await bcrypt.compare(password, result.password);

    if (!isMatch) {
      return res.status(401).json({ message: "password does not match" });
    }

    const token = jwt.sign(
      {
        _id: result._id,      
        email: result.email,
        role: result.role,
      },
      "secret-key",
      { expiresIn: "1h" }
    );

    res.json({ email: result.email, token });
  } catch (error) {
    console.error("signIn error", error);
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

// 2. result unen hudal uu
// 2a. unen bol password shalgana
// 2ai. Password zov bol token butsaagaad ogno
// 2aii. Password buruu bol password doesn't match
// 2b. hudal bol user doesn't exist


// OTP түр хадгалах (production-д Redis ашиглана, одоо энгийн Map)
const otpStore = new Map();

// Step 1 — Email хүлээн авч OTP илгээнэ
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Email бүртгэлтэй эсэх шалгана
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }

    // 2. 6 оронтой OTP үүсгэнэ
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP:", otp); // development-д харах

    // 3. OTP-г 10 минут хадгална
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 минут
    });

    // 4. Gmail-д илгээнэ
    await sendOTPEmail(email, otp);

    res.json({ message: "OTP илгээгдлээ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

// Step 2 — OTP шалгана
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const stored = otpStore.get(email);

    // 1. OTP байна уу
    if (!stored) {
      return res.status(400).json({ message: "OTP олдсонгүй" });
    }

    // 2. Хугацаа дууссан уу
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP хугацаа дууссан" });
    }

    // 3. OTP зөв үү
    if (stored.otp !== otp) {
      return res.status(400).json({ message: "OTP буруу байна" });
    }

    res.json({ message: "OTP зөв байна" });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

// Step 3 — Шинэ нууц үг хадгална
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const stored = otpStore.get(email);

    if (!stored) {
      return res.status(400).json({ message: "OTP олдсонгүй" });
    }
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP хугацаа дууссан" });
    }
    if (stored.otp !== otp) {
      return res.status(400).json({ message: "OTP буруу байна" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updated = await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true } // ✅ шинэчлэгдсэн document буцаана
    );

    console.log("Шинэчлэгдсэн хэрэглэгч:", updated); // terminal шалгана

    if (!updated) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    otpStore.delete(email);

    res.json({ message: "Нууц үг амжилттай солигдлоо" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

