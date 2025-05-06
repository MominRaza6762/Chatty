const User = require("../models/auth.model");
const bcryptjs = require("bcryptjs");
const generateToken = require("../lib/utils");
const cloudinary = require("../lib/cloudinary.js") 
const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // check if all fields are filled
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check password length is  > 6
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6 characters Long...",
      });
    }

    // check if the user already exist with that email
    const checkUserExists = await User.findOne({ email });
    if (checkUserExists) {
      return res.status(400).json({
        success: false,
        message: "User already Exists, please try a different Email Address",
      });
    }

    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // then save it in the DB
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        success: true,
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unable to create the user, please check the data.",
      });
    }
  } catch (error) {
    console.log("Something went wrong in the auth controller : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // check password is correct
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    generateToken(user._id, res);
    
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(
      "Something went wrong in the login controller controller : ",
      error
    );
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log("Something went wrong in the auth controller : ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({
        success: false,
        message: "Please select the Profile Pic...",
      });
    }
    // upload to the cloudinary
    const result = await cloudinary.uploader.upload(profilePic);
    console.log(result);

    const userId = req.user._id;

    const newUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: result?.secure_url },
      { new: true }
    );
    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "User not found can't update the profile.",
      });
    }
    res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(
      "Something went wrong in the profile update controller : ",
      error
    );
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const checkAuth = (req,res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in the Check Auth Controller : ", error);
    res.status(500).json("Internal server error");
  }
};
module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
};
