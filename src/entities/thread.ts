import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./entity-model";
import { User } from "./user";

@Entity()
export class Thread extends EntityModel {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    identifier: string

    @ManyToOne(()=>User)
    @JoinColumn({name:"user_id"})
    user: User
}
