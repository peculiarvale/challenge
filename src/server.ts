import {createConnection} from "typeorm";
import {UserEntity} from "./data/user.entity";

const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

const jsonParser = bodyParser.json()

const eventsRoutes = require('./api/events/events.routes');
const usersRoutes = require('./api/users/users.routes');

app.use('/api/events', jsonParser, eventsRoutes);
app.use('/api/users', jsonParser, usersRoutes);

const configure = async () => {
    try {
        console.log('Init connection to database');
        await createConnection({
            type: "postgres",
            host: "0.0.0.0",
            port: 5432,
            username: "peculiarvale",
            password: "azerty123",
            database: "challenge",
            entities: [
                UserEntity
            ],
            synchronize: true,
            logging: false
        });
    } catch (e) {
        console.error(e);
    }
}

configure();