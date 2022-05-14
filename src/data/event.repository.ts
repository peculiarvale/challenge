import {EntityRepository, Repository} from "typeorm";
import {EventEntity} from "./event.entity";
import {UserEntity} from "./user.entity";
import {ConsentModel} from "../core/models/event.model";

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {

    public async createEvent(user: UserEntity, consents: ConsentModel[]): Promise<EventEntity> {
        const event: EventEntity = {
            // Event is created for only one user
            user,
            // Add event request timestamp to help events history
            timestamp: new Date(),
            consents
        };
        return await this.save(event)
    }
}