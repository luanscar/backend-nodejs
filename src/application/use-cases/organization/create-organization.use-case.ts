import { OrganizationApplicationExceptions } from '@application/exceptions/organization.application.exception';
import { OrganizationFactory } from '@application/factories/organization.factory';
import { OrganizationMapper } from '@application/mappers/organization.mapper';
import { Organization } from '@domain/entities/organization.entity';
import type { IOrganization } from '@domain/interfaces/organization.interface';
import type { IOrganizationRepository } from '@domain/repositories/organization.repository.interface';
import type { CreateOrganizationInputDTO } from '@presentation/dtos/create-organization.dto';
import type { IUseCase } from '@shared/application/use-case.interface';

class CreateOrganizationUseCase implements IUseCase<CreateOrganizationInputDTO, IOrganization> {
    private _organizationRepository: IOrganizationRepository<Organization>;

    constructor(organizationRepository: IOrganizationRepository<Organization>) {
        this._organizationRepository = organizationRepository;
    }

    async execute(input: CreateOrganizationInputDTO): Promise<IOrganization> {
        const { domain } = input;

        if (domain) {
            const organizationByDomain = await this._organizationRepository.findByDomain(domain);

            if (organizationByDomain) {
                throw new OrganizationApplicationExceptions.invalidDomainNameError('⚠️ Another organization with same domain already exists.');
            }
        }
        const createOrganization = OrganizationFactory.create(input);

        const organization = await this._organizationRepository.create(createOrganization);

        return OrganizationMapper.toDTO(organization);
    }
}

export { CreateOrganizationUseCase };
