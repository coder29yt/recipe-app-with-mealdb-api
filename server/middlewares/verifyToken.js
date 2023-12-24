const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log(token)

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Token verification failed" });
      }
      req.id = decoded.id;
    });
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { verifyToken };
