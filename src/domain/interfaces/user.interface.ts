import type { IAuditableEntity, IAuditableEntityKeys } from '@shared/domain/auditable.entity';

/**
 * Defines the complete structure of a User entity, including auditable properties.
 * This interface represents the full set of properties that a User can have.
 */
interface IUser extends IAuditableEntity {
    id?: string;
    email: string;
    name: string;
    password: string;
}

/**
 * Represents the properties required to create a new User.
 * This type excludes the id and auditable properties that are managed by the system.
 */
type CreateUserProps = Omit<IUser, 'id' | IAuditableEntityKeys>;

/**
 * Represents the properties required to retrieve an existing User.
 * This type includes the id property which is required to fetch a specific User.
 */
type UpdateUserProps = IUser & {
    id: NonNullable<IUser['id']>;
};

/**
 * Represents the response after a successful user login.
 * Includes the JWT token and the authenticated user's data.
 */

export { IUser, CreateUserProps, UpdateUserProps };
