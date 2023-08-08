import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('changes')
export class Changes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        name: "post_id"
    })
    postId: number;

    @Column()
    changes: string;

    @Column({
        name: 'timestamp',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    timestamp: Date;

}
