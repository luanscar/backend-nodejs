import type { Prisma } from "@prisma/client";
import { Organization } from "domain/entities/organization.entity";
import type { IOrganization } from "domain/interfaces/organization.interface";

/**
 * Mapper class for Organization entity.
 */
export class OrganizationMapper {
	/**
	 * Maps raw data to Organization domain entity.
	 *
	 * @param {IOrganization} raw - The raw data to be mapped.
	 * @returns {Organization} The mapped Organization entity.
	 */
	public static toDomain(raw: IOrganization): Organization {
		return new Organization(raw);
	}

	/**
	 * Maps Organization entity to persistence format.
	 *
	 * @param {Organization} organization - The Organization entity to be mapped.
	 * @returns {IOrganization} The mapped Organization in persistence format.
	 */
	public static toPersistence(organization: Organization): IOrganization {
		return {
			id: organization.id,
			name: organization.name,
			domain: organization.domain,
			shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
			createdAt: organization.createdAt,
			updatedAt: organization.updatedAt,
			ownerId: organization.ownerId,
		};
	}
	public static toDTO(organization: Organization): IOrganization {
		return {
			id: organization.id,
			name: organization.name,
			domain: organization.domain,
			shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
			createdAt: organization.createdAt,
			updatedAt: organization.updatedAt,
			ownerId: organization.ownerId,
		};
	}

	public static fromPrismaModelToDomain(
		organizationPrisma: Prisma.OrganizationCreateManyInput,
	) {
		return OrganizationMapper.toDomain(organizationPrisma);
	}
}
