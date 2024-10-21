import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./entity-model.entity";
import { User } from "./user.entity";

@Entity()
export class Message extends EntityModel {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column()
    role: string

    @Column({ type: "longtext", nullable: true })
    message?: string

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User, { nullable: false, eager: false, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    user: User
}
