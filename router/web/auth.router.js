const express = require('express');
const multer = require('multer');
const { register, login } = require('../../controllers/auth.controllers');
const passport = require('../../middleware/passport');

const router = express.Router();

const storage =  multer.diskStorage({
    destination: (req, file, cd) => {cd(null, 'public/uploads')},
    filename: (req, file, cd) => {
        const extension = file.mimetype.split('/')[1];
        cd(null, `${file.fieldname}-${Date.now()}.${extension}`)}
})
const upload = multer({ storage });

// se sube imagen del usario al servidor y se autentica el usuario que se registro 
router.post('/register',upload.single('archivo'),passport.authenticate('signup', { failureRedirect: '/fail-register' }), register);

// se autentica el login del usuario
router.post('/login',passport.authenticate('signin', { failureRedirect: '/fail-login' }), login);

module.exports = router;