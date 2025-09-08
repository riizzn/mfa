import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import "dotenv/config";
import cors from "cors";
import dbConnect from "./config/db.js";

const app = express();
dbConnect()
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

//middlewares
app.use(cors(corsOptions));
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
const port = process.env.PORT || 7001;
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: process.env.SESSION_SECERET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);


//routes

//listen app
app.listen(port, () => {
  console.log(`listening on : ${port}`);
});
