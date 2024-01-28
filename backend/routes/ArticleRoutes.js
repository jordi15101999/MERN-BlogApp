const express = require("express");
const ArticleController = require("../controllers/ArticleController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/article-cover"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, "cover_" + Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/articles", ArticleController.getArticleWithAvatar);
router.get("/articles/:id", ArticleController.getArticleById);
router.post(
  "/articlesUser",
  upload.single("cover"),
  AuthMiddleware.authenticateToken,
  ArticleController.createArticle
);
router.get(
  "/articlesUser",
  AuthMiddleware.authenticateToken,
  ArticleController.getAllArticles
);
router.get(
  "/articlesUser/:id",
  AuthMiddleware.authenticateToken,
  ArticleController.updateArticle
);
router.put(
  "/articlesUser/:id",
  upload.single("cover"),
  AuthMiddleware.authenticateToken,
  ArticleController.updateArticle
);
router.delete(
  "/articlesUser/:id",
  AuthMiddleware.authenticateToken,
  ArticleController.deleteArticle
);

module.exports = router;
