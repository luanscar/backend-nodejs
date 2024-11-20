import { createOrganizationUseCase, getOrganizationUseCase } from '@application/use-cases';
import { OrganizationController } from './organization.express.controller';

const organizationController = new OrganizationController(createOrganizationUseCase, getOrganizationUseCase);

export { organizationController };
