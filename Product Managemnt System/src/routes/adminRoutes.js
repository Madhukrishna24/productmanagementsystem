const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  roleMiddleware,
} = require("../middlewares/Authenticationmiddleware");
const {
  createUser,
  updateUser,
  deleteUser,
  getProductOverview,
  getAuditTrail,
  getAllUsers,
} = require("../controllers/AdminController");
const { route } = require("./productRoutes");

router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.post("/users", authMiddleware, roleMiddleware("admin"), createUser);
router.put("/users/:id", authMiddleware, roleMiddleware("admin"), updateUser);
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);
router.get(
  "/products/overview",
  authMiddleware,
  roleMiddleware("admin"),
  getProductOverview
);
router.get(
  "/audit-trails",
  authMiddleware,
  roleMiddleware("admin"),
  getAuditTrail
);

module.exports = router;
