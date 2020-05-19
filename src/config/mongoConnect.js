require("dotenv").config();

const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

module.exports = MONGO_CONNECTION;
