import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import errorMessages from '../../error/errorMessages';
import throwCustomError from '../../error/throwCustomError';
import Yup from '../../lib/Yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).max(250).whitespaceValid('Nome').nullable(),
      email: Yup.string().email().nullable(),
      phone: Yup.string().phone().nullable(),
      cpf: Yup.string().cpf().nullable(),
      address: Yup.object()
        .shape({
          street: Yup.string().nullable(),
          district: Yup.string().nullable(),
          city: Yup.string().nullable(),
          state: Yup.string().nullable(),
          country: Yup.string().nullable(),
          zipcode: Yup.string().cep().nullable(),
        })
        .nullable(),
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
