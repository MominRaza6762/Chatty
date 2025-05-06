const Message = require("../models/message.model");
const User = require("../models/auth.model");
const Cloudinary = require("../lib/cloudinary");
const { getReceiverSocketId, io } = require("../lib/socket.js");
const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in the GetUsers Controller");
    res.status(500).json("Internal Server Error");
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatWith } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatWith },
        { senderId: userToChatWith, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in the getMessages Controller");
    res.status(500).json("Internal Server Error");
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploaderResponse = await Cloudinary.uploader.upload(image);
      imageUrl = uploaderResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // todo : realtime functionality goes here Bummm
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);


  } catch (error) {
    console.log("Error in the sendMessage Controller");
    res.status(500).json("Internal Server Error");
  }
};

module.exports = { getUsersForSidebar, getMessages, sendMessage };
