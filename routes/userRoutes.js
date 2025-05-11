const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

//Get my profile
router.get("/me", authMiddleware, userController.getMe);

//Update My Profile
router.put("/update", authMiddleware, userController.updateProfile);

module.exports = router;