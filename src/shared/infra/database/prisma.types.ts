import type { IOrganization } from "@domain/interfaces/organization.interface";

export type OrganizationWithMembership = {
	organization: IOrganization;
	membership: {
		id: string;
		role: string;
		organizationId: string;
		userId: string;
	};
};
