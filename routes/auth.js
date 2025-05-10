const express = require("express");
const { signupRequestOtp ,loginRequestOtp, verifyOtp} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup/request-otp", signupRequestOtp);
router.post("/login/request-otp", loginRequestOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;