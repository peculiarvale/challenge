import { Router } from "express";

const router = Router();

const UsersController = require('./users.controller');

router.get('/all', UsersController.getAll);

router.get('/:id', UsersController.getUser);

router.post('/create', UsersController.createUser);

router.delete('/:id', UsersController.deleteUser);

module.exports = router;