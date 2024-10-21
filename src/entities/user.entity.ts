import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./entity-model.entity";

@Entity()
export class User extends EntityModel {
    
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    username: string

    @Column()
    password: string
}
