import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import errorMessages from '../../error/errorMessages';
import throwCustomError from '../../error/throwCustomError';
import Yup from '../../lib/Yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Yup.string()
      .typeError('Identificador deve ser uma string.')
      .required()
      .validate(req.params.id, { abortEarly: false });

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
      return throwCustomError('validationError', err.message);
    }

    return throwCustomError('validationError', err.message);
  }
};
