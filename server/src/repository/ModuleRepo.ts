import { Logger } from "@/helpers";
import { Module } from "@/models";
import { ICreateModule } from "@/types";
import { QueryRunner } from "typeorm";

export default class ModuleRepo {
    private logger;
    constructor() {
        this.logger = Logger.getLogger();
    }

    async create({ id, title, courseId }: ICreateModule, queryRunner: QueryRunner): Promise<Module | null> {
        try {
            const module = await queryRunner.manager.create(Module, {
                id: courseId+'#'+id,
                course: courseId,
                title
            });
            await queryRunner.manager.save(module);
            this.logger.info(`${this.constructor.name}: Created module with id ${module.id} for course ${module.course}`);
            return module;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async findById(id: string, queryRunner: QueryRunner): Promise<Module | null> {
        try {
            const module = await queryRunner.manager.findOneBy(Module, { id });
            this.logger.info(`${this.constructor.name}: Getting module with id ${id} result ${module != null}`);
            return module;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

}