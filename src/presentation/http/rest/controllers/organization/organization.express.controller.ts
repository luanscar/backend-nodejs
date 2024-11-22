import { organizationSchema } from "@application/services/casl/models/organization";
import type { CreateOrganizationUseCase } from "@application/use-cases/organization/create-organization.use-case";
import type { DeleteOrganizationUseCase } from "@application/use-cases/organization/delete-organization.use-case";
import type { GetOrganizationUseCase } from "@application/use-cases/organization/get-organization.use-case";
import type { TransferOrganizationUseCase } from "@application/use-cases/organization/transfer-organization.use-case";
import type { IOrganization } from "@domain/interfaces/organization.interface";
import type { CreateOrganizationInputDTO } from "@presentation/dtos/create-organization.dto";

import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

export class OrganizationController extends ExpressController {
	private _createOrganizationUseCase: CreateOrganizationUseCase;

	private _deleteOrganizationUseCase: DeleteOrganizationUseCase;
	private _transferOrganizationUseCase: TransferOrganizationUseCase;

	constructor(
		createOrganizationUseCase: CreateOrganizationUseCase,
		getOrganizationUseCase: GetOrganizationUseCase,
		deleteOrganizationUseCase: DeleteOrganizationUseCase,
		transferOrganizationUseCase: TransferOrganizationUseCase,
	) {
		super();
		this._createOrganizationUseCase = createOrganizationUseCase;

		this._deleteOrganizationUseCase = deleteOrganizationUseCase;
		this._transferOrganizationUseCase = transferOrganizationUseCase;
	}

	async deleteOrganization(request: Request, response: Response, next: NextFunction) {
		try {
			const { slug } = request.params;

			const organizationWithMembership = await request.getUserMembership(slug);

			const deleted: boolean = await this._deleteOrganizationUseCase.execute(organizationWithMembership);

			this.sendSuccessResponse(response, deleted);
		} catch (error) {
			next(error);
		}
	}
}
