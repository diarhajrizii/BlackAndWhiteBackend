const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const secretKey = global.secretKey;
  const authHeader = req.headers["authorization"];
  const token = (authHeader && authHeader.split(" ")[1]) || process.env.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ isValid: false });
    }

    req.user = user;
    req.isValid = true;
    next();
  });
}

module.exports = { auth: authenticateToken };
