const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  tokenSecret: process.env.TOKEN_SECRET,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHostname: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
};
