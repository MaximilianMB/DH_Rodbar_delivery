const path = require("path");

const middlewareAcceso = (req, res, next) =>{
    if(req.body.role != 1){
        res.send("../../public/img")
    }else{
        next()
    }
};

module.exports = middlewareAcceso;