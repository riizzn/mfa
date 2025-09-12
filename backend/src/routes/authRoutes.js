import { Router } from "express";
import passport from "passport";
import {
  authStatus,
  login,
  logout,
  register,
  reset2FA,
  setup2FA,
  verify2FA,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local"),
  login
);

router.get("/status", authStatus);

router.post("/logout", logout);

router.post(
  "/2fa/setup",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "You must be logged in first" });
  },
  setup2FA
);
router.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "You must be logged in first" });
  },
  verify2FA
);
router.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "You must be logged in first" });
  },
  reset2FA
);
export default router;
