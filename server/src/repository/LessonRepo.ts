import { Logger } from "@/helpers";
import { Lesson } from "@/models";
import { ICreateLesson } from "@/types";
import { QueryRunner } from "typeorm";

export default class LessonRepo {
    private logger;
    constructor() {
        this.logger = Logger.getLogger();
    }

    async create({ content, moduleId }: ICreateLesson, queryRunner: QueryRunner): Promise<Lesson | null> {
        try {
            const lesson = await queryRunner.manager.create(Lesson, {
                content,
                module: moduleId
            });
            await queryRunner.manager.save(lesson);
            this.logger.info(`${this.constructor.name}: Created lesson with id ${lesson.id} for module ${lesson.module}`);
            return lesson;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async findByModuleId(moduleId: string, queryRunner: QueryRunner): Promise<Lesson[] | null> {
        try {
            const lessons = await queryRunner.manager.findBy(Lesson, { module: { id: moduleId } });
            this.logger.info(`${this.constructor.name}: Getting lessons for module with id ${moduleId}`);
            return lessons;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

}