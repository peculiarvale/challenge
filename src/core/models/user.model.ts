import {ConsentsEnum} from "./consents.enum";

export interface UserModel {
    id: string;
    email: string;
    consents: ConsentModel[]
}

export interface ConsentModel {
    id: ConsentsEnum,
    enabled: boolean
}
