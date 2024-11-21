import { Organization } from "domain/entities/organization.entity";
import type { IOrganization } from "domain/interfaces/organization.interface";

class OrganizationFactory {
	public static create(organizationData: IOrganization): Organization {
		return new Organization(organizationData);
	}

	public static recreate(organizationData: IOrganization): Organization {
		return new Organization(organizationData);
	}
}

export { OrganizationFactory };
