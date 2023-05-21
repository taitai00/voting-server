require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const delegateRoutes = require("./routes/delegates");
const userRoutes = require("./routes/user");
const cors = require("cors");
const e = require("express");

// express app a
const app = express();
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
  })
);

// routes
app.use("/api/delegates", delegateRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
