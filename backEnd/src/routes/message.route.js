const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const {getUsersForSidebar,getMessages,sendMessage} = require("../controllers/message.controller")
const router = express.Router()

router.get("/users",authMiddleware,getUsersForSidebar);
router.get("/:id",authMiddleware,getMessages);
router.post("/send/:id",authMiddleware,sendMessage);


module.exports =  router