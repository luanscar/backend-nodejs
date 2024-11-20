import { OrganizationFactory } from 'application/factories/organization.factory';
import { Organization } from 'domain/entities/organization.entity';
import type { IOrganization } from 'domain/interfaces/organization.interface';
import type { IOrganizationRepository } from '@domain/repositories/organization.repository.interface';

export class OrganizationRepositoryInMemory implements IOrganizationRepository<Organization> {
    findByDomain(domain: string): Promise<Organization | null> {
        throw new Error('Method not implemented.');
    }
    findBySlug(slug: string): Promise<Organization | null> {
        throw new Error('Method not implemented.');
    }
    getMembership(slug: string): Promise<Organization | null> {
        throw new Error('Method not implemented.');
    }
    private _organizations: Map<string, Organization> = new Map();

    async findByUuid(uuid: string): Promise<Organization | null> {
        const organizationData = this._organizations.get(uuid);
        return organizationData ? OrganizationFactory.recreate(organizationData) : null;
    }

    async findAll(): Promise<Organization[]> {
        return Array.from(this._organizations.values());
    }

    async exists(uuid: string): Promise<boolean> {
        return (await this.findByUuid(uuid)) !== null;
    }

    async create(organization: IOrganization): Promise<Organization> {
        console.log('organization', organization);
        const organizationData = OrganizationFactory.create(organization);
        this._organizations.set(organizationData.id, organizationData);
        return organizationData;
    }

    async update(uuid: string, organization: IOrganization): Promise<boolean> {
        const organizationData = this._organizations.get(uuid);
        if (!organizationData) {
            throw new Error('Organization not found!');
        }

        const updatedOrganization = { ...organizationData, ...organization };
        this._organizations.set(uuid, OrganizationFactory.recreate(updatedOrganization));
        return true;
    }

    async delete(uuid: string): Promise<boolean> {
        return this._organizations.delete(uuid);
    }
}
