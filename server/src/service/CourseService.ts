import { LLM } from "@/adapters";
import { generatePrompt } from "@/const";
import { AppDataSource, Logger } from "@/helpers";
import { CourseRepo, LessonRepo, ModuleRepo } from "@/repository";
import {
    ICourse,
    ICreateCourseFromLLMResponse,
    IDeleteCourse,
    ILLMResponse,
    ICourseModuleResponse,
    IFindCourseByModuleId
} from "@/types";

export default class CourseService {
    private courseRepo: CourseRepo;
    private moduleRepo: ModuleRepo;
    private lessonRepo: LessonRepo;
    private logger;
    private llmAdapter: LLM;

    constructor() {
        this.courseRepo = new CourseRepo();
        this.moduleRepo = new ModuleRepo();
        this.lessonRepo = new LessonRepo();
        this.logger = Logger.getLogger();
        this.llmAdapter = new LLM();
    }

    async findAllFor(userId: string): Promise<ICourse[]> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let courses: ICourse[] = [];
        try {
            const response = await this.courseRepo.findByUserId(userId, queryRunner);
            courses = response.map(course => ({
                id: course.id,
                created_at: course.createdAt,
                title: course.title,
                description: course.description,
            }));
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            courses = [];
            throw error;
        } finally {
            await queryRunner.release();
        }
        return courses;
    }

    async findCourseModule({ id, moduleId, userId }: IFindCourseByModuleId): Promise<ICourseModuleResponse | null> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let res: ICourseModuleResponse | null = null;
        try {
            const course = await this.courseRepo.findById({ id, userId }, queryRunner);
            if (course) {
                const module = await this.moduleRepo.findById(`${id}#${moduleId ? moduleId : 1}`, queryRunner);
                if (module) {
                    const lessons = await this.lessonRepo.findByModuleId(module.id, queryRunner);
                    if(lessons) {
                        res = {
                            id: module.id,
                            title: module.title,
                            courseId: module.courseId,
                            lessons: lessons.map(lesson => ({ content: lesson.content, id: lesson.id }))
                        };
                    }
                }
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            res = null;
            throw error;
        } finally {
            await queryRunner.release();
        }
        return res;
    }

    async create({ input, userId }: ICreateCourseFromLLMResponse): Promise<ICourse | null> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let res: ICourse | null = null;
        try {
            let response = await this.llmAdapter.fetch(generatePrompt(input));
            if (response) {
                response = response.slice(response.indexOf('{'), response.lastIndexOf('}') + 1);
                const llmResponse = JSON.parse(response) as ILLMResponse;
                this.logger.info(`${this.constructor.name}: LLM Response for user: ${userId}, input: ${input}, and ${llmResponse}`);
                const course = await this.courseRepo.create({
                    title: llmResponse.title,
                    description: llmResponse.description,
                    userId
                }, queryRunner);
                if (!course) {
                    throw new Error(`Failed to create the course for user: ${userId} and input: ${input}.`);
                }
                for (const chapter of llmResponse.modules) {
                    const module = await this.moduleRepo.create({ id: chapter.id, courseId: course.id, title: chapter.title }, queryRunner);
                    if (!module) throw new Error(`Failed to create module for ${userId} and input: ${input}`);
                    for (const subChapter of chapter.lessons) {
                        await this.lessonRepo.create({
                            moduleId: module.id,
                            content: JSON.stringify(subChapter),
                        }, queryRunner);
                    }
                }
                res = {
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    created_at: course.createdAt
                }
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            res = null;
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
        return res;
    }

    async delete(deleteCourse: IDeleteCourse): Promise<void> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.courseRepo.softDeleteById(deleteCourse, queryRunner);
            await queryRunner.commitTransaction();
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

}