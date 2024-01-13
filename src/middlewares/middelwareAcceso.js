const path = require('path');

const middlewareAcceso = (req, res, next) =>{
    console.log(req.session.usuario);
    if (req.session.usuario && req.session.usuario.rol == 1) {
            next();
    }else{
        res.render(path.join(__dirname, "../view/admin/accesoDenegado.ejs"), {req : req})
    }
};

module.exports = middlewareAcceso;