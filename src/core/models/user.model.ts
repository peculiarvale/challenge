import {ConsentModel} from "./event.model";

export interface UserModel {
    id: string;
    email: string;
    consents: ConsentModel[]
}
