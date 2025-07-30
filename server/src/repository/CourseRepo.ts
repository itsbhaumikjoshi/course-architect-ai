import { Logger } from "@/helpers";
import { Course, Lesson, Module } from "@/models";
import { CreateCourse } from "@/types";
import { QueryRunner } from "typeorm";


export default class CourseRepo {
    private logger;
    constructor() {
        this.logger = Logger.getLogger();
    }

    async create({ title, description, userId }: CreateCourse, queryRunner: QueryRunner): Promise<Course | null> {
        try {
            const course = await queryRunner.manager.create(Course, {
                title,
                description,
                user: userId
            });
            await queryRunner.manager.save(course);
            this.logger.info(`${this.constructor.name}: Created course with id ${course.id} for user ${course.user}`);
            return course
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async findForUserId(userId: string, queryRunner: QueryRunner): Promise<Course[]> {
        try {
            const courses = await queryRunner.manager.find(Course, {
                where: {
                    user: { id: userId },
                    deletedAt: undefined
                },
            });
            this.logger.info(`${this.constructor.name}: Getting course for user_id ${userId}`);
            return courses;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async findById(id: string, queryRunner: QueryRunner): Promise<Course | null> {
        try {
            const course = await queryRunner.manager.findOneBy(Course, { id });
            this.logger.info(`${this.constructor.name}: Getting course with id ${id} result ${course != null && course.deletedAt == null}`);
            return course?.deletedAt != null ? null : course;
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

    async softDeleteById(id: string, queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.manager
                .createQueryBuilder()
                .softDelete()
                .from(Lesson)
                .where(qb => {
                    const subQuery = qb
                        .select("id")
                        .from("module", "m")
                        .where("m.courseId = :courseId", { courseId: id })
                        .getQuery();
                    return "lesson.moduleId IN " + subQuery;
                })
                .execute();
            await queryRunner.manager.softDelete(Module, { course: { id } });
            await queryRunner.manager.softDelete(Course, id);
            this.logger.info(`${this.constructor.name}: Soft Deleting course -> modules -> lessons with id ${id} result ${true}`);
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

}