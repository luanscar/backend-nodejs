import type { DeleteOrganizationUseCase } from "@application/use-cases/organization/delete-organization.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

class DeleteOrganizationExpressController extends ExpressController {
  private _deleteOrganizationUseCase: DeleteOrganizationUseCase;

  constructor(deleteOrganizationUseCase: DeleteOrganizationUseCase) {
    super();
    this._deleteOrganizationUseCase = deleteOrganizationUseCase;
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
}

export { DeleteOrganizationExpressController };
