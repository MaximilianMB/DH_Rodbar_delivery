const path = require('path');
const fs = require("fs");
const db = require("../database/models");
const sequelize = db.Sequelize;


const productsController = {
    detalleProducto:  (req, res) => {
        db.Product.findByPk(req.params.id,
            {
                include: ["category", "users"]
            })
            .then(producto => {
                res.render(path.join(__dirname, "../view/products/detallProduc.ejs"),{producto, req:req})
            })
            .catch(error =>
                res.send(error))
    },
    carrito:(req, res)=>{
        db.Product.findAll()
        .then(()=>{
            res.render(path.join(__dirname, "../view/products/carrito.ejs"),{req:req})
        })
    },
    nuevo: (req, res)=>{
        db.Product.findAll()
        .then(()=>{
            res.render(path.join(__dirname, "../view/products/newProduct.ejs"),{req:req})
        })
    },
    nuevoProducto: (req, res)=>{
        db.Product.create({
            nombre: req.body.nombre,
            ingredientes: req.body.ingredientes,
            categoriaId: req.body.categoriaId,
            precio: req.body.precio,
            imagen: req.file.filename
        })
            .then(() => {
                res.redirect("/listaProductos")
            })
            .catch(error =>{
                res.send(error)
            })
    },
    administrar: (req,res)=>{
        db.Product.findAll({
            include: ["category", "users"]
        })
            .then(productos =>
                res.render(path.join(__dirname, "../view/admin/admProductos.ejs"), {productos, req:req}));
    },
    editar: (req, res)=>{
        db.Product.findByPk(req.params.id)
        .then(miProducto => {
            res.render(path.join(__dirname, "../view/products/editarProducto.ejs"), {miProducto, req:req})
        })
    },
    update: (req,res)=>{
        db.Product.update({
            nombre: req.body.nombre,
            ingredientes: req.body.ingredientes,
            categoriaId: req.body.categoriaId,
            precio: req.body.precio,
            imagen: req.file
        },
        {
            where:{
                id: req.params.id
            }
        })
        .then(() =>{
            res.redirect("/listaProductos")
        })
        .catch(error => res.send(error))
    },
    borrar: (req,res)=>{
        db.Product.destroy({
            where: {
                id: req.params.id
            },
            include: ["category", "users"]
        })
        .then(()=>{
            res.redirect("/listaProductos")
        })
    },
    listado: (req,res)=>{
        db.Product.findAll({
            include: ["category", "users"]
        })
        .then(productos => {
                res.render(path.join(__dirname,"../view/products/listaProductos.ejs"), {productos,req:req})
            })
    },
    comprar: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json")));
        let id = req.params.id;
        let miProducto;
        productos.forEach(producto => {
            if(producto.id == id){
                miProducto = {
                    nombre: producto.nombre,
                    imagen: producto.imagen,
                    precio: producto.precio,
                    cantidad: req.body.cantidad
                }
            }
        });
        res.render(path.join(__dirname, "../view/products/carrito.ejs"), {miProducto, req:req})
    },
    vacio: (req,res)=>{
        res.render(path.join(__dirname, "../view/products/carritoVacio.ejs"), {req:req})
    }
}

module.exports = productsController;
