const express = require("express");
const router = express.Router();
const {
  getPersonalProductList,
  addToProductList,
  removeFromProductList,
} = require("../controllers/UserController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middlewares/Authenticationmiddleware");

router.get(
  "/products/list",
  authMiddleware,
  roleMiddleware("user"),
  getPersonalProductList
);
router.post(
  "/products/list/add",
  authMiddleware,
  roleMiddleware("user"),
  addToProductList
);
router.post(
  "/products/list/remove",
  authMiddleware,
  roleMiddleware("user"),
  removeFromProductList
);

module.exports = router;
