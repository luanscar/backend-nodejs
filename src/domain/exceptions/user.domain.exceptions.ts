import { DomainException } from "@shared/domain/domain.exception";

export const userExceptions = {
	invalidNameError: (message = "⚠️ Invalid organization name!") =>
		new DomainException(message),
	invalidEmailError: (message = "⚠️ Invalid e-mail!") =>
		new DomainException(message),
	invalidEmailLengthError: (message = "⚠️ Email length is to much!") =>
		new DomainException(message),
};
