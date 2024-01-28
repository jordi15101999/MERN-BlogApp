const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const fs = require("fs");
const path = require("path");

const generateToken = (user) => {
  return jwt.sign({ email: user.email }, "0vpSegwHAgRFpumXjL3ISg==", {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = req.file ? req.file.filename : null;
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await user.save();

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Email or Password is incorrect" });
    }

    req.session.user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt.toLocaleDateString(),
      updatedAt: user.updatedAt.toLocaleDateString(),
    };

    const token = generateToken(user);
    res.json({ token, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName } = req.body;

    // Fetch the current user data to get the current avatar filename
    const currentUser = await User.findById(userId);

    // Check if an avatar file is included in the request
    if (req.file) {
      const avatarFilename = req.file.filename;

      // Delete the old avatar file if it exists
      if (currentUser.avatar) {
        const oldAvatarPath = path.join("uploads/avatar", currentUser.avatar);
        fs.unlinkSync(oldAvatarPath);
      }

      // Update user data with both full name and new avatar information
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            fullName,
            avatar: avatarFilename,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );

      res.json({ updatedUser });
    } else {
      // Update user data with only the full name
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            fullName,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );

      res.json({ updatedUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  updateProfile,
};
