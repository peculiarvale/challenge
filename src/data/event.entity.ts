import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import {UserEntity} from "./user.entity";
import {ConsentModel} from "../core/models/event.model";

@Entity('event')
export class EventEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'timestamptz', nullable: false })
    timestamp: Date;

    @Column({type: 'jsonb', nullable: false})
    consents?: ConsentModel[];

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity;
}
