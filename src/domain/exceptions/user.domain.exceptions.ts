import { DomainException } from '@shared/domain/domain.exception';

export const userExceptions = {
    invalidNameError: (message: string = '⚠️ Invalid organization name!') => new DomainException(message),
    invalidEmailError: (message: string = '⚠️ Invalid e-mail!') => new DomainException(message),
    invalidEmailLengthError: (message: string = '⚠️ Email length is to much!') => new DomainException(message)
};
