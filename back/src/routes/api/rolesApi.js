const express = require('express');
const router = express.Router();
const apiRolesController = require('../../controllers/api/rolApiController');

router.get("/api/roles", apiRolesController.list);

module.exports = router;