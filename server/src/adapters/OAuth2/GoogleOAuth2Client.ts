import { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT_URI } from "@/const";
import { AccessEnv, Logger } from "@/helpers";
import { OAuth2Client } from "google-auth-library";

export interface GoogleProfile {
    id: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
    email?: string;
    verified_email?: boolean;
}

export default class GoogleOAuth2 {
    private oauthClient: OAuth2Client;

    constructor() {
        const clientId = AccessEnv.getInstance().get(GOOGLE_OAUTH_CLIENT_ID);
        const clientSecret = AccessEnv.getInstance().get(GOOGLE_OAUTH_CLIENT_SECRET);
        const redirectUri = AccessEnv.getInstance().get(GOOGLE_OAUTH_REDIRECT_URI);
        if (!clientId || !clientSecret || !redirectUri) {
            Logger.getLogger().error(`${this.constructor.name}: Mandatory OAuth2 Cred Missing!`);
            process.exit(1); // if we don't want to integrate google oauth2 we simply will not call this class!
        }
        this.oauthClient = new OAuth2Client({
            clientId,
            clientSecret,
            redirectUri
        });
    }

    getLoginUrl(): string {
        return this.oauthClient.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ],
        });
    }

    async fetch(code: string): Promise<GoogleProfile | null> {
        try {
            const { tokens } = await this.oauthClient.getToken(code);
            this.oauthClient.setCredentials(tokens);
            const res = await this.oauthClient.request<GoogleProfile>({
                url: "https://www.googleapis.com/oauth2/v2/userinfo",
            });
            return res?.data;
        } catch (error) {
            Logger.getLogger().error(`${this.constructor.name}: ${error}`);
            throw error;
        }
    }

}