export interface UserModel {
    id: string;
    email: string;
    consents: ConsentModel[]
}

export interface ConsentModel {
    id: string,
    enabled: boolean
}
