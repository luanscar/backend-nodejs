import { HttpErrors } from '@shared/presentation/http/http.error';
import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export const OrganizationSchema = z.object({
    name: z
        .string()
        .min(3, { message: `Organization name must be at least ${3} characters.` })
        .max(50, { message: `Organization name must be at most ${50} characters.` }),
    domain: z.string().optional().nullable(),
    shouldAttachUsersByDomain: z.boolean(),
    ownerId: z.string().uuid()
});

const createOrganizationMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try {
        OrganizationSchema.parse(request.body);
        next();
    } catch (error: any) {
        const validationError = fromZodError(error);
        error = new HttpErrors.BadRequestError({ message: validationError.message });
        next(error);
    }
};

export type IOrganization = z.infer<typeof OrganizationSchema>;

export { createOrganizationMiddleware };
