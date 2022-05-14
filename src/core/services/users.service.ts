import {UserModel} from "../models/user.model";
import {UserRepository} from "../../data/user.repository";
import {getConnection} from "typeorm";

exports.createUser = async function (email: string): Promise<UserModel> {
    try {
        const mailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!mailRegExp.test(email)) {
            throw Error('The email argument do not respect the expected format');
        }
        // Get connection to database
        const userRepository = getConnection().getCustomRepository(UserRepository);

        // Create a new user with specified email
        const created = await userRepository.createUser(email);

        return {
            id: created.id,
            email: created.email,
            consents: created.consents,
        }
    } catch (e: any) {
        let errorMessage = e.message;
        if (e.code === '23505') {
            // Two users cannot have the same email
            errorMessage = 'This email is already used.';
        }
        console.error(e);
        throw Error(errorMessage);
    }
}

exports.getUser = async function (id: string): Promise<UserModel> {
    try {
        console.log('Get user ' + id);
        // Get connection to database
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
        // Get connection to database
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
        // Get connection to database
        const userRepository = getConnection().getCustomRepository(UserRepository);

        await userRepository.deleteUser(id);

        return 'User ' + id + ' deleted.';

    } catch (e: any) {
        console.error(e);
        throw Error('Cannot delete user');
    }
}