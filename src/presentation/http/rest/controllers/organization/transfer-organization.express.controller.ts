import { getUserPermissions } from "@application/services/casl/ability.service";
import { organizationSchema } from "@application/services/casl/models/organization";
import type { TransferOrganizationUseCase } from "@application/use-cases/organization/transfer-organization.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

class TransferOrganizationExpressController extends ExpressController {
	private _transferOrganizationUseCase: TransferOrganizationUseCase;

	constructor(transferOrganizationUseCase: TransferOrganizationUseCase) {
		super();
		this._transferOrganizationUseCase = transferOrganizationUseCase;
	}

	async transferOrganization(request: Request, response: Response, next: NextFunction) {
		try {
			const { slug } = request.params;
			const { transferToUserId } = request.body;

			const organizationMembership = await request.getUserMembership(slug);

			const userId = await request.getCurrentUserId();

			const organizationUseCase = await this._transferOrganizationUseCase.execute({
				userId,
				organizationMembership,
				transferToUserId,
			});

			this.sendSuccessResponse(response, {});
		} catch (error) {
			next(error);
		}
	}
}

export { TransferOrganizationExpressController };
