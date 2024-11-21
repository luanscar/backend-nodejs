import type { IAuditableEntity } from "@shared/domain/auditable.entity";

interface IOrganization extends IAuditableEntity {
	id?: string;
	name: string;
	slug: string;
	domain?: string | null;
	shouldAttachUsersByDomain: boolean;
	ownerId?: string | null;
}

type CreateOrganizationProps = Omit<IOrganization, "id">;

type UpdateOrganizationProps = Partial<CreateOrganizationProps> & {
	id: NonNullable<IOrganization["id"]>;
};

export type { IOrganization, UpdateOrganizationProps, CreateOrganizationProps };
