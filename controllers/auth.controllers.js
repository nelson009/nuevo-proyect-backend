
// ambos redireccionan al perfil del usuario
const register = async(req, res, next) => res.redirect('/profile');

const login = async(req, res, next) => res.redirect('/profile');

module.exports = { login , register }