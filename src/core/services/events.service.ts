import {ConsentModel, UserModel} from "../models/user.model";
import {getConnection} from "typeorm";
import {UserRepository} from "../../data/user.repository";
import {ConsentsEnum} from "../models/consents.enum";

exports.createEvent = async function (id: string, consents: ConsentModel[]): Promise<UserModel> {
    try {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);
        if (!user) {
            throw Error('User do not exist');
        }

        for (const consent of consents) {
            if(consent.id === ConsentsEnum.SMS || consent.id === ConsentsEnum.MAIL){
                const index = user.consents.findIndex(c => c.id === consent.id)
                if (index !== -1) {
                    user.consents[index].enabled = consent.enabled;
                } else {
                    user.consents.push(consent);
                }
            }
        }

        const updated = await userRepository.updateUser(id, user.consents);

        return {
            id: updated.id,
            email: updated.email,
            consents: updated.consents,
        }
    } catch (e: any) {
        console.error(e);
        throw Error('Cannot create event');
    }
}