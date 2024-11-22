import { OrganizationApplicationExceptions } from "@application/exceptions/organization.application.exception";
import { OrganizationFactory } from "@application/factories/organization.factory";
import { OrganizationMapper } from "@application/mappers/organization.mapper";
import type { Organization } from "@domain/entities/organization.entity";
import type { IOrganization } from "@domain/interfaces/organization.interface";
import type { IOrganizationRepository } from "@domain/repositories/organization.repository.interface";
import type { IUseCase } from "@shared/application/use-case.interface";

class GetOrganizationUseCase implements IUseCase<string, IOrganization> {
	private _organizationRepository: IOrganizationRepository<Organization>;

	constructor(organizationRepository: IOrganizationRepository<Organization>) {
		this._organizationRepository = organizationRepository;
	}

	async execute(slug: string): Promise<IOrganization> {
		const organization = await this._organizationRepository.findBySlug(slug);

		if (!organization) {
			throw new OrganizationApplicationExceptions.organizationNotFoundException("Organization not found");
		}

		return OrganizationMapper.toDTO(organization);
	}
}

export { GetOrganizationUseCase };
