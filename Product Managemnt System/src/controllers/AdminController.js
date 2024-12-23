const bcrypt = require("bcrypt");

const Product = require("../models/Product");
const AuditTrail = require("../models/AuditTrail");
const User = require("../models/User");

const getAllUsers = (req, res) => {
  User.findAll((err, results) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    return res.status(200).json(results);
  });
};

const createUser = (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username)
    return res.status(400).json({ message: "Username is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  if (!role) return res.status(400).json({ message: "Role is required" });

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

const updateUser = (req, res) => {
  const { password } = req.body;

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res
          .status(500)
          .json({ error: "Internal server error. Please try again later." });
      }

      User.update(req.params.id, { ...req.body, password: hashedPassword }, (error, results) => {
        if (error) return res.status(400).json({ error: error.message });
        res.status(200).json(results);
      });
    });
  } else {
    User.update(req.params.id, req.body, (error, results) => {
      if (error) return res.status(400).json({ error: error.message });
      res.status(200).json(results);
    });
  }
};

const deleteUser = (req, res) => {
  User.delete(Number(req.params.id), (error, results) => {
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(results);
  });
};

const getAuditTrail = (req, res) => {
  AuditTrail.findAll((error, results) => {
    if (error) return res.status(400).json({ error: error.message });
    res.json(results);
  });
};


const getProductOverview = (req, res) => {
  Product.findAll((error, results) => {
    if (error) return res.status(400).json({ error: error.message });
    res.json(results);
  });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getProductOverview,
  getAuditTrail,
  getAllUsers,
};
