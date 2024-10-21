import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class EntityModel {
    
    @CreateDateColumn()
    created_at: string
    
    @UpdateDateColumn()
    updated_at: string
    
    @DeleteDateColumn()
    deleted_at?: string
}
