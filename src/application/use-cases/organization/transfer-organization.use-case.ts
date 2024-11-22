import type { Organization } from "@domain/entities/organization.entity";
import type { IOrganizationRepository } from "@domain/repositories/organization.repository.interface";
import type { TransferOrganizationInputDTO } from "@presentation/dtos/transfer-organization.tdo";
import type { IUseCase } from "@shared/application/use-case.interface";

export class TransferOrganizationUseCase
  implements IUseCase<TransferOrganizationInputDTO, boolean>
{
  private _organizationRepository: IOrganizationRepository<Organization>;
  constructor(organizationRepo: IOrganizationRepository<Organization>) {
    this._organizationRepository = organizationRepo;
  }
  async execute(
    transferToUserId: TransferOrganizationInputDTO
  ): Promise<boolean> {
    throw new Error("TransferOrganizationUseCase Method not implemented.");
  }
}
