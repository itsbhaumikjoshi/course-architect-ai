import express, { NextFunction, Request, Response } from "express";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { AccessEnv, Logger } from "@/helpers";
import { AppDataSource } from "@/helpers";
import Router from "@/routes";

export default class Server {

    private accessEnv = AccessEnv.getInstance();
    private logger = Logger.getLogger();
    private app = express();
    private PORT: number = Number(this.accessEnv.get("PORT")) || 5000;

    private async init(): Promise<void> {
        try {
            // establish db connection
            const dataSource = AppDataSource.getDataSource();
            await dataSource.initialize();
            const host = (dataSource.options as PostgresConnectionOptions).host;
            const name = dataSource.options.database;
            this.logger.info(`Connected at ${host} to ${name}.`);
        } catch (e) {
            this.logger.error("Failed to establish connection with DB"); // in future use circuit breaker with expo time retry
        }
    }

    async start() {
        try {
            await this.init();
            
            // parse string body
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));
            
            //routes
            const router = new Router();
            this.app.use("/", router.get());

            // if applicable route not found then send 404 response
            this.app.use((_, res) => {
                res.status(404).json({
                    message: "Route not found!"
                });
            });

            // error handler if any encountered
            this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
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
