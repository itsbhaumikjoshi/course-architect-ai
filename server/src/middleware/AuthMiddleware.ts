import { AuthService } from "@/service";
import { NextFunction, Request, Response } from "express";

export default class AuthMiddleware {
    private authService;

    constructor() {
        this.authService = new AuthService();
    }

    authenticate() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.cookies["token"] as string | undefined;
                if (!token) return res.status(403).json({
                    message: "You are not authorized to visit this route. Please login first."
                });
                const auth = await this.authService.authenticate(token);
                // injecting user_id and session_id in the request for other funcs to use.
                if (auth && auth.sessionId && auth.userId) {
                    res.locals.userId = auth.userId;
                    res.locals.sessionId = auth.sessionId;
                    return next();
                }
                return res.status(403).json({
                    message: "You are not authorized to visit this route. Please login first."
                })
            } catch (error) {
                res.status(500).json({
                    error
                });
            }
        };
    }

}