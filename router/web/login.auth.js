const express = require('express');
const path = require('path');
const auth = require('../../middleware/auth');
const apiRoutes = require('./auth.router')
// const infoControllers = require('../../controllers/info.controllers')
const { carrito } = require('../../models/index');
const router = express.Router();

router.use('/', apiRoutes);

router.get('/', (req, res) => {
  const user = req.user;
  if (user) {

    return res.redirect('/profile');
  }
  else {

    return res.sendFile(path.resolve(__dirname, '../../public/registro.html'));
  }
});

router.get('/profile', auth, async (req, res) => {
  const {firstName, email, foto, telefono, edad, direccion} = req.user;
  const avatar = `/uploads/${foto}`;

  if (req.user) {
    await carrito.createCarrito(req);

  }

  res.render("home", { firstName,  email, avatar, telefono, edad, direccion });
});

router.get('/logout', auth, (req, res, next) => {
  const { firstName } = req.user;
  req.logOut();

  return res.render('logout', { firstName });
});

router.get('/login', (req, res) => {

  if (!req.isAuthenticated()) {

    return res.sendFile(path.resolve(__dirname, '../../public/login.html'));
  };

  return res.redirect('/profile');

});

router.get('/fail-register', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../public/error_register.html'));
});

router.get('/fail-login', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../public/error_login.html'));
});

// router.get('info',infoControllers);

module.exports = router;