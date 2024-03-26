const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/api/productsApiController');

router.get("/api/products", apiProductsController.list);
router.get('/api/products/:id', apiProductsController.detail);
// router.post('/api/products', apiProductsController.create);
// router.delete('/api/products/delete/:id', apiProductsController.delete);


module.exports = router;