const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const AuthRoutes = require("./routes/AuthRoutes");
const ArticleRoutes = require("./routes/ArticleRoutes");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const iplocal = "192.168.100.3";

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  session({
    secret: "tIgx36oC8NY8tpPFxXBfTQ==", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://jordi:UlEtSPq6IDV91TGM@cluster0.td2peaq.mongodb.net/blog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

app.use("/api/", AuthRoutes);
app.use("/api/", ArticleRoutes);

app.listen(PORT, iplocal, () => {
  console.log(`Server is running on http://${iplocal}:${PORT}`);
});
