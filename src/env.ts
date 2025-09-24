export interface IndexerEnv {
    SAVE_FILE?: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    PORT: string;
}

export const envs: IndexerEnv = {
    SAVE_FILE: process.env.SAVE_FILE,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,
    DB_USER: process.env.DB_USER!,
    DB_PASS: process.env.DB_PASS!,
    DB_NAME: process.env.DB_NAME!,
    PORT: process.env.PORT!,
}