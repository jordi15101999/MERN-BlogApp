const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: {
    type: String,
    enum: ["Technology", "Entertainment", "Games", "Other"],
  },
  cover: String,
  authorEmail: String,
  authorFullName: String,
});

articlesSchema.set("timestamps", true);

const Articles = mongoose.model("Articles", articlesSchema);

module.exports = Articles;
