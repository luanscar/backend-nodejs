import { ApplicationException } from "@shared/application/application.exception";

export const authApplicationExceptions = {
	authApplicationException: (message = "⚠️ Generic auth application exception") => new ApplicationException(message),
	invalidCredentialsError: (message = "⚠️ Invalid credentials!") => new ApplicationException(message),
	unauthorizedError: (message = " ⚠️ Unauthorized!") => new ApplicationException(message),
};
