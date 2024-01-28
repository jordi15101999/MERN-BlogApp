const Article = require("../models/Articles");
const User = require("../models/Users");
const path = require("path");
const fs = require("fs");

// const createArticle = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const author = req.user.username;
//     const article = new Article({ title, content, author });
//     await article.save();
//     res.json(article);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const createArticle = async (req, res) => {
  try {
    const { title, content, category, authorEmail, authorFullName } = req.body;
    const cover = req.file ? req.file.filename : null;

    if (!["Technology", "Entertainment", "Games", "Other"].includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const article = new Article({
      title,
      content,
      category,
      cover,
      authorEmail,
      authorFullName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await article.save();
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getArticleWithAvatar = async (req, res) => {
  try {
    const articles = await Article.find();

    const articlesWithAvatar = await Promise.all(
      articles.map(async (article) => {
        const author = await User.findOne({ email: article.authorEmail });
        return {
          _id: article.id,
          title: article.title,
          content: article.content,
          author: article.authorFullName,
          authorEmail: article.authorEmail,
          avatar: author ? author.avatar : "/default-avatar.png", // Use a default avatar if user not found
          category: article.category,
          cover: article.cover,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        };
      })
    );

    res.json(articlesWithAvatar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const author = await User.findOne({ email: article.authorEmail });

    const articleWithAvatar = {
      _id: article.id,
      title: article.title,
      content: article.content,
      author: article.authorFullName,
      authorEmail: article.authorEmail,
      avatar: author ? author.avatar : "/default-avatar.png", // Use a default avatar if user not found
      category: article.category,
      cover: article.cover,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };

    res.json(articleWithAvatar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const updateArticle = async (req, res) => {
//   try {
//     const { title, content, category } = req.body;
//     let cover;

//     // Check if there is a new cover image in the request
//     if (req.file) {
//       cover = req.file.filename;
//     }

//     const updateData = {
//       title,
//       content,
//       category,
//       updatedAt: new Date(),
//     };

//     // Include the cover image in the updateData if it exists
//     if (cover) {
//       updateData.cover = cover;
//     }

//     const article = await Article.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!article) {
//       // Article with the specified ID was not found
//       console.log("Article not found.");
//       return res.status(404).json({ error: "Article not found" });
//     }

//     // Article updated successfully
//     res.json(article);
//   } catch (error) {
//     console.error("Error updating article:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const updateArticle = async (req, res) => {
//   try {
//     const { title, content, category } = req.body;
//     const article = await Article.findByIdAndUpdate(
//       req.params.id,
//       { title, content, category },
//       { new: true }
//     );
//     res.json(article);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const updateArticle = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let cover;

    // Check if there is a new cover image in the request
    if (req.file) {
      cover = req.file.filename;
      // Delete the existing cover image if it exists
      const existingArticle = await Article.findById(req.params.id);
      if (existingArticle && existingArticle.cover) {
        const imagePath = path.join(
          __dirname,
          `../uploads/article-cover/${existingArticle.cover}`
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }

    const updateData = {
      title,
      content,
      category,
      updatedAt: new Date(),
    };

    // Include the cover image in the updateData if it exists
    if (cover) {
      updateData.cover = cover;
    }

    const article = await Article.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!article) {
      // Article with the specified ID was not found
      console.log("Article not found.");
      return res.status(404).json({ error: "Article not found" });
    }

    // Article updated successfully
    res.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleWithAvatar,
  getArticleById,
  updateArticle,
  deleteArticle,
};
