import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'joi';

export function validateBody(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      next(error);
      return;
    }

    req.body = value;
    next();
  };
}
