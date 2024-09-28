import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "./models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
} catch (error) {
  console.log("MongoDB could not connect !!!");
}

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const bcryptSalt = bcrypt.genSaltSync(10);
  if (UserModel.findOne({ email })) {
    res.status(423).json("User already exists");
  } else {
    try {
      const userDoc = await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (error) {
      res.json(error.message);
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    try {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id, name: userDoc.name },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, { httpOnly: true, secure: true })
              .json(userDoc);
          }
        );
      } else {
        res.status(401).json("invalid credentials");
      }
    } catch (error) {
      res.status(442).json(error);
    }
  } else {
    res.status(423).json("User does not exist");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await UserModel.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(port, () => console.log(`app is listening at port: ${port}!`));
