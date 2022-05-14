import {createConnection} from "typeorm";
import {UserEntity} from "./data/user.entity";
import {EventEntity} from "./data/event.entity";

export const connect = async () => {
    try {
        const type = 'postgres';
        const host = "127.0.0.1";
        const port = 5432;
        const database = 'challenge';

        await createConnection({
            type,
            host,
            port,
            username: "user1",
            password: "azerty123",
            database,
            entities: [
                UserEntity,
                EventEntity
            ],
            synchronize: true,
            logging: false
        });
        console.log('Connected to ' + type + ' database at adress ' + host + ':' + port + ' / database ' + database);
    } catch (e) {
        console.error(e);
    }
}