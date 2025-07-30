import { Logger } from "@/helpers";
import { Module } from "@/models";
import { QueryRunner } from "typeorm";

export type CreateModule = {
    title: string,
    courseId: string,
};

export type GetModule = {
    id: string,
}

export default class ModuleRepo {
    private logger;
    constructor() {
        this.logger = Logger.getLogger();
    }

    async create({ title, courseId }: CreateModule, queryRunner: QueryRunner): Promise<Module | null> {
        try {
            const module = await queryRunner.manager.create(Module, {
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

    async get({ id }: GetModule, queryRunner: QueryRunner): Promise<Module | null> {
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