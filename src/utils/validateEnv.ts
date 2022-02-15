import { cleanEnv, port, str } from 'envalid';

function validEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
            default: 'development',
        }),
        MONGO_USER: str(),
        MONGO_PASS: str(),
        PORT: port({ default: 3000 }),
    });
}

export default validEnv;
