import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn
} from "typeorm";
import { Module } from "@/models";

@Entity("lessons")
export default class Lesson {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ type: "text", nullable: false })
    public content!: string;

    @ManyToOne(() => Module, (m) => m.lessons, { onDelete: "CASCADE" })
    @JoinColumn({ name: "module_id" })
    public module!: Module | string;

    @RelationId((lesson: Lesson) => lesson.module)
    public moduleId!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    public createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    public updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
    public deletedAt: Date;

}
