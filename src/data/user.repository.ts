import {UserEntity} from "./user.entity";
import {EntityRepository, Repository} from "typeorm";
import {ConsentModel} from "../core/models/user.model";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    public async createUser(email: string): Promise<UserEntity> {
        const user: UserEntity = {
            email,
            consents : []
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