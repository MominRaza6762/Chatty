const express = require("express");
const router = express.Router();
const { signup, login, logout,updateProfile,checkAuth } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth-middleware.js")


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/uploadpic", authMiddleware,updateProfile);
router.get("/check", authMiddleware,checkAuth);


module.exports = router;
