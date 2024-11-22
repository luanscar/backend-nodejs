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
			throw new Error("Method not implemented.");
			const { slug } = request.params;
			//   const { userId } = request.body;
			const { transferToUserId } = request.body;

			const { organization, membership } = await request.getUserMembership(slug);

			const authOrganization = organizationSchema.parse(organization);

			console.log(authOrganization);

			const organizationUseCase = await this._transferOrganizationUseCase.execute({
				transferToUserId,
			});

			this.sendSuccessResponse(response, {});
		} catch (error) {
			next(error);
		}
	}
}

export { TransferOrganizationExpressController };
