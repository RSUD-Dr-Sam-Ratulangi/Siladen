const { DataTypes } = require("sequelize");
const db = require("../../database");
const Laporan = require("../Laporan/model");

const JenisPasien = db.define(
  "jenis_pasien",
  {
    id_jenis_pasien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_jenis_pasien: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = JenisPasien;
