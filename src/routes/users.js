const express = require('express');
const usersController = require("../controllers/usersController")
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { body, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");
const sequelize = db.Sequelize;


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
    body('email').custom(function (value) {
        return db.User.findOne({ where: { email: value } })
            .then(user => {
                if (user) {
                    return Promise.reject(); // Lanzar un error para indicar validación fallida
                }
                return true; // Indicar que la validación ha pasado con éxito
            });
    }).withMessage("El email ya está registrado en la base de datos"),

    check("password")
        .isLength({ min: 6 })
        .withMessage("El campo contraseña debe tener al menos 6 caracteres"),

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

const validationLogin = [
    check("email")
        .isEmail().withMessage("El campo debe ser un email"),
    body('email').custom(function (value) {
        return db.User.findOne({ where: { email: value } })
            .then(user => {
                if (user) {
                    return true; // Lanzar un error para indicar validación fallida
                }
                return Promise.reject(); // Indicar que la validación ha pasado con éxito
            });
    }).withMessage("El email no está registrado en la base de datos"),
    check("password")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
]

const validationProfile = [
    check("oldPassword")

]

router.get('/register', usersController.register);
router.post("/register", upload.single("imagen"), validacionRegistro, usersController.create)
router.get('/login', usersController.login);
router.post("/login", validationLogin, usersController.logueado);
router.post("/", usersController.logout)
router.get('/profile/:id', usersController.profile)
// router.post('/profile/:id', usersController.update)
router.get("/editarUser/:id", usersController.editar)
router.post("/editarUser/:id", upload.single("imagen"), usersController.update)



module.exports = router;

