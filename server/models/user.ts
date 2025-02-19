import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()  // Это поле будет автоинкрементируемым первичным ключом
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;
    
}