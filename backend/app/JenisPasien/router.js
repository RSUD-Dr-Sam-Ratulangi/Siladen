const express = require("express");
const router = express.Router();
const { getAllJenisPasien, postJenisPasien } = require("./controller");
const VerifyTokenAdmin = require("../../middleware/VerifyTokenAdmin");
const VerifyTokenUser = require("../../middleware/VerifyTokenUser");

router.get("/jenis_pasien", VerifyTokenUser, getAllJenisPasien);
router.post("/jenis_pasien", VerifyTokenAdmin, postJenisPasien);

module.exports = router;
