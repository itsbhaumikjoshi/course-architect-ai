import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { PasswordHasher } from "@/helpers";
import { Course, Session } from "@/models";

@Entity("users")
export default class User {

    private hasher: PasswordHasher = new PasswordHasher();

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ type: "varchar", length: 150, nullable: false, unique: true })
    public email!: string;


    @Column({ type: "varchar", length: 100, nullable: false, name: "first_name" })
    public firstName!: string;


    @Column({ type: "varchar", length: 100, nullable: false, name: "last_name" })
    public lastName!: string;

    @Column({ type: "char", length: 60, nullable: false })
    public password!: string;

    async verifyPassword(password: string): Promise<boolean> {
        return await this.hasher.compare(password, this.password);
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await this.hasher.hash(this.password);
    }

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    public createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    public updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
    public deletedAt?: Date;

    @OneToMany(() => Session, (s) => s.user, { cascade: ['soft-remove'] })
    public sessions: Session[];

    @OneToMany(() => Course, (c) => c.user, { cascade: ['soft-remove'] })
    public courses: Course[];

}
