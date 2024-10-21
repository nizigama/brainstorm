import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./entity-model.entity";
import { User } from "./user.entity";

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
