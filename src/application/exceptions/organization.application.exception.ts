import { ApplicationException } from "@shared/application/application.exception";

class OrganizationApplicationException extends ApplicationException {
	constructor(
		message = "⚠️ Generic exception of application of the organization entity",
	) {
		super(message);
		this.name = "OrganizationApplicationException";
		this.message = message;
	}
}

class InvalidDomainNameError extends OrganizationApplicationException {
	constructor(message = "⚠️ Invalid domain name!") {
		super(message);
		this.name = "InvalidDomainNameError";
		this.message = message;
	}
}
class InvalidOrganizationNameError extends OrganizationApplicationException {
	constructor(message = "⚠️ Invalid organization name!") {
		super(message);
		this.name = "InvalidOrganizationNameError";
		this.message = message;
	}
}
class OrganizationNotFoundException extends OrganizationApplicationException {
	constructor(message = "⚠️ Organization not found!") {
		super(message);
		this.name = "OrganizationNotFoundException";
		this.message = message;
	}
}

const OrganizationApplicationExceptions = {
	invalidDomainNameError: InvalidDomainNameError,
	invalidOrganizationNameError: InvalidOrganizationNameError,
	organizationNotFoundException: OrganizationNotFoundException,
};

export { OrganizationApplicationExceptions };
