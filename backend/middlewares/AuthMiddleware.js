const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, "0vpSegwHAgRFpumXjL3ISg==", (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = req.session.user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
