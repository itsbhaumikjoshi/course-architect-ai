import { DataSource } from "typeorm";
import { AccessEnv, Logger } from "@/helpers";
import { Session, User } from "@/models";

export default class AppDataSource {
    private static dataSource: DataSource;
    private static accessEnv = AccessEnv.getInstance();

    static getDataSource(): DataSource {
        if (!this.dataSource) {
            const host = this.accessEnv.get("DB_HOST");
            const port = this.accessEnv.get("DB_PORT");
            const database = this.accessEnv.get("DB_NAME");
            const username = this.accessEnv.get("DB_USERNAME");
            const password = this.accessEnv.get("DB_PASSWORD");

            if (
                !host ||
                !port ||
                !database ||
                !username ||
                !password
            ) {
                // this.logger.error("Missing essential env variables. Unable to connect with DB.");
                process.exit(1);
            }

            const dbPort = Number(port);

            this.dataSource = new DataSource({
                type: "postgres",
                host,
                port: dbPort,
                database,
                username,
                password,
                entities: [
                    User,
                    Session
                ],
                migrations: ['src/migrations/**/*.{ts,js}'],
                logging: false,
                synchronize: false
            });

        }

        return this.dataSource;
    }

}