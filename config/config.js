require("dotenv").config();
// const yargs = require("yargs")(process.argv.splice(2));
const admin = require("firebase-admin");
const serviceAccount = require("../DB/coder.json");

const { DATASOURCE, SESSION_SECRET, CORREO_GMAIL, GMAIL_PASSORD, ACCOUNT_SID, AUTH_TOKEN, NUMBER_ADMIN, MODE_CLUSTER, PHONE_TWILIO } = process.env;

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
  GMAIL_PASSORD,
  configTransport:{
    service: 'gmail',
    port: 587,
    auth: {
        user: CORREO_GMAIL,
        pass: GMAIL_PASSORD,
    },
    tls: { rejectUnauthorized: false }
  },
  CORREO_GMAIL,
  ACCOUNT_SID,
  AUTH_TOKEN,
  NUMBER_ADMIN,
  MODE_CLUSTER,
  PHONE_TWILIO ,
  // args: yargs.default({ port: 8080, server: "FORK" }).alias({ s: "server" })
  //   .argv,
};
