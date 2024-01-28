const express = require("express");
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatar"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, "avatar_" + Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/register", upload.single("avatar"), AuthController.register);
router.post("/login", AuthController.login);
router.get(
  "/users",
  AuthMiddleware.authenticateToken,
  AuthController.getAllUsers
);
router.patch(
  "/update-profile/:id",
  upload.single("avatar"),
  AuthMiddleware.authenticateToken,
  AuthController.updateProfile
);

module.exports = router;
