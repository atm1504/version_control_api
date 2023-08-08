import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    content: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

}
