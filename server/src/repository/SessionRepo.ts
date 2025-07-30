import { AppDataSource, Logger } from "@/helpers";
import { Session } from "@/models";
import { QueryRunner } from "typeorm";

export default class SessionRepo {
    private logger;
    constructor() {
        this.logger = Logger.getLogger();
    }

    async create(userId: string, queryRunner: QueryRunner): Promise<Session> {
        try {
            const session = queryRunner.manager.create(Session, {
                user: userId,
                expiresAt: this.getExpiryTime(),
            });
            await queryRunner.manager.save(session);
            return session;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    private getExpiryTime() {
        const dt = new Date();
        dt.setHours(dt.getHours() + 24);
        return dt;
    }

    async findById(id: string, queryRunner?: QueryRunner): Promise<Session | null> {
        try {
            const session = queryRunner ?
                await queryRunner.manager.findOneBy(Session, { id }) :
                await AppDataSource.getDataSource().getRepository(Session).findOneBy({ id });;
            if (session && session.isValid()) return session;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
        return null;
    }

    async softDelete(id: string, queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.manager.softDelete(Session, { id });
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

}