import winston, { Logger as WinstonLogger } from "winston";
import { AccessEnv } from "@/helpers";

export default class Logger {

    private static logger: WinstonLogger;
    private static accessEnv = AccessEnv.getInstance();

    static getLogger(): WinstonLogger {

        if (!this.logger) {
            this.logger = winston.createLogger({
                level: 'info',
                format: winston.format.json(),
                defaultMeta: {},
                transports: [
                    new winston.transports.File({ filename: 'error.log', level: 'error' }),
                    new winston.transports.File({ filename: 'combined.log' }),
                ],
            });
            const env = this.accessEnv.get("NODE_ENV");
            if (env !== 'production')
                this.logger.add(new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    ),
                }));
        }
        return this.logger;
    }

}
