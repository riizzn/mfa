import bcrypt from "bcryptjs";
import User from "../models/user.js";
import passport from "passport";
import qrCode from "qrcode";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";

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
    res.status(200).json({ message: "User registered succesfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user", message: error });
  }
};

export const login = async (req, res) => {
  console.log("the authenticated user is :", req.user);
  res.status(200).json({
    message: "User logged in Succesfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "User authenticated succesfully" });
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
};
export const logout = async (req, res) => {
  if (!req.user) res.status(401).json({ message: "Unauthorized user" });
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      //clear cookie
      res.clearCookie("coonect.sid")
      res.status(200).json({ message: "Logout successfully" });
    });
  });
};
export const setup2FA = async (req, res) => {
  try {
    console.log("the req.user is :", req.user);
    const user = req.user;
    const secret = speakeasy.generateSecret();
    console.log(secret);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.rez.com",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({ qrCode: qrImageUrl, secret: secret.base32 });
  } catch (error) {
    res.status(500).json({ error: "Error setting up 2FA", message: error });
  }
};
export const verify2FA = async (req, res) => {
  const user = req.user;
  const { token } = req.body;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });
  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Verified", token: jwtToken });
  } else return res.status(400).json({ message: "Invalid 2FA token" });
};
export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.isMfaActive = false;
    user.twoFactorSecret = "";
    await user.save();
    res.status(200).json({ message: "2FA reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Error reseting 2FA", message: error });
  }
};
