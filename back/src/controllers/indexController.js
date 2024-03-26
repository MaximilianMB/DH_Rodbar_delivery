const path = require('path');
const fs = require("fs");
const db = require("../database/models");
const sequelize = db.Sequelize;

module.exports = {
    home: (req, res)=>{
        res.render(path.join(__dirname, "../view/web/index.ejs"), {req : req})
    },
    search: (req,res)=>{
        db.Product.findAll({
            where:{
                nombre:{[sequelize.Op.like] : `%${req.query.search}%`}
            }
        })
        .then((productos) => {
            res.render(path.join(__dirname, "../view/products/buscarProducto.ejs"), {productos, req:req})
        })
    }
}