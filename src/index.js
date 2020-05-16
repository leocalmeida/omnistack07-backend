const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const mongoConnect = require("./config/mongoConnect");
const path = require("path");

const cors = require("cors");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(mongoConnect, {
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

server.listen(3334);
