import { LLM } from "@/adapters";
import { generatePrompt } from "@/const";
import { AppDataSource, Logger } from "@/helpers";
import { CourseRepo, LessonRepo, ModuleRepo } from "@/repository";
import { CourseResponse, CreateCompleteCourse, DeleteCourse, LLMResponse } from "@/types";

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

    async fetchAllFor(userId: string): Promise<CourseResponse[]> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let courses: CourseResponse[] = [];
        try {
            const response = await this.courseRepo.findForUserId(userId, queryRunner);
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

    async create({ input, userId }: CreateCompleteCourse): Promise<CourseResponse | null> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let res: CourseResponse | null = null;
        try {
            let response = await this.llmAdapter.fetch(generatePrompt(input));
            if (response) {
                response = response.slice(response.indexOf('{'), response.lastIndexOf('}') + 1);
                const llmResponse = JSON.parse(response) as LLMResponse;
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
                    const module = await this.moduleRepo.create({ courseId: course.id, title: chapter.title }, queryRunner);
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

    async delete({}: DeleteCourse): Promise<void> {
        const queryRunner = AppDataSource.getDataSource().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            
            await queryRunner.commitTransaction();
        } catch (error) {
            this.logger.error(`${this.constructor.name}: Error: ${error}`);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

}