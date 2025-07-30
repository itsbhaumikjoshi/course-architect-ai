import { Router as ExpressRouter } from "express";
import AuthRouter from "./AuthRouter";
import CourseRouter from "./CourseRouter";

export default class Router {
    private router;
    private authRouter;
    private courseRouter;

    constructor() {
        this.router = ExpressRouter();
        this.authRouter = new AuthRouter();
        this.courseRouter = new CourseRouter();
    }

    get() {
        this.router.use("/api/courses", this.courseRouter.get());
        this.router.use("/api/auth", this.authRouter.get());
        return this.router;
    }

}