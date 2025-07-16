import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "@/models";

@Entity("sessions")
export default class Session {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    public user!: User | string;

    @Column({ type: "timestamptz", name: "expires_at" })
    public expires_at!: Date;

    @CreateDateColumn({ type: "timestamptz", name: "created_at" })
    public created_at!: Date;

    @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
    public deleted_at?: Date;

    isValid(): boolean {
        return this.deleted_at == null && this.expires_at < new Date();
    }

    // if token expxires in one day or less renew it.
    hasToRenew(): boolean {
        if (!this.isValid()) return false;
        const now = new Date();
        const difference = (now.getTime() - this.expires_at.getTime()) / (1000 * 24 * 60 * 60);
        return difference <= 1;
    }

}
