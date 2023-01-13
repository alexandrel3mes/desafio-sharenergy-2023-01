import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import errorMessages from '../../error/errorMessages';
import throwCustomError from '../../error/throwCustomError';
import Yup from '../../lib/Yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      username: Yup.string().min(8).required(),
      password: Yup.string().min(8).required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err: unknown) {
    if (!(err instanceof ValidationError)) {
      return throwCustomError(
        'unknownError',
        errorMessages.INTERNAL_SERVER_ERROR
      );
    }

    const [result] = err.inner;

    if (!result.message) {
      return throwCustomError('validationError', result.message);
    }
    return throwCustomError('validationError', result.message);
  }
};
