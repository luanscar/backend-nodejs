import type { CreateOrganizationUseCase } from "@application/use-cases/organization/create-organization.use-case";
import type { DeleteOrganizationUseCase } from "@application/use-cases/organization/delete-organization.use-case";
import type { GetOrganizationUseCase } from "@application/use-cases/organization/get-organization.use-case";
import type { GetUserOrganizationsUseCase } from "@application/use-cases/organization/get-user-organizations.use-case";
import type { TransferOrganizationUseCase } from "@application/use-cases/organization/transfer-organization.use-case";
import type { IOrganization } from "@domain/interfaces/organization.interface";
import type { CreateOrganizationInputDTO } from "@presentation/dtos/create-organization.dto";

import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

export class OrganizationController extends ExpressController {
  private _createOrganizationUseCase: CreateOrganizationUseCase;
  private _getOrganizationUseCase: GetOrganizationUseCase;
  private _getUserOrganizationsUseCase: GetUserOrganizationsUseCase;
  private _deleteOrganizationUseCase: DeleteOrganizationUseCase;
  private _transferOrganizationUseCase: TransferOrganizationUseCase;

  constructor(
    createOrganizationUseCase: CreateOrganizationUseCase,
    getOrganizationUseCase: GetOrganizationUseCase,
    getUserOrganizationsUseCase: GetUserOrganizationsUseCase,
    deleteOrganizationUseCase: DeleteOrganizationUseCase,
    transferOrganizationUseCase: TransferOrganizationUseCase
  ) {
    super();
    this._createOrganizationUseCase = createOrganizationUseCase;
    this._getOrganizationUseCase = getOrganizationUseCase;
    this._getUserOrganizationsUseCase = getUserOrganizationsUseCase;
    this._deleteOrganizationUseCase = deleteOrganizationUseCase;
    this._transferOrganizationUseCase = transferOrganizationUseCase;
  }

  async createOrganization(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = await request.getCurrentUserId();
      const organizationInputDTO: CreateOrganizationInputDTO = request.body;
      const organizationOutInputDTO: IOrganization =
        await this._createOrganizationUseCase.execute({
          ...organizationInputDTO,
          ownerId: userId,
        });
      this.sendSuccessResponse(response, organizationOutInputDTO);
    } catch (error) {
      next(error);
    }
  }

  async getMembership(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { slug } = request.params;

    try {
      const data = await request.getUserMembership(slug);
      this.sendSuccessResponse(response, data);
    } catch (error) {
      next(error);
    }
  }

  async getOrganization(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { slug } = request.params;
    try {
      const organization: IOrganization =
        await this._getOrganizationUseCase.execute(slug);
      this.sendSuccessResponse(response, organization);
    } catch (error) {
      next(error);
    }
  }

  async getOrganizationsByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = await request.getCurrentUserId();
      const organization: Array<IOrganization> =
        await this._getUserOrganizationsUseCase.execute(userId);
      this.sendSuccessResponse(response, organization);
    } catch (error) {
      next(error);
    }
  }

  async deleteOrganization(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { slug } = request.params;

      const organizationWithMembership = await request.getUserMembership(slug);

      const deleted: boolean = await this._deleteOrganizationUseCase.execute(
        organizationWithMembership
      );

      this.sendSuccessResponse(response, deleted);
    } catch (error) {
      next(error);
    }
  }

  async transferOrganization(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { slug } = request.params;
      //   const { userId } = request.body;
      const { transferToUserId } = request.body;

      const organizationWithMembership = await request.getUserMembership(slug);

      const organization = await this._transferOrganizationUseCase.execute({
        transferToUserId,
      });

      this.sendSuccessResponse(response, {});
    } catch (error) {
      next(error);
    }
  }
}
