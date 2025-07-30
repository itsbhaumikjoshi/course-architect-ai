import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn
} from "typeorm";
import { User, Module } from "@/models";

@Entity("courses")
export default class Course {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ type: "varchar", length: "250", nullable: false })
    public title!: string;

    @Column({ type: "varchar", nullable: false })
    public description!: string;

    @ManyToOne(() => User, (user) => user.courses, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    public user!: User | string;
    
    @RelationId((course: Course) => course.user)
    public userId!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    public createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    public updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
    public deletedAt: Date;

    @OneToMany(() => Module, (m) => m.course, { cascade: ['soft-remove'] })
    public modules: Module[];

}
