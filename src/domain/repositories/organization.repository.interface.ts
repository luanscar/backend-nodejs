import type { Organization } from "@domain/entities/organization.entity";
import type { IRepository } from "@shared/domain/repository.interface";

export interface IOrganizationRepository<T> extends IRepository<T> {
	findByDomain(domain: string): Promise<T | null>;
	findBySlug(slug: string): Promise<T | null>;
	getMembership({
		organizationId,
		transferToUserId,
	}: { organizationId: string; transferToUserId: string }): Promise<T | null>;
	getOrganizationsByUserId(userId: string): Promise<Organization[]>;
}
