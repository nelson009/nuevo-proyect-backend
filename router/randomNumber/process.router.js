const express = require('express');
const numerosAleatoriosFork = require('../../controllers/process.controllers')
const router = express.Router();

router.get('/randoms', numerosAleatoriosFork);

module.exports = router;