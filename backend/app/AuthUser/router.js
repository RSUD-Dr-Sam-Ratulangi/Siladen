const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, resetPasswordUser, resetSessionUser, cekSessionUser } = require("./controller");
const VerifyTokenUser = require("../../middleware/VerifyTokenUser");
const VerifyTokenAdmin = require("../../middleware/VerifyTokenAdmin");

router.get("/user/session", VerifyTokenUser, cekSessionUser);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

router.patch("/user/password/reset", VerifyTokenAdmin, resetPasswordUser);
router.patch("/user/session/reset", VerifyTokenAdmin, resetSessionUser);

router.delete("/user/logout", VerifyTokenUser, logoutUser);

module.exports = router;
