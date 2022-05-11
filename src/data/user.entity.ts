import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {ConsentModel} from "../core/models/user.model";

@Entity({name: "user"})
@Unique('unique_email_constraint', ['email'])
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type: 'varchar', nullable: false})
    email: string;

    @Column({type: 'jsonb', nullable: true})
    consents?: ConsentModel[];
}