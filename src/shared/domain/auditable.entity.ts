/**
 * Defines the common auditable properties that should be present in an entity.
 */
interface IAuditableEntity {
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    createdById?: string | null;
    updatedById?: string | null;
}

type IAuditableEntityKeys = keyof IAuditableEntity;

export { IAuditableEntity, IAuditableEntityKeys };
