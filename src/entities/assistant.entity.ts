import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { EntityModel } from "./entity-model.entity";

@Entity()
export class Assistant extends EntityModel {
    
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    @Index({unique: true})
    identifier: string

    @Column()
    @Index({unique: true})
    name: string

    @Column()
    model: string

    @Column({type:"double"})
    temperature: number
}
