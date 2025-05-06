require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const connectDB = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {app , server} = require("./lib/socket")
const path =require("path");

const PORT = process.env.PORT || 5000;



app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5173"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// use the json middleware
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));

// Use cookie-parser middleware
app.use(cookieParser());

// use the routers
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// listen the app
server.listen(PORT, () => {
  console.log(`Server is listening on Port http://localhost:${PORT}`);
  connectDB();
});
