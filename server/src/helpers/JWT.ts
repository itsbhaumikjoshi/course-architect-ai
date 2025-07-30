import { randomBytes } from "crypto";
import AccessEnv from "./AccessEnv";
import { JWT_EXPIRES_IN, JWT_SECRET } from "@/const";
import { sign, verify } from "jsonwebtoken";
import { Logger } from "@/helpers";

export default class JWT<T extends object> {
    private JWT_SECRET: string;
    private EXPIRES_IN: number;
    constructor() {
        const secret = AccessEnv.getInstance().get(JWT_SECRET);
        const expiresIn = AccessEnv.getInstance().get(JWT_EXPIRES_IN);
        this.JWT_SECRET = !secret ? randomBytes(64).toString("base64") : secret;
        this.EXPIRES_IN = expiresIn ? Number(expiresIn) : 60 * 60 * 24 /* default one day */;
    }

    sign(payload: T): string {
        return sign(payload, this.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: this.EXPIRES_IN,
        });
    }

    verify(token: string): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                const decoded = verify(token, this.JWT_SECRET) as T;
                resolve(decoded);
            } catch (error) {
                Logger.getLogger().error(`${this.constructor.name}: Error: ${error}`);
                reject(error);
            }
        });
    }

}
