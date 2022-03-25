require("dotenv").config();

// const yargs = require("yargs")(process.argv.splice(2));
const admin = require("firebase-admin");
const serviceAccount = require("../DB/coder.json");

const { DATASOURCE, SESSION_SECRET } = process.env;

module.exports = {
  mongodb: {
    uri: `mongodb+srv://nelson:${process.env.DB_PASSWORD}@cluster0.2vdgf.mongodb.net/ecommerce2?retryWrites=true&w=majority`,
  },
  FirebaseCredencial: {
    credential: admin.credential.cert(serviceAccount),
  },
  sqlite3Mensajes: {
    client: "sqlite3",
    connection: {
      filename: "./DB/ecommerce.sqlite",
    },
    useNullAsDefault: true,
  },
  DATASOURCE,
  SESSION_SECRET,
  // args: yargs.default({ port: 8080, server: "FORK" }).alias({ s: "server" })
  //   .argv,
};
