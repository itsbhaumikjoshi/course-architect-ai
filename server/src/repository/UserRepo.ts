import { QueryRunner } from "typeorm";
import { User } from "@/models";
import { AppDataSource, Logger } from "@/helpers";
import { OIDC_PROVIDER } from "@/types/auth";

export type CreateUser = {
    email: string,
    password?: string,
    oidc: boolean,
    name: string,
    oidcId?: string,
    oidcProvider?: OIDC_PROVIDER
};

export type GetUser = {
    email: string,
    name: string,
    id: string
};

export default class UserRepo {

    private logger;

    constructor() {
        this.logger = Logger.getLogger();
    }

    async create({ email, password, name, oidc, oidcId, oidcProvider }: CreateUser, queryRunner: QueryRunner): Promise<User> {
        try {
            const user = queryRunner.manager.create(User, {
                email,
                password,
                name,
                oidc,
                oidcId,
                oidcProvider
            });
            await queryRunner.manager.save(user);
            return user;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async findByEmail(email: string, queryRunner: QueryRunner): Promise<User | null> {
        try {
            const user = await queryRunner.manager.findOneBy(User, { email });
            return user;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async findById(id: string, queryRunner?: QueryRunner): Promise<GetUser | null> {
        try {
            const user = queryRunner ?
                await queryRunner.manager.findOneBy(User, { id }) :
                await AppDataSource.getDataSource().getRepository(User).findOneBy({ id });
            if (user)
                return {
                    email: user.email,
                    name: user.name,
                    id: user.id
                }
            return null;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async findByOidcId(oidcId: string, queryRunner: QueryRunner): Promise<User | null> {
        try {
            const user = await queryRunner.manager.findOneBy(User, { oidcId });
            return user;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

}