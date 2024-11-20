export const userApplicationExceptions = {
    userApplicationException: (message: string = '⚠️ Generic user application exception') => new Error(message),
    userAlreadyExistsError: (message: string = 'This email is already in use!') => new Error(message)
};
