
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

import type { Relation } from "typeorm";
import { Farmer } from "./user.entity.js";
import { Schemes } from "./scheme.entity.js";
import { IsDateString } from "class-validator";

@Entity("farmer_schemes")
export class AssociatedUser {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    () => Farmer,
    (farmer) => farmer.schemes,
    { nullable: false },
  )
  @JoinColumn({ name: "farmer_id" })
  farmer: Relation<Farmer>;

  @ManyToOne(
    () => Schemes,
    (scheme) => scheme.farmers,
    { nullable: false },
  )
  @JoinColumn({ name: "scheme_id" })
  scheme: Relation<Schemes>;

  @Column({ type: "date" })
  @IsDateString()
  enrollment_start_date: Date;

  @Column({ type: "date", nullable: true })
  @IsDateString()
  enrollment_end_date: Date | null;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @CreateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
