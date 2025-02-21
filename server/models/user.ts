import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()  // Это поле будет автоинкрементируемым первичным ключом
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    role: 'user'|'admin';

    @Column({ type: 'bigint', nullable: true })
    lastOnlineTimeshtmap: number;

    @Column({ type: 'bigint', nullable: true })
    registrationTimeshtmap: number;

    @BeforeInsert()
    setRegistrationTimestamp() {
        this.registrationTimeshtmap = Date.now();
    }
}