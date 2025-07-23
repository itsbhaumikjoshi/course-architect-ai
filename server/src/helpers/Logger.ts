import {
    createLogger,
    Logger as WinstonLogger,
    transports,
    format
} from "winston";
import { AccessEnv } from "@/helpers";
import { PRODUCTION } from "@/const";

export default class Logger {

    private static logger: WinstonLogger;

    static getLogger(): WinstonLogger {
        if (!this.logger) {
            this.logger = createLogger({
                level: 'info',
                format: format.json(),
                defaultMeta: {},
                transports: [
                    new transports.File({ filename: 'error.log', level: 'error' }),
                    new transports.File({ filename: 'combined.log' }),
                ],
            });
            const isProduction = AccessEnv.getInstance().get("NODE_ENV") == PRODUCTION;
            if (isProduction)
                this.logger.add(new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.simple()
                    ),
                }));
        }
        return this.logger;
    }

}
