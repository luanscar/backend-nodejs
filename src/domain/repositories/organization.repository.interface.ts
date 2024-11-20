import type { IRepository } from '@shared/domain/repository.interface';

export interface IOrganizationRepository<T> extends IRepository<T> {
    findByDomain(domain: string): Promise<T | null>;
    findBySlug(slug: string): Promise<T | null>;
    getMembership(slug: string): Promise<T | null>;
}
