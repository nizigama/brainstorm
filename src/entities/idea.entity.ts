import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./entity-model.entity";
import { User } from "./user.entity";

@Entity()
export class Idea extends EntityModel {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({type:"longtext"})
    content: string

    @JoinColumn({name: "user_id"})
    @ManyToOne(()=>User,{eager: false, nullable: false, onDelete:"RESTRICT",onUpdate:"CASCADE"})
    user: User
}
