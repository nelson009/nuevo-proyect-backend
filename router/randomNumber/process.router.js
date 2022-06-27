const express = require('express');
const numerosAleatoriosFork = require('../../controllers/process.controllers')
const router = express.Router();

// se calcula cantidad especifica de numeros randoms 
router.get('/randoms', numerosAleatoriosFork);

module.exports = router;