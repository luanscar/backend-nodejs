import { HttpErrors } from "@shared/presentation/http/http.error";
import type { NextFunction, Request, Response } from "express";
import { string, z } from "zod";
import { fromZodError } from "zod-validation-error";

const signInSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6).max(32),
	})
	.strict();

const signInMiddleware = (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	try {
		signInSchema.parse(request.body);
		next();
	} catch (error: any) {
		const validationError = fromZodError(error);
		error = new HttpErrors.BadRequestError({
			message: validationError.message,
		});
		next(error);
	}
};

export { signInMiddleware as validSignIn, signInSchema };
