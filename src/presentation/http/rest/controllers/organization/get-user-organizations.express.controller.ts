import type { GetUserOrganizationsUseCase } from "@application/use-cases/organization/get-user-organizations.use-case";
import type { IOrganization } from "@domain/interfaces/organization.interface";
import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

class GetUserOrganizationsExpressController extends ExpressController {
	private _getUserOrganizationsUseCase: GetUserOrganizationsUseCase;

	constructor(getUserOrganizationsUseCase: GetUserOrganizationsUseCase) {
		super();
		this._getUserOrganizationsUseCase = getUserOrganizationsUseCase;
	}

	async getUserOrganizations(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = await request.getCurrentUserId();
			const organization: Array<IOrganization> = await this._getUserOrganizationsUseCase.execute(userId);
			this.sendSuccessResponse(response, organization);
		} catch (error) {
			next(error);
		}
	}
}

export { GetUserOrganizationsExpressController };
