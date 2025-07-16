import express, { NextFunction, Request, Response } from "express";
import { AccessEnv, Logger } from "@/helpers";
import { AppDataSource } from "@/helpers";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export default class Server {

    private accessEnv = AccessEnv.getInstance();
    private logger = Logger.getLogger();
    private app = express();
    private PORT: number;

    private async init(): Promise<void> {
        try {
            const dataSource = AppDataSource.getDataSource();
            await dataSource.initialize();
            const host = (dataSource.options as PostgresConnectionOptions).host;
            const name = dataSource.options.database;
            this.logger.info(`Connected at ${host} to ${name}.`);
        } catch(e) {
            this.logger.error("Failed to establish connection with DB");
            process.exit(1);
        }
    }

    async start() {
        try {
            await this.init();

            // if applicable route not found then send 404 response
            this.app.use((req, res) => {
                res.status(404).json({
                    message: "Route not found!"
                });
            });

            // error handler if any encountered
            this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
                res.locals.message = err.message;
                res.locals.error = req.app.get("env") === "development" ? err : {};
                this.logger.error(err.message, err);
                res.status(500).json({
                    message: "Internal Server Error Encountered",
                });
            });

            // server is listening            
            this.app.listen(this.PORT, () => {
                this.logger.info(`Server listening on port: ${this.PORT}`);
            });
        } catch (e) {
            this.logger.error(e);
            process.exit(1);
        }
    }

}
