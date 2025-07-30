import { Logger } from "@/helpers";
import { UserRepo } from "@/repository";
import { ME } from "@/types";

export default class UserService {
    private userRepo;
    constructor() {
        this.userRepo = new UserRepo();
    }

    async findById(id: string): Promise<ME | null> {
        let me: ME | null = null;
        try {
            me = await this.userRepo.findById(id);
        } catch (error) {
            Logger.getLogger().error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
        return me;
    }

}