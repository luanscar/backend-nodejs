import { ApplicationException } from '@shared/application/application.exception';

export const authApplicationExceptions = {
    authApplicationException: (message: string = '⚠️ Generic auth application exception') => new ApplicationException(message),
    invalidCredentialsError: (message: string = '⚠️ Invalid credentials!') => new ApplicationException(message),
    unauthorizedError: (message: string = ' ⚠️ Unauthorized!') => new ApplicationException(message)
};
