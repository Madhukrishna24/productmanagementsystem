const bcrypt = require("bcrypt");

const User = require("../models/User");
const { generateToken } = require("../middlewares/Authenticationmiddleware");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Error during email check:", err); 
      return res
        .status(500)
        .json({ error: "Internal server error. Please try again later." });
    }

    const user = results[0];
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res
          .status(500)
          .json({ error: "Internal server error. Please try again later." });
      }

      if (!isMatch)
        return res.status(401).json({ error: "Invalid email or password" });

      const token = generateToken(user);
      res.status(200).json({ token, role: user.role, id: user.id });
    });
  });
};


const register = (req, res) => {
  let { username, email, password, role } = req.body;

  if (!username)
    return res.status(400).json({ message: "Username is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  if (!role) role = "user";

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Error during email check:", err);
      return res
        .status(500)
        .json({ error: "Internal server error. Please try again later." });
    }

    if (results.length > 0)
      return res
        .status(400)
        .json({ error: "User with this email already exists" });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res
          .status(500)
          .json({ error: "Internal server error. Please try again later." });
      }

      User.create(
        { username, email, password: hashedPassword, role },
        (err, results) => {
          if (err) {
            console.error("Error creating user:", err);
            return res.status(500).json({
              error: "Internal server error. Please try again later.",
            });
          }
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  });
};

module.exports = { login, register };
