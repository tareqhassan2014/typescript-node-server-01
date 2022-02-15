import { Request, Response } from 'express';
import HttpException from '../utils/exceptions/http.exception';

function ErrorMiddleWare(
  error: HttpException,
  req: Request,
  res: Response
): void {
  const status = error.status || 500;
  const message = error.message || 'something went wrong';
  res.status(status).send({ message, status });
}

export default ErrorMiddleWare;
