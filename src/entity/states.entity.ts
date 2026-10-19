import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Farmer } from './user.entity.js';

@Entity('states')
export class States {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 2, unique: true })
  code: string;

  @OneToMany(() => Farmer, (farmer) => farmer.state_name)
  farmers: Farmer[];
}