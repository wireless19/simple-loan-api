
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { validateEmail } from "../utils/validateEmail.js";

import staffs from "../utils/staffs.json" with { type: "json" };

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    // Validate email
    if (validateEmail(email) === false) {
      throw new Error(`${email} is not a valid email`);
    }

    const user = staffs.find((staff) => staff.email === email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare passwords
    const isPasswordValid = password === user.password ? true : false;

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = generateTokenAndSetCookie(res, user.id, user.role);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true, // prevent xss(cross site scripting) attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
