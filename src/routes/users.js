const express = require('express');
const usersController = require("../controllers/usersController")
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs  = require("fs");
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
    body('email').custom(function (value) {
        let emailRepetido = 0;
        let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
        usuarios.forEach(function (user) {
            if (user.email === value) {
                emailRepetido++;
            }
        });
        if(emailRepetido > 0){
            return false
        }else{
            return true
        }
    }).withMessage("El email ya está registrado"),

    check("password")
        .isLength({ min: 6 })
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
        let emailRepetido = 0;
        let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
        usuarios.forEach(function (user) {
            if (user.email === value) {
                emailRepetido++;
            }
        });
        if(emailRepetido > 0){
            return true
        }else{
            return false
        }
    }).withMessage("El email indicado no está registrado"),
    check("password")
    .isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("password").custom(function(value, {req}){
        let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
        for(let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email == req.body.email) {
                let usuario = usuarios[i];
                let samePassword = bcrypt.compareSync(value, usuario.password);
                if(samePassword){
                    return true
                }else{
                    return false
                }
        }
    }
}).withMessage("El usuario o contraseña son incorrectos")
]

router.get('/register', usersController.register);
router.post("/register", upload.single("imagen"), validacionRegistro, usersController.create)
router.get('/login', usersController.login);
router.post("/login",validationLogin, usersController.logueado)



module.exports = router;

