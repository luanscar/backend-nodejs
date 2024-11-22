import type { GetMembershipUseCase } from "@application/use-cases/organization/get-membership.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

class GetMembershipExpressController extends ExpressController {
	async getMembership(request: Request, response: Response, next: NextFunction) {
		const { slug } = request.params;

		try {
			const data = await request.getUserMembership(slug);
			this.sendSuccessResponse(response, data);
		} catch (error) {
			next(error);
		}
	}
}

export { GetMembershipExpressController };
