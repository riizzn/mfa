import bcrypt from "bcryptjs";
import User from "../models/user.js";
import passport from "passport";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedpass = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      password: hashedpass,
      isMfaActive: false,
    });

    console.log("new user :", newUser);
    await newUser.save();
    res.status(200).json({message:"User registered succesfully"})
  } catch (error) {
    res.status(500).json({ error: "Error registering user", message: error });
  }
};

export const login = async (req, res) => {
    console.log("the authenticated user is :", req.user)
    res.status(200).json({message:"User loggin in Succesfully"})
   
};
export const authStatus = async (req, res) => {};
export const logout = async (req, res) => {};
export const setup2FA = async (req, res) => {};
export const verify2FA = async (req, res) => {};
export const reset2FA = async (req, res) => {};
