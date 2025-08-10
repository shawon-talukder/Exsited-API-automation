export type IAuth = {
    accessToken: string | null;
    refreshToken: string | null;
    tokenType?: string;
    expiresIn: number | null;
}