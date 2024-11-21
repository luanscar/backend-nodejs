import { OrganizationMapper } from "@application/mappers/organization.mapper";
import type { Organization } from "@domain/entities/organization.entity";
import type { IOrganization } from "@domain/interfaces/organization.interface";
import type { IOrganizationRepository } from "@domain/repositories/organization.repository.interface";
import type { IUseCase } from "@shared/application/use-case.interface";

export class GetUserOrganizationsUseCase
	implements IUseCase<string, Array<IOrganization>>
{
	private _organizationRepo: IOrganizationRepository<Organization>;

	constructor(organizationRepo: IOrganizationRepository<Organization>) {
		this._organizationRepo = organizationRepo;
	}

	async execute(userId: string): Promise<Array<IOrganization>> {
		const organizations: Array<Organization> =
			await this._organizationRepo.getOrganizationsByUserId(userId);

		const organizationsToDTO: Array<IOrganization> = organizations.map(
			(organization) => OrganizationMapper.toDTO(organization),
		);

		return organizationsToDTO;
	}
}
