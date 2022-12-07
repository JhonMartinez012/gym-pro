const { Sequelize } = require("sequelize");


const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const connection = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});

const dbConnection = async () => {
  try {
    await connection.authenticate();

    console.log("Database online");
  } catch (error) {
    throw new Error("Error al conectar ", error);
  }
};

module.exports = {
  dbConnection,
  connection,
};