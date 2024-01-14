const path = require('path');
const fs = require("fs")
const productsController = {
    detalleProducto:  (req, res) => {
        res.render(path.join(__dirname, "../view/products/detallProduc.ejs"),{req:req});
    },
    carrito:(req, res)=>{
        res.render(path.join(__dirname, "../view/products/carrito.ejs"),{req:req})
    },
    nuevo: (req, res)=>{
        res.render(path.join(__dirname, "../view/products/newProduct.ejs"),{req:req})
    },
    nuevoProducto: (req, res)=>{
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json")));
        let ultimoProducto = productos.pop();
        productos.push(ultimoProducto)
        nuevoProducto = {
            nombre : req.body.nombre,
            ingredientes : req.body.ingredientes,
            categoria : req.body.categoria,
            precio : req.body.precio,
            imagen: req.file.filename,
            id : ultimoProducto.id + 1,
        }
        productos.push(nuevoProducto);
        
        let nuevosProductos = JSON.stringify(productos, null, 2);
        fs.writeFileSync(path.join(__dirname, "../data/products.json"), nuevosProductos);
        res.redirect("/listaProductos")
    },
    administrar: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json")));
        res.render(path.join(__dirname, "../view/admin/admProductos.ejs"), {productos, req:req})
    },
    show: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json")));
        let id = req.params.id;
        let miProducto;
        productos.forEach(producto => {
            if(producto.id == id){
                miProducto = producto
            }
        });
        res.render(path.join(__dirname, "../view/products/detallProduc.ejs"), {miProducto, req:req})
    },
    editar: (req, res)=>{
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json")));
        let id = req.params.id;
        let miProducto;
        productos.forEach(producto => {
            if(producto.id == id){
                miProducto = producto
            }
        });
        res.render(path.join(__dirname, "../view/products/editarProducto.ejs"), {miProducto, req:req})
    },
    update: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json")));
        let id = req.params.id;
        req.body.id = id;
        let productoActualizado = productos.map(producto =>{
            if(producto.id == id){
                req.body.imagen = req.file ? req.file.filename : producto.imagen;
                return producto = req.body
            }
            return producto
        })
        console.log(productoActualizado);
        let productoYaActualizado = JSON.stringify(productoActualizado, null, 2)
        fs.writeFileSync(path.join(__dirname, "../data/products.json"),productoYaActualizado);
        res.redirect("/listaProductos")
    },
    borrar: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json")));
        let id = req.params.id;
        let productosFinales = productos.filter(producto => {
            return producto.id != id;
        })
            let productosGuardarFinales = JSON.stringify(productosFinales, null, 2)
        fs.writeFileSync(path.join(__dirname, "../data/products.json"),productosGuardarFinales);
        res.redirect("/listaProductos")
    },
    listado: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json")));
        res.render(path.join(__dirname, "../view/products/listaProductos.ejs"), {productos,req:req})    
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
