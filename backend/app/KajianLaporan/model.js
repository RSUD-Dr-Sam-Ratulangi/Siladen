const { DataTypes } = require("sequelize");
const db = require("../../database");
const Laporan = require("../Laporan/model");
const User = require("../User/model");

const KajianLaporan = db.define(
  "kajian_laporan",
  {
    id_kajian_laporan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_laporan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    jenis_insiden: {
      type: DataTypes.ENUM(
        "Kejadian Nyaris Cedera / KNC (Near miss)",
        "Kejadian Tidak diharapkan / KTD (Adverse Event)",
        "Kejadian Sentinel (Sentinel Event)",
        "Kejadian Tidak Cedera / KTC",
        "Kondisi Potensi cedera serius (significant) (KPC)"
      ),
      allowNull: true,
    },
    grading_risiko_kejadian: {
      type: DataTypes.ENUM("biru", "hijau", "kuning", "merah"),
      allowNull: true,
      validate: {
        isIn: [["biru", "hijau", "kuning", "merah"]],
      },
    },
    tanggal_laporan_diterima: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(KajianLaporan, {
  foreignKey: "id_user",
});
KajianLaporan.belongsTo(User, {
  foreignKey: "id_user",
});

Laporan.hasOne(KajianLaporan, {
  foreignKey: "id_laporan",
});
KajianLaporan.belongsTo(Laporan, {
  foreignKey: "id_laporan",
});

module.exports = KajianLaporan;
