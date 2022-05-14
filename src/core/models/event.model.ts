import {ConsentsEnum} from "./consents.enum";

export interface EventModel {
    id: string;
    timestamp: Date;
    user_email: string;
    consents: ConsentModel[]
}

export interface ConsentModel {
    id: ConsentsEnum,
    enabled: boolean
}
