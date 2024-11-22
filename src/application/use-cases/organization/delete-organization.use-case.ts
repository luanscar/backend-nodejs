import { OrganizationApplicationExceptions } from "@application/exceptions/organization.application.exception";
import type { Organization } from "@domain/entities/organization.entity";
import type { IOrganizationRepository } from "@domain/repositories/organization.repository.interface";
import type { IUseCase } from "@shared/application/use-case.interface";
import type { OrganizationWithMembership } from "@shared/infra/database/prisma.types";

export class DeleteOrganizationUseCase
  implements IUseCase<OrganizationWithMembership, boolean>
{
  private _organizationRepository: IOrganizationRepository<Organization>;

  constructor(organizationRepository: IOrganizationRepository<Organization>) {
    this._organizationRepository = organizationRepository;
  }

  async execute(
    organizationWithMembership: OrganizationWithMembership
  ): Promise<boolean> {
    const { organization, membership } = organizationWithMembership;
    if (membership.role !== "OWNER") {
      throw new OrganizationApplicationExceptions.organizationUnauthorizedException();
    }
    const organizationExists = await this._organizationRepository.findByUuid(
      organization.id as string
    );

    if (!organizationExists) {
      return false;
    }
    const deleteResult = await this._organizationRepository.delete(
      organizationExists.id
    );

    return deleteResult;
  }
}
