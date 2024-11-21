import { OrganizationApplicationExceptions } from "@application/exceptions/organization.application.exception";
import { Entity } from "@shared/domain/entity";
import { slugfy } from "@shared/helpers/slugfy";
import type { IOrganization } from "domain/interfaces/organization.interface";

/**
 * Represents an Organization entity.
 *
 * This class encapsulates the properties and behaviors of an organization within the system.
 * It extends the Entity class from the shared domain, inheriting its properties and methods.
 *
 * @property {string} _name - The name of the organization.
 * @property {(string | undefined)} _domain - The domain of the organization.
 * @property {boolean} _shouldAttachUsersByDomain - Indicates if users should be attached by domain.
 * @property {(Date | undefined)} _createdAt - The date and time the organization was created.
 * @property {(Date | undefined)} _updatedAt - The date and time the organization was last updated.
 */
class Organization extends Entity<IOrganization> {
	/**
	 * The minimum length for an organization name.
	 *
	 * @static
	 * @type {number}
	 */
	public static readonly MIN_NAME_LENGTH: number = 3;
	/**
	 * The maximum length for an organization name.
	 *
	 * @static
	 * @type {number}
	 */
	public static readonly MAX_NAME_LENGTH: number = 50;
	/**
	 * Regular expression for validating domain names.
	 *
	 * @static
	 * @type {RegExp}
	 */
	public static readonly DOMAIN_REGEX: RegExp = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

	private _name: string;
	private _domain: string | null | undefined;
	private _slug: string;
	private _shouldAttachUsersByDomain: boolean;
	private _createdAt?: Date | undefined | null | string;
	private _updatedAt?: Date | null | string;
	private _ownerId: string | null | undefined;

	/**
	 * Getter for the organization name.
	 *
	 * @returns {string} The name of the organization.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Setter for the organization name.
	 *
	 * Validates the name length before setting it.
	 *
	 * @param {string} name - The name to be set.
	 */
	private set name(name: string) {
		const trimmedName = name?.trim() ?? "";
		if (!this.isValidName(trimmedName)) {
			throw new OrganizationApplicationExceptions.invalidOrganizationNameError(
				`Organization name must be between ${Organization.MIN_NAME_LENGTH} and ${Organization.MAX_NAME_LENGTH} characters.`,
			);
		}

		this._name = trimmedName;
	}

	public get slug(): string {
		return this._slug;
	}

	public set slug(slug: string) {
		this._slug = slugfy(slug);
	}

	/**
	 * Getter for the organization domain.
	 *
	 * @returns {(string | null | undefined)} The domain of the organization.
	 */
	public get domain(): string | null | undefined {
		return this._domain;
	}

	/**
	 * Setter for the organization domain.
	 *
	 * Validates the domain format before setting it.
	 *
	 * @param {(string | null | undefined)} domain - The domain to be set.
	 */
	private set domain(domain) {
		if (domain && !this.isValidDomain(domain)) {
			throw new OrganizationApplicationExceptions.invalidDomainNameError(`Invalid domain format: "${domain}"`);
		}
		this._domain = domain;
	}

	/**
	 * Getter for the flag indicating if users should be attached by domain.
	 *
	 * @returns {boolean} True if users should be attached by domain, false otherwise.
	 */
	public get shouldAttachUsersByDomain(): boolean {
		return this._shouldAttachUsersByDomain;
	}

	/**
	 * Setter for the flag indicating if users should be attached by domain.
	 *
	 * @param {boolean} value - The value to be set.
	 */
	private set shouldAttachUsersByDomain(value: boolean) {
		this._shouldAttachUsersByDomain = value;
	}

	/**
	 * Getter for the creation date of the organization.
	 *
	 * @returns {(Date | undefined)} The date and time the organization was created.
	 */
	public get createdAt(): Date | undefined | null | string {
		return this._createdAt;
	}

	/**
	 * Setter for the creation date of the organization.
	 *
	 * @param {(Date | undefined)} value - The date and time to be set.
	 */
	private set createdAt(value: Date | null | string | undefined) {
		this._createdAt = value;
	}

	/**
	 * Getter for the last update date of the organization.
	 *
	 * @returns {(Date | undefined)} The date and time the organization was last updated.
	 */
	public get updatedAt(): Date | undefined | null | string {
		return this._updatedAt;
	}

	/**
	 * Setter for the last update date of the organization.
	 *
	 * @param {(Date | undefined)} value - The date and time to be set.
	 */
	private set updatedAt(value) {
		this._updatedAt = value;
	}

	public get ownerId(): string | null | undefined {
		return this._ownerId;
	}

	private set ownerId(ownerId) {
		this._ownerId = ownerId;
	}

	/**
	 * Constructor for the Organization class.
	 *
	 * Initializes the organization with the provided properties.
	 *
	 * @param {IOrganization} organization - The organization properties.
	 */
	constructor(organization: IOrganization) {
		super(organization.id);
		this.name = organization.name;
		this.slug = organization.name;
		this.domain = organization.domain;
		this.shouldAttachUsersByDomain = organization.shouldAttachUsersByDomain;
		this.createdAt = organization.createdAt;
		this.updatedAt = organization.updatedAt;
		this.ownerId = organization.ownerId;
	}

	/**
	 * Validates the organization name.
	 *
	 * Checks if the name length is within the allowed range.
	 *
	 * @param {string} name - The name to be validated.
	 * @returns {boolean} True if the name is valid, false otherwise.
	 */
	private isValidName(name: string): boolean {
		return name.length >= Organization.MIN_NAME_LENGTH && name.length <= Organization.MAX_NAME_LENGTH;
	}

	/**
	 * Validates the organization domain.
	 *
	 * Checks if the domain matches the allowed format.
	 *
	 * @param {string} domain - The domain to be validated.
	 * @returns {boolean} True if the domain is valid, false otherwise.
	 */
	private isValidDomain(domain: string): boolean {
		return Organization.DOMAIN_REGEX.test(domain);
	}
}

export { Organization };
