import { Logger } from "@/helpers";
import { AuthMiddleware } from "@/middleware";
import { CourseService } from "@/service";
import { Router as ExpressRouter, NextFunction, Request, Response } from "express";

export default class CourseRouter {
    private router;
    private authMiddleware;
    private logger;
    private courseService;

    constructor() {
        this.router = ExpressRouter();
        this.authMiddleware = new AuthMiddleware();
        this.logger = Logger.getLogger();
        this.courseService = new CourseService();
    }

    get() {
        this.router.get("/", this.authMiddleware.authenticate(), this.fetchAllCoursesForUser());
        this.router.post("/", this.authMiddleware.authenticate(), this.createCourse());
        this.router.get("/:courseId/:moduleId?", this.authMiddleware.authenticate(), this.fetchCourseModule());
        return this.router;
    }

    private fetchAllCoursesForUser() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const userId = res.locals.userId;
            try {
                const courses = await this.courseService.findAllFor(userId);
                res.status(200).json(courses);
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        };
    }

    private fetchCourseModule() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const courseId = req.params.courseId as string;
            const moduleId = req.params.moduleId;
            const userId = res.locals.userId;
            if (!courseId) return res.status(400).json({
                message: "Invalid Request."
            });
            try {
                const module = await this.courseService.findCourseModule({ id: courseId, userId, moduleId });
                if (!module) return res.status(404).json({
                    message: "Module not found."
                })
                res.status(200).json(module);
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        };
    }

    private createCourse() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const userId = res.locals.userId;
            const input = req.body.input as string;
            try {
                if (!input) return res.status(400).json({
                    message: "input param missing. Please tell us what you are willing to learn?"
                });
                const response = await this.courseService.create({
                    userId,
                    input
                });
                res.status(200).json(response);
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        }
    }

}