import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { User } from "@/models";

@Entity("sessions")
export default class Session {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "user_id" })
    public user!: User | string;

    @RelationId((session: Session) => session.user)
    public userId!: string;

    @Column({ type: "timestamptz", name: "expires_at" })
    public expiresAt!: Date;

    @CreateDateColumn({ type: "timestamptz", name: "created_at" })
    public createdAt!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
    public deletedAt?: Date;

    isValid(): boolean {
        return this.deletedAt == null && this.expiresAt > new Date();
    }

    // if token expxires in one day or less renew it.
    hasToRenew(): boolean {
        if (!this.isValid()) return false;
        const now = new Date();
        const difference = (now.getTime() - this.expiresAt.getTime()) / (1000 * 24 * 60 * 60);
        return difference <= 1;
    }

}
