import { AppDataSource, JWT, Logger } from "@/helpers";
import { SessionRepo } from "@/repository";
import UserRepo from "@/repository/UserRepo";
import { AuthSession, JWTAuthPayload, Login, RegisterUser, Token } from "@/types";
import { QueryRunner } from "typeorm";


export default class AuthService {
    private sessionRepo: SessionRepo;
    private userRepo: UserRepo;
    private logger;
    private jwt: JWT<JWTAuthPayload>;

    constructor() {
        this.sessionRepo = new SessionRepo();
        this.userRepo = new UserRepo();
        this.logger = Logger.getLogger();
        this.jwt = new JWT();
    }

    async authenticate(token: string, queryRunner?: QueryRunner): Promise<AuthSession | null> {
        try {
            const data = await this.jwt.verify(token);
            const session = await this.sessionRepo.findById(data.jti, queryRunner);
            if (session) {
                return {
                    userId: session.userId, // assuming when the user got deleted or banned from the app all his sessions where deleted too.
                    sessionId: session.id,
                }
            }
            return session;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async login({ email, password }: Login): Promise<string | null> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let token: string | null = null;
        try {
            const user = await this.userRepo.findByEmail(email, queryRunner);
            if (!user || !(await user.verifyPassword(password))) return null;
            const session = await this.sessionRepo.create(user.id, queryRunner);
            token = this.jwt.sign({
                jti: session.id,
                expiresAt: session.expiresAt
            });
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            token = null;
            throw error;
        } finally {
            await queryRunner.release();
        }
        return token;
    }

    async register({ email, password, name }: RegisterUser): Promise<string | null> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let token: string | null = null;
        try {
            // if this method is called oidc will always be false
            const user = await this.userRepo.create({
                email,
                password,
                name,
                oidc: false
            }, queryRunner);
            const session = await this.sessionRepo.create(user.id, queryRunner);
            token = this.jwt.sign({
                jti: session.id,
                expiresAt: session.expiresAt,
            });
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            token = null;
            throw error;
        } finally {
            await queryRunner.release();
        }
        return token;
    }

    async logout(token: string): Promise<void> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const authSession = await this.authenticate(token, queryRunner);
            if (authSession) await this.sessionRepo.softDelete(authSession.sessionId, queryRunner);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

}