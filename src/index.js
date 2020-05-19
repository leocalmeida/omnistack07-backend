const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

const cors = require("cors");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use(routes);
app.use(express.json());

server.listen(process.env.PORT || 3334);
