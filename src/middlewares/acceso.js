const path = require("path");

const middlewareAcceso = (req, res, next) =>{
    if(req.session.usuario.rol != 1){
        res.render("../view/admin/accesoDenegado.ejs");
    }else{
        next()
    }
};

module.exports = middlewareAcceso;