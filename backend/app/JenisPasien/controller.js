const JenisPasien = require("./model");

const getAllJenisPasien = async (req, res) => {
  try {
    const jenis_pasien = await JenisPasien.findAll({
      attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
    });

    if (jenis_pasien.length === 0) {
      return res.status(404).json({
        code: "404",
        status: "NOT_FOUND",
        errors: "No Data Jenis Pasien Found",
      });
    }

    res.status(200).json({
      code: "200",
      status: "OK",
      data: jenis_pasien,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error,
    });
  }
};

const postJenisPasien = async (req, res) => {
  try {
    const { nama_jenis_pasien } = req.body;

    const jenis_pasien = await JenisPasien.create({
      nama_jenis_pasien,
    });

    res.status(200).json({
      code: "200",
      status: "OK",
      data: jenis_pasien,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error,
    });
  }
};

module.exports = {
  getAllJenisPasien,
  postJenisPasien,
};
