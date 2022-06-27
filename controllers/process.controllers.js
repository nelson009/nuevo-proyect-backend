const calculoRandom = require("../services/randomNumber/randomNumber.service");

// obtiene calculos de  numeros randoms por cantidad establecida o por defecto
const randomsNumberController = (req, res) => {
  const cantidad = req.query.cant || 100000000;

  res.status(200).json(calculoRandom(cantidad));
};

module.exports = randomsNumberController;

