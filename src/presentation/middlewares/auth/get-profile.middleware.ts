import { HttpErrors } from '@shared/presentation/http/http.error';
import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const getProfileSchema = z
    .object({
        uuid: z.string().uuid()
    })
    .strict();

const getProfileMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try {
        getProfileSchema.parse(request.body);
        next();
    } catch (error: any) {
        const validationError = fromZodError(error);
        error = new HttpErrors.BadRequestError({ message: validationError.message });
        next(error);
    }
};

export { getProfileMiddleware as validGetProfile };
