import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { AssociatedUser } from "./associate.user.entity.js";

@Entity('schemes')
export class Schemes {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 150
    })
    name: string;

    @Column({
        type: 'varchar'
    })
    description: string

    @Column({
        type: 'date'
    })
    startDate: Date

    @Column({
        type: 'date'
    })
    endDate: Date
    @OneToMany(
        () => AssociatedUser,
        (association) => association.scheme,
    )
    farmers: AssociatedUser[];
}
