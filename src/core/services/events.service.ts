import {UserModel} from "../models/user.model";
import {getConnection} from "typeorm";
import {UserRepository} from "../../data/user.repository";
import {ConsentModel, EventModel} from "../models/event.model";
import {EventRepository} from "../../data/event.repository";

exports.createEvent = async function (id: string, consents: ConsentModel[]): Promise<UserModel> {
    try {
        // Get connection to database
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const eventRepository = getConnection().getCustomRepository(EventRepository);

        // Retrieve the user
        const user = await userRepository.findOne(id);
        if (!user) {
            // An event can only be created for a user
            throw Error('User do not exist');
        }

        // Retrieve list of current user consents, and compute the new consents with the consents in body request
        for (const consent of consents) {
            const index = user.consents.findIndex(c => c.id === consent.id)
            if (index !== -1) {
                user.consents[index].enabled = consent.enabled;
            }
        }

        // Update current user entry with its new consents
        const updated = await userRepository.updateUser(id, user.consents);

        // Log the event in a table, an event is always related to one user.
        await eventRepository.createEvent(user, consents);

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

exports.find = async function (user_id?: string): Promise<EventModel[]> {
    console.log('Get events');
    // Get connection to database
    const eventRepository = getConnection().getCustomRepository(EventRepository);

    let where = {};

    // If user_id is not specified, return all events not matter the user
    if (user_id) {
        where = {
            user: {
                id: user_id
            }
        }
    }

    // Order the events by newer first
    const events = await eventRepository.find({
        where,
        relations: ['user'],
        order: {
            timestamp: 'DESC'
        }
    });

    // To be more user friendly, return the user email and not identifier
    return events.map(event => {
        return {
            id: event.id,
            consents: event.consents,
            timestamp: event.timestamp,
            user_email: event.user.email
        }
    });
}