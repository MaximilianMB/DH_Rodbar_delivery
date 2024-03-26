const express = require('express');
const router = express.Router();
const apiUsersController = require('../../controllers/api/usersApiController');

router.get("/api/users", apiUsersController.list);
router.get('/api/users/:id', apiUsersController.detail);
// router.post('/api/users/create', apiUsersController.create);
// router.delete('/api/users/delete/:id', apiUsersController.delete);


module.exports = router;