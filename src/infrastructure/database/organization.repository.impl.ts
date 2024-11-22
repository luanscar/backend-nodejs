import type { IOrganizationRepository } from "@domain/repositories/organization.repository.interface";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { OrganizationMapper } from "application/mappers/organization.mapper";
import type { Organization } from "domain/entities/organization.entity";

export class OrganizationRepositoryImpl extends PrismaRepository implements IOrganizationRepository<Organization> {
	async getOrganizationsByUserId(userId: string): Promise<Organization[]> {
		const organizations = await this._datasource.organization.findMany({
			where: {
				members: {
					some: {
						userId,
					},
				},
			},
		});

		const organizationsMap: Array<Organization> = organizations.map((organization) =>
			OrganizationMapper.fromPrismaModelToDomain(organization),
		);

		return organizationsMap;
	}
	async findBySlug(slug: string): Promise<Organization | null> {
		const organization = await this._datasource.organization.findUnique({
			where: { slug },
		});

		if (organization) {
			return OrganizationMapper.fromPrismaModelToDomain(organization);
		}

		return null;
	}

	getMembership(slug: string): Promise<Organization | null> {
		throw new Error("Method not implemented.");
	}
	async findByDomain(domain: string): Promise<Organization | null> {
		const organization = await this._datasource.organization.findUnique({
			where: { domain },
		});

		if (organization) {
			return OrganizationMapper.fromPrismaModelToDomain(organization);
		}

		return null;
	}

	async findByUuid(uuid: string): Promise<Organization | null> {
		const organization = await this._datasource.organization.findUnique({
			where: { id: uuid },
		});

		if (organization) {
			return OrganizationMapper.fromPrismaModelToDomain(organization);
		}

		return null;
	}
	async findAll(): Promise<Organization[]> {
		const organizations = await this._datasource.organization.findMany();

		const organizationsMap: Array<Organization> = [];

		if (organizations.length > 0) {
			organizations.map((organization) => {
				organizationsMap.push(OrganizationMapper.fromPrismaModelToDomain(organization));
			});
		}

		return organizationsMap;
	}
	async exists(uuid: string): Promise<boolean> {
		const organization = await this.findByUuid(uuid);
		if (organization) return true;

		return false;
	}
	async create(organization: Organization): Promise<Organization> {
		await this._datasource.organization.create({
			data: {
				id: organization.id,
				name: organization.name,
				slug: organization.slug,
				domain: organization.domain,
				shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
				ownerId: organization.ownerId as string,
				members: {
					create: {
						userId: organization.ownerId as string,
						role: "ADMIN",
					},
				},
			},
		});

		return organization;
	}
	update(uuid: string, organization: Partial<Organization>): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async delete(uuid: string): Promise<boolean> {
		const deletedOrganization = await this._datasource.organization.delete({
			where: {
				id: uuid,
			},
		});
		if (deletedOrganization) return true;

		return true;
	}
}
