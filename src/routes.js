const express = require("express");
const routes = express.Router();

const multer = require("multer");
const uploadConfig = require("./config/uploadConfig");
const upload = multer(uploadConfig);

const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

routes.post("/posts", upload.single("image"), PostController.store);
routes.get("/posts", PostController.index);

routes.post("/posts/:id/like", LikeController.store);

module.exports = routes;
