import { DataSource } from "typeorm";
import { AccessEnv, Logger } from "@/helpers";
import { Course, Module, Lesson, Session, User } from "@/models";
import { DATABASE_TYPE, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "@/const";

export default class AppDataSource {
    private static dataSource: DataSource;

    static getDataSource(): DataSource {
        if (!this.dataSource) {
            const accessEnv = AccessEnv.getInstance();
            const host = accessEnv.get(DB_HOST);
            const port = accessEnv.get(DB_PORT);
            const database = accessEnv.get(DB_NAME);
            const username = accessEnv.get(DB_USERNAME);
            const password = accessEnv.get(DB_PASSWORD);

            if (
                !host ||
                !port ||
                !database ||
                !username ||
                !password
            ) {
                Logger.getLogger().error("Missing essential env variables. Unable to connect with DB.");
                process.exit(1);
            }

            const dbPort = Number(port);

            this.dataSource = new DataSource({
                type: DATABASE_TYPE,
                host,
                port: dbPort,
                database,
                username,
                password,
                entities: [
                    Course,
                    Module,
                    Lesson,
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