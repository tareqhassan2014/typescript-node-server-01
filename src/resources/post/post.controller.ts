import { NextFunction, Request, Response, Router } from 'express';
import validationMiddleware from '../../middleware/validation.middleware';
import HttpException from '../../utils/exceptions/http.exception';
import Controller from '../../utils/interfaces/controller.Interface';
import PostService from './post.service';
import validate from './post.validation';

class PostController implements Controller {
    public path = '/posts';

    public router = Router();

    private PostService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post = this.PostService.create(title, body);
            res.status(201).json({ post });
        } catch (err) {
            next(new HttpException(400, 'Cannot create post'));
        }
    };
}

export default PostController;
