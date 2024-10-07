import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { PlaceModel } from "./models/places.model.js";
import { UserModel } from "./models/user.model.js";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import path from "path";
import multer from "multer";
import fs from "fs";

dotenv.config();

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use("/static", express.static(__dirname + "/static"));
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
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (user) {
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

app.post("/upload-by-link", async (req, res) => {
  const { Link } = req.body;
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: Link,
    dest: path.join(__dirname, "/static/uploads", newName),
  });
  res.json(path.join(newName));
});

const photoMiddleware = multer({ dest: "static/uploads" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newpath = path + "." + ext;
    fs.renameSync(path, newpath);
    const data = newpath.split("uploads");
    uploadedFiles.push(data[data.length - 1]);
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDocs = await PlaceModel.create({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    });
    res.json(placeDocs);
  });
});

app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await PlaceModel.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDocs = await PlaceModel.findById(id);
    if (userData.id === placeDocs.owner.toString()) {
      placeDocs.set({
        title,
        address,
        photos,
        description,
        maxGuests,
        checkOut,
        perks,
        extraInfo,
        checkIn,
        price
      });
      await placeDocs.save();
      res.json("ok");
    }
  });
});

app.get('/_places',async (req,res)=>{
  const data = await PlaceModel.find();
  res.json(data);
})

app.listen(port, () => console.log(`app is listening at port: ${port}!`));
