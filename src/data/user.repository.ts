import {UserEntity} from "./user.entity";
import {EntityRepository, Repository} from "typeorm";
import {ConsentModel} from "../core/models/event.model";
import {ConsentsEnum} from "../core/models/consents.enum";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    public async createUser(email: string): Promise<UserEntity> {
        const user: UserEntity = {
            email,
            // By default, user consents for sms and email are both false
            consents: [
                {
                    id: ConsentsEnum.SMS,
                    enabled: false,
                },
                {
                    id: ConsentsEnum.MAIL,
                    enabled: false,
                }
            ]
        };
        return await this.save(user)
    }

    public async deleteUser(id: string): Promise<UserEntity> {
        const user = await this.findOne(id);
        return await this.remove(user);
    }

    async updateUser(id: string, consents: ConsentModel[]): Promise<UserEntity> {
        const user = await this.findOne({
            id
        });
        user.consents = consents;
        return await this.save(user);
    }
}