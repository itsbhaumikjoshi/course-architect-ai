import { AppDataSource, JWT, Logger } from "@/helpers";
import { SessionRepo, UserRepo } from "@/repository";
import { OAuthLogin } from "@/types";

export default class OAuthService {
    private userRepo;
    private sessionRepo;
    private jwt;
    private logger;

    constructor() {
        this.jwt = new JWT();
        this.logger = Logger.getLogger();
        this.userRepo = new UserRepo();
        this.sessionRepo = new SessionRepo();
    }

    async login({ oidcId, oidcProvider, name, email }: OAuthLogin): Promise<string | null> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let token: string | null = null;
        try {
            let user = await this.userRepo.findByOidcId(oidcId, queryRunner);
            if (!user) user = await this.userRepo.create({ email, oidc: true, name, oidcId, oidcProvider }, queryRunner); // while authenticating with oauth and user is not present then the user shall be created
            const session = await this.sessionRepo.create(user.id, queryRunner);
            token = this.jwt.sign({
                jti: session.id,

            });
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        } finally {
            await queryRunner.release();
        }
        return token;
    }

}