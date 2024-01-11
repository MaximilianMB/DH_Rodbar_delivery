const express = require ('express');
const productController = require ('../controllers/productsController');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, "../../public/img/imgProducts"))
    },
    filename: (req, file, cb)=>{
        const newFileName = "product-" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });

router.get("/detallProduc", productController.detalleProducto);
router.get('/carrito', productController.carrito);
router.post("/carrito/:id", productController.comprar);
router.get("/carritoVacio", productController.vacio);
router.get("/admProductos", productController.administrar);
router.get("/newProduct", productController.nuevo);
router.post("/newProduct", upload.single("imagen"), productController.nuevoProducto);
router.get("/detail/:id",upload.single("imagen"),productController.show);
router.get("/editar/:id", productController.editar);
router.put("/editar/:id", upload.single("imagen"), productController.update);
router.get("/delete/:id", productController.borrar);
router.get("/listaProductos", productController.listado);



module.exports = router;