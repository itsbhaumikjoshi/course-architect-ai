import { Logger } from "@/helpers";
import { Lesson } from "@/models";
import { QueryRunner } from "typeorm";

export type CreateLesson = {
    content: string,
    moduleId: string,
};

export type GetLessons = {
    moduleId: string,
}

export default class LessonRepo {
    private logger;
    constructor() {
        this.logger = Logger.getLogger();
    }

    async create({ content, moduleId }: CreateLesson, queryRunner: QueryRunner): Promise<Lesson | null> {
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

    async get({ moduleId }: GetLessons, queryRunner: QueryRunner): Promise<Lesson[] | null> {
        try {
            const lessons = await queryRunner.manager.findBy(Lesson, { module: moduleId });
            this.logger.info(`${this.constructor.name}: Getting lessons for module with id ${moduleId}`);
            return lessons;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

}