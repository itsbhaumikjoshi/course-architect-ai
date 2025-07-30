import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { PasswordHasher } from "@/helpers";
import { Course, Session } from "@/models";
import { OIDC_PROVIDER } from "@/types/auth";

@Entity("users")
export default class User {

    private hasher: PasswordHasher = new PasswordHasher();

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ type: "varchar", length: 150, nullable: false, unique: true })
    public email!: string;

    @Column({ type: "varchar", length: 250, nullable: false, name: "name" })
    public name!: string;

    @Column({ type: "bool", default: false, name: "oidc" })
    public oidc!: boolean;

    @Index()
    @Column({ type: "varchar", nullable: true, name: "oidc_id" })
    public oidcId?: string;

    @Column({ type: "enum", enum: OIDC_PROVIDER, nullable: true, name: "oidc_provider" })
    public oidcProvider?: OIDC_PROVIDER;

    @Column({ type: "char", length: 60, nullable: true })
    public password?: string;

    async verifyPassword(password: string): Promise<boolean> {
        return this.password ? await this.hasher.compare(password, this.password) : true;
    }

    @BeforeInsert()
    async hashPassword() {
        if (this.password) this.password = await this.hasher.hash(this.password);
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
