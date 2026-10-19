import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
    ManyToOne,
} from "typeorm";

import { AssociatedUser } from "./associate.user.entity.js";
import { States } from "./states.entity.js";

@Entity('farmers')
export class Farmer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    middle_name: string | null;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    last_name: string;

    @Column({
        type: 'date',
    })
    date_of_birth: Date;

    @Column({
        type: 'varchar',
        length: 255,
    })
    address_1: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    address_2: string | null;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    locality_name: string | null;

    @ManyToOne(() => States, (state) => state.farmers, {
        nullable: true,
    })
    @JoinColumn({ name: 'state_id' })
    state_name: States | null;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    gender: string | null;

    @OneToMany(() => AssociatedUser, (association) => association.farmer)
    schemes: AssociatedUser[];
}