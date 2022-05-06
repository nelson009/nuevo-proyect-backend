const express = require('express');
const profileController = require('../../controllers/profile.controllers');
const router = express.Router()

router.get('/', profileController);

module.exports = router;