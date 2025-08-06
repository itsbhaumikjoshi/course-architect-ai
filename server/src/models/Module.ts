import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    RelationId,
    UpdateDateColumn
} from "typeorm";
import { Course, Lesson } from "@/models";

@Entity("modules")
export default class Module {
    @PrimaryColumn()
    public id!: string;

    @Column({ type: "varchar", length: "250", nullable: false })
    public title!: string;

    @ManyToOne(() => Course, (course) => course.modules, { onDelete: "CASCADE" })
    @JoinColumn({ name: "course_id" })
    public course!: Course | string;

    @RelationId((module: Module) => module.course)
    public courseId!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    public createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    public updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
    public deletedAt: Date;

    @OneToMany(() => Lesson, (l) => l.module, { cascade: ['soft-remove'] })
    public lessons: Lesson[];

}
