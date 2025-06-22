// controllers/AuthController.js
import { UserModel } from "../models/User.js"; // or default import if you export default
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ msg: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new UserModel({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ msg: "SignUp Successfully", success: true });
  } catch (error) {
    console.error("Error in SignUp:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ msg: "Email Auth Or Password Wrong", success: false });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(403).json({ msg: "password wrong", success: false });
    }

    const jwtToken = JWT.sign(
      { email: user.email, _id: user?._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .json({
        msg: "Login Successfully",
        success: true,
        jwtToken,
        email,
        password,
        name: user?.name,
      });
  } catch (error) {
    console.error("Error in SignUp:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
