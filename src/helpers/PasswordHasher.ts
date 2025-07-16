import { compare as Bcompare, genSalt, hash } from "bcrypt";
import { AccessEnv } from "@/helpers";

export default class PasswordHasher {

    private accessEnv = AccessEnv.getInstance();
    private saltRounds: number = Number(this.accessEnv.get("SALT_ROUND")) || 12;

    async hash(password: string): Promise<string> {
        return await hash(password, await genSalt(this.saltRounds));
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await Bcompare(password, hashedPassword);
    }

}
