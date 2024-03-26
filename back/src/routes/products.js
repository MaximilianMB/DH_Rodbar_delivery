const express = require ('express');
const productController = require ('../controllers/productsController');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body, check } = require("express-validator");
const middlewareAcceso = require("../middlewares/middelwareAcceso")

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

const validationProduct = [
    check("nombre")
    .isLength({min: 5})
    .withMessage("El nombre debe contener al menos 5 caracteres"),
    check("ingredientes")
    .isLength({min: 20})
    .withMessage("Ingredientes debe contener al menos 20 caracteres"),
    body('imagen').custom(function (value, { req }) {
        let ext
        if (req.file != undefined) {
            return true
        } else {
            ext = "" + path.extname(req.files.filename).toLowerCase();
        }
        if (
            ext == ".jpg" ||
            ext == ".jpeg" ||
            ext == ".png" ||
            ext == ".gif") {
            return true;
        }
        return false;
    }),
    check("categoriaId")
    .isLength({min: 5})
    .withMessage("Categoria debe contener al menos 5 caracteres"),
    check("precio")
    .isNumeric()
    .withMessage("Precio debe ser un valor numerico")
]

router.get("/detail/:id", upload.single("imagen"), productController.detalleProducto);
router.get('/carrito', productController.carrito);
router.post("/carrito/:id", productController.comprar);
router.get("/carritoVacio", productController.vacio);
router.get("/admProductos", middlewareAcceso, productController.administrar);
router.get("/newProduct", productController.nuevo);
router.post("/newProduct", upload.single("imagen"),validationProduct, productController.nuevoProducto);
router.get("/editar/:id", productController.editar);
router.put("/editar/:id", upload.single("imagen"),validationProduct, productController.update);
router.get("/delete/:id", productController.borrar);
router.get("/listaProductos", productController.listado);



module.exports = router;