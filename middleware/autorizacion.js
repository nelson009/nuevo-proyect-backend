const OnlyAdminsPrivilege = (req, res, next)=> {
    if (req.header('esAdmin') == 'true'|| req.query.admin ==="true") {
        next();
    } else {
        res.status(403).json({ 'error': -1, 'descripcion': `No tiene acceso a ${req.originalUrl}` })
    }
}

module.exports = OnlyAdminsPrivilege;