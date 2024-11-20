import type { CreateOrganizationUseCase } from '@application/use-cases/organization/create-organization.use-case';
import type { GetOrganizationUseCase } from '@application/use-cases/organization/get-organization.use-case';
import type { IOrganization } from '@domain/interfaces/organization.interface';
import type { CreateOrganizationInputDTO } from '@presentation/dtos/create-organization.dto';

import { ExpressController } from '@shared/presentation/http/express.controller';
import type { NextFunction, Request, Response } from 'express';

export class OrganizationController extends ExpressController {
    private _createOrganizationUseCase: CreateOrganizationUseCase;
    private _getOrganizationUseCase: GetOrganizationUseCase;

    constructor(createOrganizationUseCase: CreateOrganizationUseCase, getOrganizationUseCase: GetOrganizationUseCase) {
        super();
        this._createOrganizationUseCase = createOrganizationUseCase;
        this._getOrganizationUseCase = getOrganizationUseCase;
    }

    async createOrganization(request: Request, response: Response, next: NextFunction) {
        const userId = await request.getCurrentUserId();

        try {
            const organizationInputDTO: CreateOrganizationInputDTO = request.body;
            const organizationOutInputDTO: IOrganization = await this._createOrganizationUseCase.execute({
                ...organizationInputDTO,
                ownerId: userId
            });
            this.sendSuccessResponse(response, organizationOutInputDTO);
        } catch (error) {
            next(error);
        }
    }

    async getMembership(request: Request, response: Response, next: NextFunction) {
        const { slug } = request.params;

        try {
            const data = await request.getUserMembership(slug);
            this.sendSuccessResponse(response, data);
        } catch (error) {
            next(error);
        }
    }

    async getOrganization(request: Request, response: Response, next: NextFunction) {
        const { slug } = request.params;
        try {
            const organization: IOrganization = await this._getOrganizationUseCase.execute(slug);
            this.sendSuccessResponse(response, organization);
        } catch (error) {
            next(error);
        }
    }
}
