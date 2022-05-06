// const { fork } = require("child_process");
// const path = require("path");
const calculoRandom = require("../services/randomNumber/randomNumber.service");

const randomsNumberController = (req, res) => {
  const cantidad = req.query.cant || 100000000;
  // const processFork = fork(path.resolve(__dirname, "./processFork.js"));

  // processFork.send(cantidad);
  // processFork.on("message", (data) => {
  //   console.log("PUERTO", process.argv[2]);
  //   res.status(200).json(data);
  // });

  res.status(200).json(calculoRandom(cantidad));
};

module.exports = randomsNumberController;

