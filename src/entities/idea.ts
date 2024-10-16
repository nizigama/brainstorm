import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./entity-model";

@Entity()
export class Idea extends EntityModel {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({type:"longtext"})
    content: string
}
