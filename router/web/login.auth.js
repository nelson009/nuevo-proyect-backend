const express = require('express');
const path = require('path');
const auth = require('../../middleware/auth');
const apiRoutes = require('./auth.router')
const router = express.Router();

router.use('/', apiRoutes);

// se obtiene el perfil renderizado del usuario o el formulario de registro
router.get('/', (req, res) => {
  const user = req.user;
  if (user) {

    return res.redirect('/profile');
  }
  else {

    return res.sendFile(path.resolve(__dirname, '../../public/registro.html'));
  }
});

// se obtiene el cierre de la secion del usuario y se renderiza una vista con el nombre
router.get('/logout', auth, (req, res, next) => {
  const { firstName } = req.user;
  req.logOut();

  return res.render('logout', { firstName });
});

// se obtiene el formulario de login si el usuario no esta autenticado. Si lo esta se redirige a su perfil
router.get('/login', (req, res) => {

  if (!req.isAuthenticated()) {

    return res.sendFile(path.resolve(__dirname, '../../public/login.html'));
  };

  return res.redirect('/profile');

});

// se obtiene una vista de error, al registrarse
router.get('/fail-register', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../public/error_register.html'));
});

// se obtiene un vista de error al logearse
router.get('/fail-login', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../public/error_login.html'));
});

module.exports = router;