import {connect} from "./connection";

// Express server initialization
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

const jsonParser = bodyParser.json()

// Routes initialization
const eventsRoutes = require('./api/events/events.routes');
const usersRoutes = require('./api/users/users.routes');

app.use('/api/events', jsonParser, eventsRoutes);
app.use('/api/users', jsonParser, usersRoutes);

// Database initialization
connect();