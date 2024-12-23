const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
} = require("../controllers/productController");
const { requestProduct } = require("../controllers/ProductRequestController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middlewares/Authenticationmiddleware");


router.post("/", authMiddleware, roleMiddleware("admin"), createProduct);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProduct);

router.get("/:id", authMiddleware, roleMiddleware("admin"), getProductById);

router.get("/", authMiddleware, getAllProducts);

router.post("/request", authMiddleware, requestProduct);

module.exports = router;
