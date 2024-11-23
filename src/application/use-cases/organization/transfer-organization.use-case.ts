import { getUserPermissions } from "@application/services/casl/ability.service";
import { organizationSchema } from "@application/services/casl/models/organization";
import type { Role } from "@application/services/casl/roles";
import type { Organization } from "@domain/entities/organization.entity";
import type { IOrganizationRepository } from "@domain/repositories/organization.repository.interface";
import type { TransferOrganizationInputDTO } from "@presentation/dtos/transfer-organization.tdo";
import type { IUseCase } from "@shared/application/use-case.interface";

export class TransferOrganizationUseCase implements IUseCase<TransferOrganizationInputDTO, boolean> {
	private _organizationRepository: IOrganizationRepository<Organization>;
	constructor(organizationRepo: IOrganizationRepository<Organization>) {
		this._organizationRepository = organizationRepo;
	}
	async execute({ organizationMembership, transferToUserId, userId }: TransferOrganizationInputDTO): Promise<boolean> {
		const { membership, organization } = organizationMembership;

		const authOrganization = organizationSchema.parse(organization);

		const { cannot } = getUserPermissions(userId, membership.role as Role);

		if (cannot("transfer_ownership", authOrganization)) {
			throw new Error(`You're not allowed to transfer this organization ownership.`);
		}

		const transferMembership = await this._organizationRepository.getMembership({
			organizationId: organization.id as string,
			transferToUserId,
		});

		if (!transferMembership) {
			throw new Error("Target user is not a member of this organization.");
		}

		return true;
	}
}
