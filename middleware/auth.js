const auth = async (req, res, next) => {
    //quiero saber si el usuario esta correctamente auntenticado
    if (req.isAuthenticated()) {
      next();
    }
    else {
      res.redirect('/');
    }
  };
  
  module.exports = auth;