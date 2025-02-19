// Dependencies and
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Env Setup
require("dotenv").config();

//Routes Middleware
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

// Server Setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [process.env.HOSTED_URI],
  credetials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//Database Connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas.")
);

// Backend Routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// Server Gateway Response
if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`API is now online on port ${process.env.PORT || 3000}`);
  });
}

module.exports = { app, mongoose };
