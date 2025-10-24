const admin = require("../config/firebase");

// Middleware to verify Firebase user token
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken; // Attach user info to the request
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };
