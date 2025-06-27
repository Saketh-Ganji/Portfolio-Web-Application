const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
   if (!token) return res.status(401).json({ message: "Unauthorized access" });

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token invalid" });
      req.user = user; // Attach user data to request
      next();
   });
};

module.exports = authMiddleware;
