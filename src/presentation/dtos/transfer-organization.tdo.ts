import type { OrganizationWithMembership } from "@shared/infra/database/prisma.types";

export interface TransferOrganizationInputDTO {
	userId: string;
	transferToUserId: string;
	organizationMembership: OrganizationWithMembership;
}
