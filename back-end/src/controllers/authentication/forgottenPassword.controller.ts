import { Request, Response } from "express";
import { User, user } from "../../schemas/users.schema";
import nodemailer from "nodemailer";
import env from "dotenv";
const jwt = require("jsonwebtoken");
env.config();

const Post = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  let privateKey: string = process.env.SECRET_KEY || "";
  let key = { firstName: user!.firstName };
  let token = await jwt.sign(
    { key },
    privateKey,
    { algorithm: process.env.HASH_ALGORITHM },
    { expiresIn: (process.env.EXPIRATION_FORGOTTEN_PASS as string) }
  );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_LESS_SECURE_PASS,
    },
  });

  const resetUrl = `http://localhost:3000/password-reset?token=${token}`;

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    text: `Click the link below to reset your password:\n\n${resetUrl}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.json({ message: "error" });
    } else {
      console.log("Email sent: " + info.response);
      return res.json({ message: "success" });
    }
  });
};
export default { Post };
