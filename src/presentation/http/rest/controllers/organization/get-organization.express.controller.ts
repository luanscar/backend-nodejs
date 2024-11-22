import type { GetOrganizationUseCase } from "@application/use-cases/organization/get-organization.use-case";
import type { IOrganization } from "@domain/interfaces/organization.interface";

import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

class GetOrganizationExpressController extends ExpressController {
	private _getOrganizationUseCase: GetOrganizationUseCase;

	constructor(getOrganizationUseCase: GetOrganizationUseCase) {
		super();
		this._getOrganizationUseCase = getOrganizationUseCase;
	}

	async getOrganization(request: Request, response: Response, next: NextFunction) {
		try {
			const { slug } = request.params;
			const organization: IOrganization = await this._getOrganizationUseCase.execute(slug);
			this.sendSuccessResponse(response, organization);
		} catch (error) {
			next(error);
		}
	}
}

export { GetOrganizationExpressController };
