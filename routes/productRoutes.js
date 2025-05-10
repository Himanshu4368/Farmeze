const express = require("express");
const router = express.Router();
const productController = require("../controllers/productCrontroller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");


router.post("/", authMiddleware, adminMiddleware,  productController.addProduct);
router.get("/", productController.getAllProducts); // public
router.put("/:id",authMiddleware, adminMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, productController.deleteProduct);


module.exports = router;