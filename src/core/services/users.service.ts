import {UserModel} from "../models/user.model";
import {UserRepository} from "../../data/user.repository";
import {getConnection} from "typeorm";

exports.createUser = async function (email: string): Promise<UserModel> {
    try {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const created = await userRepository.createUser(email);
        return {
            id: created.id,
            email: created.email,
            consents: created.consents,
        }
    } catch (e: any) {
        let errorMessage = 'Cannot create user';
        if (e.code === '23505') {
            errorMessage = 'This email is already used.';
        }
        console.error(e);
        throw Error(errorMessage);
    }
}

exports.getUser = async function (id: string): Promise<UserModel> {
    try {
        console.log('Get user ' + id);
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);
        if (!user) {
            throw Error('User do not exist');
        }
        return {
            id: user.id,
            email: user.email,
            consents: user.consents,
        }
    } catch (e: any) {
        console.error(e);
        throw Error(e);
    }
}

exports.getAllUsers = async function (): Promise<UserModel[]> {
    try {
        console.log('Get all users');
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const users = await userRepository.find();

        return users.map(user => {
            return {
                id: user.id,
                email: user.email,
                consents: user.consents
            }
        });

    } catch (e: any) {
        console.error(e);
        throw Error(e);
    }
}

exports.deleteUser = async function (id: string): Promise<string> {
    try {
        console.log('Delete user ' + id);
        const userRepository = getConnection().getCustomRepository(UserRepository);
        await userRepository.deleteUser(id);
        return 'User ' + id + ' deleted.';

    } catch (e: any) {
        console.error(e);
        throw Error('Cannot delete user');
    }
}