export const userApplicationExceptions = {
	userApplicationException: (
		message = "⚠️ Generic user application exception",
	) => new Error(message),
	userAlreadyExistsError: (message = "This email is already in use!") =>
		new Error(message),
};
