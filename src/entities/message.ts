import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./entity-model";

@Entity()
export class Message extends EntityModel {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    role: string

    @Column({type: "longtext",nullable:true})
    message?: string
}
