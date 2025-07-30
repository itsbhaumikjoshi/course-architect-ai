import { GoogleOAuth2Client } from "@/adapters/OAuth2";
import { Logger } from "@/helpers";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import { AuthService, OAuthService, UserService } from "@/service";
import { OIDC_PROVIDER } from "@/types/auth";
import { Router as ExpressRouter, NextFunction, Request, Response } from "express";

export default class AuthRouter {
    private router;
    private authService;
    private userService;
    private logger;
    private authMiddleware
    private googleOauth2Client;
    private oauthService;

    constructor() {
        this.router = ExpressRouter();
        this.authService = new AuthService();
        this.logger = Logger.getLogger();
        this.googleOauth2Client = new GoogleOAuth2Client();
        this.authMiddleware = new AuthMiddleware();
        this.userService = new UserService();
        this.oauthService = new OAuthService();
    }

    get() {
        this.router.get("/:provider/callback", this.callback());
        this.router.get("/:provider/login", this.getOAuthLoginURL());
        this.router.post("/login", this.login());
        this.router.get("/logout", this.logout());
        this.router.get("/me", this.authMiddleware.authenticate(), this.me());
        this.router.post("/register", this.register());
        return this.router;
    }

    private login() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) return res.status(400).json({
                    message: "Email or password field missing."
                });
                const token = await this.authService.login({ email, password });
                if (!token) {
                    return res.status(404).json({
                        message: "Invalid email or password.",
                    });
                }
                return res.status(200).json({
                    token
                });
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        };
    }

    private logout() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const tokenHeader = req.header("authorization");
                if (!tokenHeader || tokenHeader.split(" ").length != 2 || tokenHeader.split(" ")[0] != "Bearer") return res.status(400).json({
                    message: "Invalid token found."
                });
                const token = tokenHeader.split(" ")[1];
                await this.authService.logout(token);
                res.status(200).json({
                    message: "Logged out successfully"
                });
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        };
    }

    private me() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await this.userService.findById(res.locals.userId);
                if (!user) return res.status(400).json({
                    message: "Invalid token found."
                });
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({
                    error
                });
            }
        };
    }

    private register() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email, password, name } = req.body;
                if (!email || !password || !name) return res.status(400).json({
                    message: "Email or password or name field missing."
                });
                const token = await this.authService.register({ email, password, name });
                res.status(201).json({
                    token
                });
            } catch (error) {
                res.status(500).json({
                    error
                });
            }
        };
    }

    private callback() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const code = req.query.code as string;
                const provider = req.params.provider as OIDC_PROVIDER;
                if (!code) return res.status(400).json({ message: "code not found." });
                if (!Object.values(OIDC_PROVIDER).includes(provider)) return res.status(400).json({
                    message: `Invalid provider: ${provider}`
                });
                const response = await this.fetchOIDCProfile(provider, code);
                if (!response) return res.status(400).json({
                    message: "Failed to fetch OAuth2 response."
                });
                const { email, id: oidcId, name } = response;
                if (!email || !oidcId || !name) return res.status(400).json({
                    message: "OAuth2 provider failed to provide (id or email or name)."
                });
                const token = await this.oauthService.login({
                    email,
                    name,
                    oidcId,
                    oidcProvider: provider
                });
                res.status(200).json({
                    token
                });
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        };
    }

    private async fetchOIDCProfile(oidcProvider: OIDC_PROVIDER, code: string) {
        switch (oidcProvider) {
            case OIDC_PROVIDER.GOOGLE:
                return await this.googleOauth2Client.fetch(code as string);
            default:
                throw new Error(`Unsupported OIDC provider: ${oidcProvider}`);
        }
    }

    private getOAuthLoginURL() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const provider = req.params.provider as OIDC_PROVIDER;
            try {
                switch (provider) {
                    case OIDC_PROVIDER.GOOGLE:
                        return res.status(200).json({
                            url: this.googleOauth2Client.getLoginUrl()
                        })
                    default:
                        throw new Error(`Unsupported OIDC provider: ${provider}`);
                }
            } catch (error) {
                res.status(500).json({
                    error
                });
            }
        };
    }

}
