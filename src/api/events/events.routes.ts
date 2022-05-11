import { Router } from "express";

const router = Router();

const EventsController = require('./events.controller');

router.post('/:user_id', EventsController.createEvent);

module.exports = router;