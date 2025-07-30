export enum OIDC_PROVIDER {
    GOOGLE = "google",
}

export type OAuthLogin = {
    oidcId: string,
    oidcProvider: OIDC_PROVIDER,
    name: string,
    email: string,
};

export type AuthSession = {
    userId: string,
    sessionId: string,
};

export type Token = {
    token: string,
};

export type Login = {
    email: string,
    password: string,
};

export type RegisterUser = {
    email: string,
    password: string,
    name: string
};

export type JWTAuthPayload = {
    jti: string,
    expiresAt: Date,
};
