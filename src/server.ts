import 'dotenv/config';
import App from './app';
import PostController from './resources/post/post.controller';
import validEnv from './utils/validateEnv';

validEnv();

const app = new App([new PostController()], Number(process.env.PORT));

app.listen();
