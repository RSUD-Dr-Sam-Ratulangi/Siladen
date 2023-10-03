const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("./controller");
const VerifyTokenUser = require("../../middleware/VerifyTokenUser");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.delete("/user/logout", VerifyTokenUser, logoutUser);

module.exports = router;
