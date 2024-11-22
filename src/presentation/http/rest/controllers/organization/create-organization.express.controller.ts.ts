import type { CreateOrganizationUseCase } from "@application/use-cases/organization/create-organization.use-case";
import type { IOrganization } from "@domain/interfaces/organization.interface";
import type { CreateOrganizationInputDTO } from "@presentation/dtos/create-organization.dto";
import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

class CreateOrganizationExpressController extends ExpressController {
	private _createOrganizationUseCase: CreateOrganizationUseCase;

	constructor(createOrganizationUseCase: CreateOrganizationUseCase) {
		super();
		this._createOrganizationUseCase = createOrganizationUseCase;
	}

	async createOrganization(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = await request.getCurrentUserId();
			const organizationInputDTO: CreateOrganizationInputDTO = request.body;
			const organizationOutInputDTO: IOrganization = await this._createOrganizationUseCase.execute({
				...organizationInputDTO,
				ownerId: userId,
			});
			this.sendSuccessResponse(response, organizationOutInputDTO);
		} catch (error) {
			next(error);
		}
	}
}

export { CreateOrganizationExpressController };
