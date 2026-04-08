import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'joi';

const joiRequestOptions = {
  abortEarly: false,
  stripUnknown: true,
} as const;

export function validateBody(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, joiRequestOptions);

    if (error) {
      next(error);
      return;
    }

    req.body = value;
    next();
  };
}

export function validateParams(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.params, joiRequestOptions);

    if (error) {
      next(error);
      return;
    }

    Object.assign(req.params, value);
    next();
  };
}

export function validateQuery(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.query, joiRequestOptions);

    if (error) {
      next(error);
      return;
    }

    req.query = value;
    next();
  };
}
