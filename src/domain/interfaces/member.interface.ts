import type { IAuditableEntity, IAuditableEntityKeys } from "@shared/domain/auditable.entity";

/**
 * Defines the complete structure of a User entity, including auditable properties.
 * This interface represents the full set of properties that a User can have.
 */
interface IMember {
	id?: string;
	role: string;
	userId: string;
	organizationId: string;
}

type CreateMemberProps = Omit<IMember, "id">;

type RecreateMemberProps = Partial<CreateMemberProps>;

export type { IMember, CreateMemberProps, RecreateMemberProps };
