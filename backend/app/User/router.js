const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  updateDeviceTokenById,
} = require("./controller");
const VerifyTokenAdmin = require("../../middleware/VerifyTokenAdmin");
const VerifyTokenUser = require("../../middleware/VerifyTokenUser");

router.get("/users", VerifyTokenAdmin, getAllUser);
router.get("/user/:id_user", VerifyTokenUser, getUserById);
router.patch("/user/:id_user", updateDeviceTokenById);

module.exports = router;
