const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.addColumn("user", "device_token", {
    type: Sequelize.TEXT,
    allowNull: true,
  });
}

module.exports = { up };
