import {describe, expect, it} from '@jest/globals';
import {connect} from "../src/connection";
import {getConnection} from "typeorm";
import {ConsentsEnum} from "../src/core/models/consents.enum";

const {createUser, getUser, deleteUser} = require('../src/core/services/users.service');
const {createEvent, find} = require('../src/core/services/events.service');

describe('Challenge tests', () => {
    const emailSuccess = 'jest-' + Date.now() + '@gmail.com';
    let userId: string = null;

    beforeAll(async () => {
        await connect();
    });

    it('Correct project name', async () => {
        const pjson = require('../package.json');
        expect(pjson?.name).toBe('digikare-challenge');
    });

    it('User creation error', async () => {
        expect(async () => await createUser('aaaa').toThrowError(
            Error('The email argument do not respect the expected format')
        ));

        expect(async () => await createUser().toThrowError(
            Error('The email argument do not respect the expected format')
        ));
    });

    it('User creation success', async () => {
        const result = await createUser(emailSuccess);
        userId = result.id;

        expect(result.email).toBe(emailSuccess);
        expect(result.consents).toStrictEqual([
            {
                id: ConsentsEnum.SMS,
                enabled: false,
            },
            {
                id: ConsentsEnum.MAIL,
                enabled: false,
            }
        ]);
    });

    it('User creation exist', async () => {
        expect(async () => await createUser(emailSuccess).toThrowError(
            Error('This email is already used.')
        ));
    });

    it('Get created user', async () => {
        const result = await getUser(userId);

        expect(result.id).toBe(userId);
        expect(result.email).toBe(emailSuccess);
        expect(result.consents).toStrictEqual([
            {
                id: ConsentsEnum.SMS,
                enabled: false,
            },
            {
                id: ConsentsEnum.MAIL,
                enabled: false,
            }
        ]);
    });

    it('Get unknown user', async () => {
        expect(async () => await getUser('fdsljfe58dfsz-dfds4').toThrowError(
            Error('User do not exist')
        ));
    });

    it('Create 1st event for user', async () => {
        const result = await createEvent(userId,
            [
                {
                    "id": "email_notifications",
                    "enabled": true
                }
            ]);

        expect(result.id).toBe(userId);
        expect(result.email).toBe(emailSuccess);
        expect(result.consents).toStrictEqual([
            {
                id: ConsentsEnum.SMS,
                enabled: false,
            },
            {
                id: ConsentsEnum.MAIL,
                enabled: true,
            }
        ]);
    });

    it('Create 2nd event for user', async () => {
        const result = await createEvent(userId,
            [
                {
                    "id": "email_notifications",
                    "enabled": false
                },
                {
                    "id": "sms_notifications",
                    "enabled": true
                }
            ]);

        expect(result.id).toBe(userId);
        expect(result.email).toBe(emailSuccess);
        expect(result.consents).toStrictEqual([
            {
                id: ConsentsEnum.SMS,
                enabled: true,
            },
            {
                id: ConsentsEnum.MAIL,
                enabled: false,
            }
        ]);
    });

    it('Get created user after events', async () => {
        const result = await getUser(userId);

        expect(result.id).toBe(userId);
        expect(result.email).toBe(emailSuccess);
        expect(result.consents).toStrictEqual([
            {
                id: ConsentsEnum.SMS,
                enabled: true,
            },
            {
                id: ConsentsEnum.MAIL,
                enabled: false,
            }
        ]);
    });

    it('Get events for a user', async () => {
        const result = await find(userId);

        expect(result.length).toBe(2);
        expect(result[0].user_email).toBe(emailSuccess);
        expect(result[1].user_email).toBe(emailSuccess);
        // DESC timestamp
        expect(result[1].consents).toStrictEqual([
            {
                id: ConsentsEnum.MAIL,
                enabled: true,
            }
        ]);
        expect(result[0].consents).toStrictEqual([
            {
                id: ConsentsEnum.MAIL,
                enabled: false,
            },
            {
                id: ConsentsEnum.SMS,
                enabled: true,
            },
        ]);
    });

    it('Delete unknown user', async () => {
        expect(async () => await deleteUser('fdsljfe58dfsz-dfds4').toThrowError(
            Error('Cannot delete user')
        ));
    });

    it('Delete created user', async () => {
        const result = await deleteUser(userId);

        expect(result).toBe('User ' + userId + ' deleted.');
    });

    afterAll(async () => {
        await getConnection().close();
    });
});