const Laporan = require("./model");
const User = require("../User/model");
const KajianLaporan = require("../KajianLaporan/model");
const fs = require("fs");
const path = require("path");
const db = require("../../database");
const JenisPasien = require("../JenisPasien/model");
const formatTime = require("../../utils/formatTime");
const { Op, Sequelize } = require("sequelize");

//@description     Get All Laporan User Latest Order
//@route           GET /api/laporan?
//@access          Public
const getAllLaporan = async (req, res, next) => {
  try {
    const status = req.query.status;
    if (status === "dalam antrian" || status === "investigasi") {
      console.log("masuk sini cuy: ", status);
      const laporan = await Laporan.findAll({
        where: {
          status,
        },
        attributes: [
          "id_laporan",
          "nama_pasien",
          "no_rekam_medis",
          "ruangan",
          "umur",
          "asuransi",
          "jenis_kelamin_pasien",
          "waktu_mendapatkan_pelayanan",
          "waktu_kejadian_insiden",
          "insiden",
          "kronologis_insiden",
          "insiden_terjadi_pada_pasien",
          "dampak_insiden_terhadap_pasien",
          "probabilitas",
          "orang_pertama_melaporkan_insiden",
          // jenis pasien
          "tempat_insiden",
          "departement_penyebab_insiden",
          "tindak_lanjut_setelah_kejadian_dan_hasil",
          "yang_melakukan_tindak_lanjut_setelah_insiden",
          "kejadian_sama_pernah_terjadi_di_unit_lain",
          "status",
          "tanggal_laporan_dikirim",
          "gambar",
        ],
        order: [["tanggal_laporan_dikirim", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username", "id_user"],
          },
          {
            model: JenisPasien,
            attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
          },
        ],
      });

      const revLaporan = laporan.map((item) => ({
        id_laporan: item.id_laporan,
        nama_pasien: item.nama_pasien,
        no_rekam_medis: item.no_rekam_medis,
        ruangan: item.ruangan,
        umur: item.umur,
        asuransi: item.asuransi,
        jenis_kelamin_pasien: item.jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan: formatTime(item.waktu_mendapatkan_pelayanan),
        waktu_kejadian_insiden: formatTime(item.waktu_kejadian_insiden),
        insiden: item.insiden,
        kronologis_insiden: item.kronologis_insiden,
        insiden_terjadi_pada_pasien: item.insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien: item.dampak_insiden_terhadap_pasien,
        probabilitas: item.probabilitas,
        orang_pertama_melaporkan_insiden: item.orang_pertama_melaporkan_insiden,
        jenis_pasien: item.jenis_pasien.nama_jenis_pasien,
        tempat_insiden: item.tempat_insiden,
        departement_penyebab_insiden: item.departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil: item.tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden: item.yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain: item.kejadian_sama_pernah_terjadi_di_unit_lain,
        status: item.status,
        tanggal_laporan_dikirim: formatTime(item.tanggal_laporan_dikirim),
        gambar: item.gambar,
      }));

      res.status(200).json({
        code: "200",
        status: "OK",
        data: revLaporan,
      });
    } else if (status === "laporan selesai" || status === "laporan ditolak") {
      const laporan = await Laporan.findAll({
        where: {
          status,
        },
        attributes: [
          "id_laporan",
          "nama_pasien",
          "no_rekam_medis",
          "ruangan",
          "umur",
          "asuransi",
          "jenis_kelamin_pasien",
          "waktu_mendapatkan_pelayanan",
          "waktu_kejadian_insiden",
          "insiden",
          "kronologis_insiden",
          "insiden_terjadi_pada_pasien",
          "dampak_insiden_terhadap_pasien",
          "probabilitas",
          "orang_pertama_melaporkan_insiden",
          // jenis pasien
          "tempat_insiden",
          "departement_penyebab_insiden",
          "tindak_lanjut_setelah_kejadian_dan_hasil",
          "yang_melakukan_tindak_lanjut_setelah_insiden",
          "kejadian_sama_pernah_terjadi_di_unit_lain",
          "status",
          "tanggal_laporan_dikirim",
          "gambar",
        ],
        order: [["tanggal_laporan_dikirim", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username", "id_user"],
          },
          {
            model: JenisPasien,
            attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
          },
        ],
      });

      const revLaporan = laporan.map((item) => ({
        id_laporan: item.id_laporan,
        nama_pasien: item.nama_pasien,
        no_rekam_medis: item.no_rekam_medis,
        ruangan: item.ruangan,
        umur: item.umur,
        asuransi: item.asuransi,
        jenis_kelamin_pasien: item.jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan: formatTime(item.waktu_mendapatkan_pelayanan),
        waktu_kejadian_insiden: formatTime(item.waktu_kejadian_insiden),
        insiden: item.insiden,
        kronologis_insiden: item.kronologis_insiden,
        insiden_terjadi_pada_pasien: item.insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien: item.dampak_insiden_terhadap_pasien,
        probabilitas: item.probabilitas,
        orang_pertama_melaporkan_insiden: item.orang_pertama_melaporkan_insiden,
        jenis_pasien: item.jenis_pasien.nama_jenis_pasien,
        tempat_insiden: item.tempat_insiden,
        departement_penyebab_insiden: item.departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil: item.tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden: item.yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain: item.kejadian_sama_pernah_terjadi_di_unit_lain,
        status: item.status,
        tanggal_laporan_dikirim: formatTime(item.tanggal_laporan_dikirim),
        gambar: item.gambar,
      }));

      res.status(200).json({
        code: "200",
        status: "OK",
        data: revLaporan,
      });
    } else {
      const laporan = await Laporan.findAll({
        attributes: [
          "id_laporan",
          "nama_pasien",
          "no_rekam_medis",
          "ruangan",
          "umur",
          "asuransi",
          "jenis_kelamin_pasien",
          "waktu_mendapatkan_pelayanan",
          "waktu_kejadian_insiden",
          "insiden",
          "kronologis_insiden",
          "insiden_terjadi_pada_pasien",
          "dampak_insiden_terhadap_pasien",
          "probabilitas",
          "orang_pertama_melaporkan_insiden",
          // jenis pasien
          "tempat_insiden",
          "departement_penyebab_insiden",
          "tindak_lanjut_setelah_kejadian_dan_hasil",
          "yang_melakukan_tindak_lanjut_setelah_insiden",
          "kejadian_sama_pernah_terjadi_di_unit_lain",
          "status",
          "tanggal_laporan_dikirim",
          "gambar",
        ],
        order: [["tanggal_laporan_dikirim", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username", "id_user"],
          },
          {
            model: JenisPasien,
            attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
          },
        ],
      });

      const revLaporan = laporan.map((item) => ({
        id_laporan: item.id_laporan,
        nama_pasien: item.nama_pasien,
        no_rekam_medis: item.no_rekam_medis,
        ruangan: item.ruangan,
        umur: item.umur,
        asuransi: item.asuransi,
        jenis_kelamin_pasien: item.jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan: formatTime(item.waktu_mendapatkan_pelayanan),
        waktu_kejadian_insiden: formatTime(item.waktu_kejadian_insiden),
        insiden: item.insiden,
        kronologis_insiden: item.kronologis_insiden,
        insiden_terjadi_pada_pasien: item.insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien: item.dampak_insiden_terhadap_pasien,
        probabilitas: item.probabilitas,
        orang_pertama_melaporkan_insiden: item.orang_pertama_melaporkan_insiden,
        jenis_pasien: item.jenis_pasien.nama_jenis_pasien,
        tempat_insiden: item.tempat_insiden,
        departement_penyebab_insiden: item.departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil: item.tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden: item.yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain: item.kejadian_sama_pernah_terjadi_di_unit_lain,
        status: item.status,
        tanggal_laporan_dikirim: formatTime(item.tanggal_laporan_dikirim),
        gambar: item.gambar,
      }));

      res.status(200).json({
        code: "200",
        status: "OK",
        data: revLaporan,
      });
    }
  } catch (error) {
    console.log("Ini error: ", error);
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get Laporan By Id Laporan untuk setiap status
//@route           GET /api/laporan/:id_laporan?status=
//@access          Public
const getLaporanByIdLaporan = async (req, res, next) => {
  try {
    const id_laporan = req.params.id_laporan;
    const status = req.query.status;
    console.log("status: ", status);
    if (status === "dalam antrian" || status === "investigasi") {
      const laporan = await Laporan.findOne({
        where: {
          id_laporan,
        },
        attributes: [
          "id_laporan",
          "id_user",
          "nama_pasien",
          "no_rekam_medis",
          "ruangan",
          "umur",
          "asuransi",
          "jenis_kelamin_pasien",
          "waktu_mendapatkan_pelayanan",
          "waktu_kejadian_insiden",
          "insiden",
          "kronologis_insiden",
          "insiden_terjadi_pada_pasien",
          "dampak_insiden_terhadap_pasien",
          "probabilitas",
          "orang_pertama_melaporkan_insiden",
          // jenis pasien
          "tempat_insiden",
          "departement_penyebab_insiden",
          "tindak_lanjut_setelah_kejadian_dan_hasil",
          "yang_melakukan_tindak_lanjut_setelah_insiden",
          "kejadian_sama_pernah_terjadi_di_unit_lain",
          "status",
          "tanggal_laporan_dikirim",
          "gambar",
        ],
        include: [
          {
            model: User,
            attributes: ["username", "id_user"],
          },
          {
            model: JenisPasien,
            attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
          },
        ],
      });

      const revLaporan = {
        id_laporan: laporan.id_laporan,
        id_user: laporan.id_user,
        nama_pasien: laporan.nama_pasien,
        no_rekam_medis: laporan.no_rekam_medis,
        ruangan: laporan.ruangan,
        umur: laporan.umur,
        asuransi: laporan.asuransi,
        jenis_kelamin_pasien: laporan.jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan: formatTime(laporan.waktu_mendapatkan_pelayanan),
        waktu_kejadian_insiden: formatTime(laporan.waktu_kejadian_insiden),
        insiden: laporan.insiden,
        kronologis_insiden: laporan.kronologis_insiden,
        insiden_terjadi_pada_pasien: laporan.insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien: laporan.dampak_insiden_terhadap_pasien,
        probabilitas: laporan.probabilitas,
        orang_pertama_melaporkan_insiden: laporan.orang_pertama_melaporkan_insiden,
        jenis_pasien: laporan.jenis_pasien.nama_jenis_pasien,
        tempat_insiden: laporan.tempat_insiden,
        departement_penyebab_insiden: laporan.departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil: laporan.tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden: laporan.yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain: laporan.kejadian_sama_pernah_terjadi_di_unit_lain,
        status: laporan.status,
        tanggal_laporan_dikirim: formatTime(laporan.tanggal_laporan_dikirim),
        gambar: laporan.gambar,
        id_kajian_laporan: null,
        jenis_insiden: null,
        grading_risiko_kejadian: null,
        tanggal_laporan_diterima: null,
      };

      res.status(200).json({
        code: "200",
        status: "OK",
        data: revLaporan,
      });
    } else if (status === "laporan selesai" || status === "laporan ditolak") {
      const laporan = await KajianLaporan.findOne({
        where: {
          id_laporan,
        },
        attributes: ["id_kajian_laporan", "jenis_insiden", "grading_risiko_kejadian", "tanggal_laporan_diterima"],
        include: [
          {
            model: Laporan,
            attributes: [
              "id_laporan",
              "id_user",
              "nama_pasien",
              "no_rekam_medis",
              "ruangan",
              "umur",
              "asuransi",
              "jenis_kelamin_pasien",
              "waktu_mendapatkan_pelayanan",
              "waktu_kejadian_insiden",
              "insiden",
              "kronologis_insiden",
              "insiden_terjadi_pada_pasien",
              "dampak_insiden_terhadap_pasien",
              "probabilitas",
              "orang_pertama_melaporkan_insiden",
              // jenis pasien
              "tempat_insiden",
              "departement_penyebab_insiden",
              "tindak_lanjut_setelah_kejadian_dan_hasil",
              "yang_melakukan_tindak_lanjut_setelah_insiden",
              "kejadian_sama_pernah_terjadi_di_unit_lain",
              "status",
              "tanggal_laporan_dikirim",
              "gambar",
            ],
            include: {
              model: JenisPasien,
              attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
            },
          },
        ],
      });

      const revLaporan = {
        id_laporan: laporan.laporan.id_laporan,
        id_user: laporan.laporan.id_user,
        nama_pasien: laporan.laporan.nama_pasien,
        no_rekam_medis: laporan.laporan.no_rekam_medis,
        ruangan: laporan.laporan.ruangan,
        umur: laporan.laporan.umur,
        asuransi: laporan.laporan.asuransi,
        jenis_kelamin_pasien: laporan.laporan.jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan: formatTime(laporan.laporan.waktu_mendapatkan_pelayanan),
        waktu_kejadian_insiden: formatTime(laporan.laporan.waktu_kejadian_insiden),
        insiden: laporan.laporan.insiden,
        kronologis_insiden: laporan.laporan.kronologis_insiden,
        insiden_terjadi_pada_pasien: laporan.laporan.insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien: laporan.laporan.dampak_insiden_terhadap_pasien,
        probabilitas: laporan.laporan.probabilitas,
        orang_pertama_melaporkan_insiden: laporan.laporan.orang_pertama_melaporkan_insiden,
        jenis_pasien: laporan.laporan.jenis_pasien.nama_jenis_pasien,
        tempat_insiden: laporan.laporan.tempat_insiden,
        departement_penyebab_insiden: laporan.laporan.departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil: laporan.laporan.tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden: laporan.laporan.yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain: laporan.laporan.kejadian_sama_pernah_terjadi_di_unit_lain,
        status: laporan.laporan.status,
        tanggal_laporan_dikirim: formatTime(laporan.laporan.tanggal_laporan_dikirim),
        gambar: laporan.laporan.gambar,
        id_kajian_laporan: laporan.id_kajian_laporan,
        jenis_insiden: laporan.jenis_insiden,
        grading_risiko_kejadian: laporan.grading_risiko_kejadian,
        tanggal_laporan_diterima: formatTime(laporan.tanggal_laporan_diterima),
      };

      res.status(200).json({
        code: "200",
        status: "OK",
        data: revLaporan,
      });
    } else {
      res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "There's no parameter 'status'",
      });
    }
  } catch (error) {
    console.log("Ini error: ", error);
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get Laporan User By Id User desc order (Latest)
//@route           GET /api/laporan/user/:id_user
//@access          Public
const getLaporanByUserId = async (req, res, next) => {
  try {
    const id_user = req.params.id_user;
    console.log("ini id user: ", id_user);
    const laporan = await Laporan.findAll({
      attributes: [
        "id_laporan",
        "nama_pasien",
        "no_rekam_medis",
        "ruangan",
        "umur",
        "asuransi",
        "jenis_kelamin_pasien",
        "waktu_mendapatkan_pelayanan",
        "waktu_kejadian_insiden",
        "insiden",
        "kronologis_insiden",
        "insiden_terjadi_pada_pasien",
        "dampak_insiden_terhadap_pasien",
        "probabilitas",
        "orang_pertama_melaporkan_insiden",
        // jenis pasien
        "tempat_insiden",
        "departement_penyebab_insiden",
        "tindak_lanjut_setelah_kejadian_dan_hasil",
        "yang_melakukan_tindak_lanjut_setelah_insiden",
        "kejadian_sama_pernah_terjadi_di_unit_lain",
        "status",
        "tanggal_laporan_dikirim",
        "gambar",
      ],
      where: {
        id_user,
      },
      order: [["tanggal_laporan_dikirim", "DESC"]],
      include: {
        model: JenisPasien,
        attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
      },
    });

    const revLaporan = laporan.map((item) => ({
      id_laporan: item.id_laporan,
      nama_pasien: item.nama_pasien,
      no_rekam_medis: item.no_rekam_medis,
      ruangan: item.ruangan,
      umur: item.umur,
      asuransi: item.asuransi,
      jenis_kelamin_pasien: item.jenis_kelamin_pasien,
      waktu_mendapatkan_pelayanan: formatTime(item.waktu_mendapatkan_pelayanan),
      waktu_kejadian_insiden: formatTime(item.waktu_kejadian_insiden),
      insiden: item.insiden,
      kronologis_insiden: item.kronologis_insiden,
      insiden_terjadi_pada_pasien: item.insiden_terjadi_pada_pasien,
      dampak_insiden_terhadap_pasien: item.dampak_insiden_terhadap_pasien,
      probabilitas: item.probabilitas,
      orang_pertama_melaporkan_insiden: item.orang_pertama_melaporkan_insiden,
      jenis_pasien: item.jenis_pasien.nama_jenis_pasien,
      tempat_insiden: item.tempat_insiden,
      departement_penyebab_insiden: item.departement_penyebab_insiden,
      tindak_lanjut_setelah_kejadian_dan_hasil: item.tindak_lanjut_setelah_kejadian_dan_hasil,
      yang_melakukan_tindak_lanjut_setelah_insiden: item.yang_melakukan_tindak_lanjut_setelah_insiden,
      kejadian_sama_pernah_terjadi_di_unit_lain: item.kejadian_sama_pernah_terjadi_di_unit_lain,
      status: item.status,
      tanggal_laporan_dikirim: formatTime(item.tanggal_laporan_dikirim),
      gambar: item.gambar,
    }));

    res.status(200).json({
      code: "200",
      status: "OK",
      data: revLaporan,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get 3 Laporan User By Id User Latest order
//@route           GET /api/laporan/user/latest/:id_user
//@access          Public
const getLatestThreeLaporanByUserId = async (req, res, next) => {
  try {
    const id_user = req.params.id_user;

    const laporan = await Laporan.findAll({
      attributes: [
        "id_laporan",
        "nama_pasien",
        "no_rekam_medis",
        "ruangan",
        "umur",
        "asuransi",
        "jenis_kelamin_pasien",
        "waktu_mendapatkan_pelayanan",
        "waktu_kejadian_insiden",
        "insiden",
        "kronologis_insiden",
        "insiden_terjadi_pada_pasien",
        "dampak_insiden_terhadap_pasien",
        "probabilitas",
        "orang_pertama_melaporkan_insiden",
        // jenis pasien
        "tempat_insiden",
        "departement_penyebab_insiden",
        "tindak_lanjut_setelah_kejadian_dan_hasil",
        "yang_melakukan_tindak_lanjut_setelah_insiden",
        "kejadian_sama_pernah_terjadi_di_unit_lain",
        "status",
        "tanggal_laporan_dikirim",
        "gambar",
      ],
      where: {
        id_user,
      },
      order: [["tanggal_laporan_dikirim", "DESC"]],
      limit: 3,
      include: {
        model: JenisPasien,
        attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
      },
    });

    const revLaporan = laporan.map((item) => ({
      id_laporan: item.id_laporan,
      nama_pasien: item.nama_pasien,
      no_rekam_medis: item.no_rekam_medis,
      ruangan: item.ruangan,
      umur: item.umur,
      asuransi: item.asuransi,
      jenis_kelamin_pasien: item.jenis_kelamin_pasien,
      waktu_mendapatkan_pelayanan: formatTime(item.waktu_mendapatkan_pelayanan),
      waktu_kejadian_insiden: formatTime(item.waktu_kejadian_insiden),
      insiden: item.insiden,
      kronologis_insiden: item.kronologis_insiden,
      insiden_terjadi_pada_pasien: item.insiden_terjadi_pada_pasien,
      dampak_insiden_terhadap_pasien: item.dampak_insiden_terhadap_pasien,
      probabilitas: item.probabilitas,
      orang_pertama_melaporkan_insiden: item.orang_pertama_melaporkan_insiden,
      jenis_pasien: item.jenis_pasien.nama_jenis_pasien,
      tempat_insiden: item.tempat_insiden,
      departement_penyebab_insiden: item.departement_penyebab_insiden,
      tindak_lanjut_setelah_kejadian_dan_hasil: item.tindak_lanjut_setelah_kejadian_dan_hasil,
      yang_melakukan_tindak_lanjut_setelah_insiden: item.yang_melakukan_tindak_lanjut_setelah_insiden,
      kejadian_sama_pernah_terjadi_di_unit_lain: item.kejadian_sama_pernah_terjadi_di_unit_lain,
      status: item.status,
      tanggal_laporan_dikirim: formatTime(item.tanggal_laporan_dikirim),
      gambar: item.gambar,
    }));

    res.status(200).json({
      code: "200",
      status: "OK",
      data: revLaporan,
    });
  } catch (error) {
    console.log("Ini error: ", error);
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get All Laporan today latest
//@route           GET /api/laporan/current/day
//@access          Public
const getLaporanToday = async (req, res) => {
  console.log("masuk di get laporan today");
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();

  console.log("TODAY START: ", TODAY_START);
  console.log("NOW: ", NOW);
  try {
    const laporan = await Laporan.findAll({
      where: {
        tanggal_laporan_dikirim: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
      order: [["tanggal_laporan_dikirim", "DESC"]],
      include: {
        model: JenisPasien,
        attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
      },
    });

    const revLaporan = laporan.map((item) => ({
      id_laporan: item.id_laporan,
      nama_pasien: item.nama_pasien,
      no_rekam_medis: item.no_rekam_medis,
      ruangan: item.ruangan,
      umur: item.umur,
      asuransi: item.asuransi,
      jenis_kelamin_pasien: item.jenis_kelamin_pasien,
      waktu_mendapatkan_pelayanan: formatTime(item.waktu_mendapatkan_pelayanan),
      waktu_kejadian_insiden: formatTime(item.waktu_kejadian_insiden),
      insiden: item.insiden,
      kronologis_insiden: item.kronologis_insiden,
      insiden_terjadi_pada_pasien: item.insiden_terjadi_pada_pasien,
      dampak_insiden_terhadap_pasien: item.dampak_insiden_terhadap_pasien,
      probabilitas: item.probabilitas,
      orang_pertama_melaporkan_insiden: item.orang_pertama_melaporkan_insiden,
      jenis_pasien: item.jenis_pasien.nama_jenis_pasien,
      tempat_insiden: item.tempat_insiden,
      departement_penyebab_insiden: item.departement_penyebab_insiden,
      tindak_lanjut_setelah_kejadian_dan_hasil: item.tindak_lanjut_setelah_kejadian_dan_hasil,
      yang_melakukan_tindak_lanjut_setelah_insiden: item.yang_melakukan_tindak_lanjut_setelah_insiden,
      kejadian_sama_pernah_terjadi_di_unit_lain: item.kejadian_sama_pernah_terjadi_di_unit_lain,
      status: item.status,
      tanggal_laporan_dikirim: formatTime(item.tanggal_laporan_dikirim),
      gambar: item.gambar,
    }));

    res.status(200).json({
      code: "200",
      status: "OK",
      data: revLaporan,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get All Laporan current month latest
//@route           GET /api/laporan/current/month
//@access          Public
const getLaporanCurrentMonth = async (req, res) => {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    console.log("ini current month: ", currentMonth);
    console.log("ini current year: ", currentYear);

    const laporan = await Laporan.findAll({
      where: {
        [Op.and]: [Sequelize.literal(`MONTH(tanggal_laporan_dikirim) = ${currentMonth}`), Sequelize.literal(`YEAR(tanggal_laporan_dikirim) = ${currentYear}`)],
      },
      order: [["tanggal_laporan_dikirim", "DESC"]],
      include: {
        model: JenisPasien,
        attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
      },
    });

    const revLaporan = laporan.map((item) => ({
      id_laporan: item.id_laporan,
      nama_pasien: item.nama_pasien,
      no_rekam_medis: item.no_rekam_medis,
      ruangan: item.ruangan,
      umur: item.umur,
      asuransi: item.asuransi,
      jenis_kelamin_pasien: item.jenis_kelamin_pasien,
      waktu_mendapatkan_pelayanan: formatTime(item.waktu_mendapatkan_pelayanan),
      waktu_kejadian_insiden: formatTime(item.waktu_kejadian_insiden),
      insiden: item.insiden,
      kronologis_insiden: item.kronologis_insiden,
      insiden_terjadi_pada_pasien: item.insiden_terjadi_pada_pasien,
      dampak_insiden_terhadap_pasien: item.dampak_insiden_terhadap_pasien,
      probabilitas: item.probabilitas,
      orang_pertama_melaporkan_insiden: item.orang_pertama_melaporkan_insiden,
      jenis_pasien: item.jenis_pasien.nama_jenis_pasien,
      tempat_insiden: item.tempat_insiden,
      departement_penyebab_insiden: item.departement_penyebab_insiden,
      tindak_lanjut_setelah_kejadian_dan_hasil: item.tindak_lanjut_setelah_kejadian_dan_hasil,
      yang_melakukan_tindak_lanjut_setelah_insiden: item.yang_melakukan_tindak_lanjut_setelah_insiden,
      kejadian_sama_pernah_terjadi_di_unit_lain: item.kejadian_sama_pernah_terjadi_di_unit_lain,
      status: item.status,
      tanggal_laporan_dikirim: formatTime(item.tanggal_laporan_dikirim),
      gambar: item.gambar,
    }));

    res.status(200).json({
      code: "200",
      status: "OK",
      data: revLaporan,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get jumlah laporan
//@route           GET /api/laporan/amount
//@access          Public
const getLaporanAmount = async (req, res) => {
  try {
    const amountLaporanDalamAntrian = await Laporan.count({
      where: {
        status: "dalam antrian",
      },
    });

    const amountLaporanInvestigasi = await Laporan.count({
      where: {
        status: "investigasi",
      },
    });

    const amountLaporanSelesai = await Laporan.count({
      where: {
        status: "laporan selesai",
      },
    });

    const amountLaporanDitolak = await Laporan.count({
      where: {
        status: "laporan ditolak",
      },
    });

    const amountAllLaporan = amountLaporanDalamAntrian + amountLaporanInvestigasi + amountLaporanSelesai + amountLaporanDitolak;

    console.log("jumlah laporan dalam antrian: ", amountLaporanDalamAntrian);
    console.log("jumlah laporan investigasi: ", amountLaporanInvestigasi);
    console.log("jumlah laporan laporan selesai: ", amountLaporanSelesai);
    console.log("jumlah laporan laporan ditolak: ", amountLaporanDitolak);
    console.log("jumlah laporan semua: ", amountAllLaporan);

    res.status(200).json({
      code: "200",
      status: "OK",
      data: {
        jumlah_laporan_dalam_antrian: amountLaporanDalamAntrian,
        jumlah_laporan_investigasi: amountLaporanInvestigasi,
        jumlah_laporan_selesai: amountLaporanSelesai,
        jumlah_laporan_ditolak: amountLaporanDitolak,
        jumlah_keseluruhan: amountAllLaporan,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Post laporan By User
//@route           POST /api/laporan/user/:id_user
//@access          Public
const postLaporanByUser = async (req, res) => {
  // const kriteriaWord = ["sakit", "kebakaran", "kecelakaan"];
  // let tingkat_prioritas;
  console.log("yuhu");

  const user = await User.findOne({
    where: {
      id_user: req.params.id_user,
    },
  });

  if (!user)
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "user id not found",
    });

  let url_gambar = null;

  if (req.file) {
    // return res.status(400).json({
    //   code: "400",
    //   status: "BAD_REQUEST",
    //   errors: "No File Uploaded",
    // });

    const fileName = req.file.originalname;
    const fileSize = req.file.size;
    const ext = path.extname(req.file.originalname);

    // const nama_file_gambar = fileName;

    url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpeg", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/images", req.file.filename));
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "Invalid Images. Image should be .png .jpg .jpeg",
      });
    }

    if (fileSize > 2097152) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/images", req.file.filename));
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "Image must less than 2MB",
      });
    }

    const target = path.join(__dirname, "..", "..", "public/images", fileName);
    fs.renameSync(req.file.path, target);
  }

  const id_user = req.params.id_user;
  const {
    nama_pasien,
    no_rekam_medis,
    ruangan,
    umur,
    asuransi,
    jenis_kelamin_pasien,
    waktu_mendapatkan_pelayanan,
    waktu_kejadian_insiden,
    insiden,
    kronologis_insiden,
    insiden_terjadi_pada_pasien,
    dampak_insiden_terhadap_pasien,
    probabilitas,
    orang_pertama_melaporkan_insiden,
    id_jenis_pasien,
    tempat_insiden,
    departement_penyebab_insiden,
    tindak_lanjut_setelah_kejadian_dan_hasil,
    yang_melakukan_tindak_lanjut_setelah_insiden,
    kejadian_sama_pernah_terjadi_di_unit_lain,
  } = req.body;

  const status = "dalam antrian";

  if (
    (id_user,
    nama_pasien,
    no_rekam_medis,
    ruangan,
    umur,
    asuransi,
    jenis_kelamin_pasien,
    waktu_mendapatkan_pelayanan,
    waktu_kejadian_insiden,
    insiden,
    kronologis_insiden,
    insiden_terjadi_pada_pasien,
    dampak_insiden_terhadap_pasien,
    probabilitas,
    orang_pertama_melaporkan_insiden,
    id_jenis_pasien,
    tempat_insiden,
    departement_penyebab_insiden,
    tindak_lanjut_setelah_kejadian_dan_hasil,
    yang_melakukan_tindak_lanjut_setelah_insiden,
    kejadian_sama_pernah_terjadi_di_unit_lain,
    status)
  ) {
    // untuk ambil waktu sekarang
    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const witaTime = date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Makassar",
      ...options,
    });

    const dateMoUbah = witaTime;
    const tanggal = dateMoUbah.split(", ")[0].split("/");
    const waktu = dateMoUbah.split(", ")[1];

    const tahun = tanggal[2];
    const bulan = tanggal[0];
    const day = tanggal[1];
    const tanggal_laporan_dikirim = `${tahun}-${bulan}-${day}:${waktu}`;

    console.log("ini waktu indonesia tengah: ", tanggal_laporan_dikirim);

    try {
      const laporan = await Laporan.create({
        id_user,
        nama_pasien,
        no_rekam_medis,
        ruangan,
        umur,
        asuransi,
        jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan,
        waktu_kejadian_insiden,
        insiden,
        kronologis_insiden,
        insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien,
        probabilitas,
        orang_pertama_melaporkan_insiden,
        id_jenis_pasien,
        tempat_insiden,
        departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain,
        status,
        tanggal_laporan_dikirim,
        gambar: url_gambar,
      });

      res.status(201).json({
        code: "201",
        status: "CREATED",
        data: laporan,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "All Fields Are Required",
    });
  }
};

//@description     Post laporan By Anonim
//@route           POST /api/laporan
//@access          Public
const postLaporanByAnonim = async (req, res) => {
  let url_gambar = null;

  if (req.file) {
    const fileName = req.file.originalname;
    const fileSize = req.file.size;
    const ext = path.extname(req.file.originalname);

    // const nama_file_gambar = fileName;

    url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpeg", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/images", req.file.filename));
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "Invalid Images. Image should be .png .jpg .jpeg",
      });
    }

    if (fileSize > 2097152) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/images", req.file.filename));
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "Image must less than 2MB",
      });
    }

    const target = path.join(__dirname, "..", "..", "public/images", fileName);
    fs.renameSync(req.file.path, target);
  }

  // const id_user = req.params.id_user;
  const {
    nama_pasien,
    no_rekam_medis,
    ruangan,
    umur,
    asuransi,
    jenis_kelamin_pasien,
    waktu_mendapatkan_pelayanan,
    waktu_kejadian_insiden,
    insiden,
    kronologis_insiden,
    insiden_terjadi_pada_pasien,
    dampak_insiden_terhadap_pasien,
    probabilitas,
    orang_pertama_melaporkan_insiden,
    id_jenis_pasien,
    tempat_insiden,
    departement_penyebab_insiden,
    tindak_lanjut_setelah_kejadian_dan_hasil,
    yang_melakukan_tindak_lanjut_setelah_insiden,
    kejadian_sama_pernah_terjadi_di_unit_lain,
  } = req.body;

  const status = "dalam antrian";

  if (
    (nama_pasien,
    no_rekam_medis,
    ruangan,
    umur,
    asuransi,
    jenis_kelamin_pasien,
    waktu_mendapatkan_pelayanan,
    waktu_kejadian_insiden,
    insiden,
    kronologis_insiden,
    insiden_terjadi_pada_pasien,
    dampak_insiden_terhadap_pasien,
    probabilitas,
    orang_pertama_melaporkan_insiden,
    id_jenis_pasien,
    tempat_insiden,
    departement_penyebab_insiden,
    tindak_lanjut_setelah_kejadian_dan_hasil,
    yang_melakukan_tindak_lanjut_setelah_insiden,
    kejadian_sama_pernah_terjadi_di_unit_lain,
    status)
  ) {
    // untuk ambil waktu sekarang
    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const witaTime = date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Makassar",
      ...options,
    });

    const dateMoUbah = witaTime;
    const tanggal = dateMoUbah.split(", ")[0].split("/");
    const waktu = dateMoUbah.split(", ")[1];

    const tahun = tanggal[2];
    const bulan = tanggal[0];
    const day = tanggal[1];
    const tanggal_laporan_dikirim = `${tahun}-${bulan}-${day}:${waktu}`;

    console.log("ini waktu indonesia tengah: ", tanggal_laporan_dikirim);

    try {
      const laporan = await Laporan.create({
        nama_pasien,
        no_rekam_medis,
        ruangan,
        umur,
        asuransi,
        jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan,
        waktu_kejadian_insiden,
        insiden,
        kronologis_insiden,
        insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien,
        probabilitas,
        orang_pertama_melaporkan_insiden,
        id_jenis_pasien,
        tempat_insiden,
        departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain,
        status,
        tanggal_laporan_dikirim,
        gambar: url_gambar,
      });

      res.status(201).json({
        code: "201",
        status: "CREATED",
        data: laporan,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "All Fields Are Required",
    });
  }
};

//@description     Update status laporan 'investigasi'
//@route           PATCH /api/laporan/status_laporan/investigasi/:id_laporan
//@access          Public
const updateStatusLaporanInvestigasi = async (req, res) => {
  const id_laporan = req.params.id_laporan;
  const id_user = req.id_user;

  console.log("ini id_user: ", id_user);

  try {
    const laporan = await Laporan.update(
      {
        status: "investigasi",
      },
      {
        where: {
          id_laporan,
        },
      }
    );

    await KajianLaporan.create({
      id_laporan,
      id_user,
    });

    await res.status(200).json({
      code: "200",
      status: "OK",
      success: laporan ? true : false,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Update status laporan 'laporan selesai'
//@route           PATCH /api/laporan/status_laporan/selesai/:id_laporan
//@access          Public
const updateStatusLaporanSelesai = async (req, res) => {
  const id_laporan = req.params.id_laporan;
  const { jenis_insiden, grading_risiko_kejadian } = req.body;

  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const witaTime = date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Makassar",
    ...options,
  });

  const dateMoUbah = witaTime;
  const tanggal = dateMoUbah.split(", ")[0].split("/");
  const waktu = dateMoUbah.split(", ")[1];

  const tahun = tanggal[2];
  const bulan = tanggal[0];
  const day = tanggal[1];
  const tanggal_laporan_diterima = `${tahun}-${bulan}-${day}:${waktu}`;

  if (jenis_insiden && grading_risiko_kejadian) {
    try {
      await KajianLaporan.update(
        {
          jenis_insiden,
          grading_risiko_kejadian,
          tanggal_laporan_diterima,
        },
        {
          where: {
            id_laporan,
          },
        }
      );

      const laporan = await Laporan.update(
        {
          status: "laporan selesai",
        },
        {
          where: {
            id_laporan,
          },
        }
      );

      res.status(200).json({
        code: "200",
        status: "OK",
        success: laporan ? true : false,
      });
    } catch (error) {
      res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "jenis_insiden and grading_risiko_kejadian are required",
    });
  }
};

//@description     Update status laporan 'tolak'
//@route           PATCH /api/laporan/status_laporan/tolak/:id_laporan
//@access          Public
const updateStatusLaporanTolak = async (req, res) => {
  const id_laporan = req.params.id_laporan;
  const { jenis_insiden, grading_risiko_kejadian } = req.body;

  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const witaTime = date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Makassar",
    ...options,
  });

  const dateMoUbah = witaTime;
  const tanggal = dateMoUbah.split(", ")[0].split("/");
  const waktu = dateMoUbah.split(", ")[1];

  const tahun = tanggal[2];
  const bulan = tanggal[0];
  const day = tanggal[1];
  const tanggal_laporan_diterima = `${tahun}-${bulan}-${day}:${waktu}`;

  if (jenis_insiden && grading_risiko_kejadian) {
    try {
      await KajianLaporan.update(
        {
          jenis_insiden,
          grading_risiko_kejadian,
          tanggal_laporan_diterima,
        },
        {
          where: {
            id_laporan,
          },
        }
      );

      const laporan = await Laporan.update(
        {
          status: "laporan ditolak",
        },
        {
          where: {
            id_laporan,
          },
        }
      );

      res.status(200).json({
        code: "200",
        status: "OK",
        success: laporan ? true : false,
      });
    } catch (error) {
      res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "jenis_insiden and grading_risiko_kejadian are required",
    });
  }
};

module.exports = {
  getAllLaporan,
  getLaporanByIdLaporan,
  getLaporanByUserId,
  getLatestThreeLaporanByUserId,
  getLaporanToday,
  getLaporanCurrentMonth,
  getLaporanAmount,

  postLaporanByUser,
  postLaporanByAnonim,

  updateStatusLaporanInvestigasi,
  updateStatusLaporanSelesai,
  updateStatusLaporanTolak,
};
