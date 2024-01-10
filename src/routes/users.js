const express = require ('express');
const usersController = require ("../controllers/usersController")
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

router.get('/register', usersController.register);
router.get('/login', usersController.login);



module.exports = router;