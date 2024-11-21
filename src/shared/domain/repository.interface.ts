/**
 * Base interface for query operations
 * @template T - Entity type
 */
interface IQuery<T> {
	/**
	 * Retrieves an entity by its UUID
	 * @param uuid - Entity unique identifier
	 * @returns Promise containing the entity or null if not found
	 */
	findByUuid(uuid: string): Promise<T | null>;

	/**
	 * Retrieves all entities
	 * @returns Promise containing an array of entities
	 */
	findAll(): Promise<Array<T>>;

	/**
	 * Checks if an entity exists
	 * @param uuid - Entity unique identifier
	 * @returns Promise containing boolean indicating existence
	 */
	exists(uuid: string): Promise<boolean>;
}

/**
 * Base interface for command operations
 * @template T - Entity type
 */
interface ICommand<T> {
	/**
	 * Creates a new entity
	 * @param entity - Entity to be created
	 * @returns Promise containing the created entity
	 */
	create(entity: T): Promise<T>;

	/**
	 * Updates an existing entity
	 * @param uuid - Entity unique identifier
	 * @param entity - Partial entity with fields to update
	 * @returns Promise containing success status
	 */
	update(uuid: string, entity: Partial<T>): Promise<boolean>;

	/**
	 * Deletes an entity
	 * @param uuid - Entity unique identifier
	 * @returns Promise containing success status
	 */
	delete(uuid: string): Promise<boolean>;

	/**
	 * Removes an entity
	 * @param uuid - Entity unique identifier
	 * @returns Promise containing success status
	 */
}

/**
 * Combined repository interface implementing both Query and Command patterns
 * @template T - Entity type
 */
interface IRepository<T> extends IQuery<T>, ICommand<T> {}

export type { IRepository, IQuery, ICommand };
