import { HttpErrors } from "@shared/presentation/http/http.error";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const signUpSchema = z
	.object({
		name: z.string().min(3).max(50),
		email: z.string().email(),
		password: z.string().min(6).max(32),
		password_confirmation: z.string(),
	})
	.strict()
	.refine((data) => data.password === data.password_confirmation, {
		message: "Password confirmation does not match.",
		path: ["password_confirmation"],
	});

const signUpMiddleware = (request: Request, response: Response, next: NextFunction) => {
	try {
		signUpSchema.parse(request.body);
		next();
	} catch (error: any) {
		const validationError = fromZodError(error);
		const badRequestError = new HttpErrors.BadRequestError({
			message: validationError.message,
		});
		next(badRequestError);
	}
};

export { signUpMiddleware as validSignUp, signUpSchema };
