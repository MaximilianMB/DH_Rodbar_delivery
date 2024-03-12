const express = require ('express');
const indexController = require ('../controllers/indexController');
const router = express.Router();




router.get("/", indexController.home);
router.get("/buscarProductos", indexController.search)

module.exports = router;