import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import errorMessages from '../../error/errorMessages';
import throwCustomError from '../../error/throwCustomError';
import Yup from '../../lib/Yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).max(250).whitespaceValid('Nome').required(),
      email: Yup.string().email().required(),
      phone: Yup.string().phone().required(),
      cpf: Yup.string().cpf().required(),
      address: Yup.object()
        .shape({
          street: Yup.string().required(),
          district: Yup.string().required(),
          city: Yup.string().required(),
          state: Yup.string().required(),
          country: Yup.string().required(),
          zipcode: Yup.string().cep().required(),
        })
        .required(),
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
