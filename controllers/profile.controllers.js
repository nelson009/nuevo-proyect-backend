const perfilUser = require('../services/perfil/perfil.service');

// renderiza una vista con informacion del usuario 
const profileController = async (req, res) => {
    const {firstName, email, foto, telefono, edad, direccion} = req.user;
    const avatar = `/uploads/${foto}`;
    await perfilUser(req)

    res.render("home", { firstName,  email, avatar, telefono, edad, direccion });
};

module.exports = profileController;