import type { IUseCase } from "@shared/application/use-case.interface";
import type { OrganizationWithMembership } from "@shared/infra/database/prisma.types";

class GetMembershipUseCase implements IUseCase<void, OrganizationWithMembership> {
	execute(): Promise<OrganizationWithMembership> {
		throw new Error("Method not implemented.");
	}
}

export { GetMembershipUseCase };
