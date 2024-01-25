const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const {
  dbName,
  dbUsername,
  dbPassword,
  dbHostname,
  port,
} = require("../config/index.js");

const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHostname,
  password: dbPassword,
  port,
  dialect: "mysql",
  // timezone: "Asia/Makassar",
  timezone: "+08:00",
});

const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: db.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: db }),
  logger: console,
});

db.authenticate()
  .then(async () => {
    await umzug.up();
    console.log("Koneksi berhasil");
    // db.sync({ force: true })
    //   .then(() => {
    //     console.log("All models were synchronized successfuly");
    //   })
    //   .catch((error) => console.log("error saat sinkronisasi: ", error));
  })
  .catch((error) => console.log("Unable to connect to the database : ", error));

module.exports = db;
