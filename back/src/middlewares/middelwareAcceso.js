const path = require('path');

const middlewareAcceso = (req, res, next) =>{
    if (req.session.usuario && req.session.usuario.rolId  == 1) {
            next();
    }else{
        res.render(path.join(__dirname, "../view/admin/accesoDenegado.ejs"), {req : req})
    }
};

module.exports = middlewareAcceso;