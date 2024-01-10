const express = require('express');
const usersController = require("../controllers/usersController")
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body, check } = require("express-validator");
const bcrypt = require("bcryptjs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/imgUsers"))
    },
    filename: (req, file, cb) => {
        const newFileName = "usuario-" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });
const validacionRegistro = [
    check("nombre")
        .isLength({ min: 4 })
        .withMessage("El campo nombre debe tener al menos 4 caracteres"),

    check("usuario")
        .isAlphanumeric().withMessage("El campo usuario debe ser alfanumerico")
        .isLength({ min: 8 }).withMessage("El campo usuario debe tener al menos 8 caracteres"),

    check("email")
        .isEmail().withMessage("El campo debe ser un email válido"),

        check("password")
        .isLength({ min : 6})
        .withMessage("El campo contraseña debe tener al menos 8 caracteres"),

    body("repetir-password").custom((value, { req }) => {
        if (req.body.password == value) {
            return true
        } else {
            return false
        }
    }).withMessage("Los campos de las contraseñas deben coincidir"),
    body('imagen').custom(function (value, { req }) {
        let ext
        if (req.file != undefined) {
            return true
        } else {
            ext = "" + path.extname(req.files.filename).toLowerCase();
        }
        //console.log(ext);
        if (
            ext == ".jpg" ||
            ext == ".jpeg" ||
            ext == ".png" ||
            ext == ".gif") {
            return true;
        }
        return false;
    }).withMessage('Solo debe seleccionar archivos  con extensión JPG, JPEG, PNG o GIF')
]

router.get('/register', usersController.register);
router.post("/register", upload.single("imagen"), validacionRegistro, usersController.create)
router.get('/login', usersController.login);



module.exports = router;