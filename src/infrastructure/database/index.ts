import { OrganizationRepositoryImpl } from './organization.repository.impl';
import { prisma } from '@main/infra/database/orm/prisma/client';
import { UserRepositoryImpl } from './user.repository.impl';

const organizationRepo = new OrganizationRepositoryImpl(prisma);
const userRepo = new UserRepositoryImpl(prisma);

export { organizationRepo, userRepo };
