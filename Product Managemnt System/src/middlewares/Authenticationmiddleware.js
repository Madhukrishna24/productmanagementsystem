const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  let token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return token;
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  });
};

const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware, generateToken };
