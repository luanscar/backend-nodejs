import { Entity } from "@shared/domain/entity";

import { userExceptions } from "domain/exceptions/user.domain.exceptions";
import type { IUser } from "domain/interfaces/user.interface";

class User extends Entity<IUser> implements IUser {
	public static readonly MIN_NAME_LENGTH = 3;
	public static readonly MAX_NAME_LENGTH = 50;
	public static readonly MAX_EMAIL_LENGTH = 150;

	private static readonly EMAIL_REGEX =
		/^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

	// Private properties
	private _name: string;
	private _email: string;
	private _password: string;
	private _createdAt?: Date | null | string;
	private _updatedAt?: Date | null | string;

	/**
	 * Creates a new User instance
	 * @param user User properties
	 */
	constructor(user: IUser) {
		super(user.id);
		this.name = user.name;
		this.email = user.email;
		this.password = user.password;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
	}

	// Getters and Setters
	public get name(): string {
		return this._name;
	}
	private set name(value: string) {
		const trimmedValue = value.trim();

		if (
			trimmedValue.length < User.MIN_NAME_LENGTH ||
			trimmedValue.length > User.MAX_NAME_LENGTH
		) {
			throw userExceptions.invalidNameError(
				`Name must be between ${User.MIN_NAME_LENGTH} and ${User.MAX_NAME_LENGTH} characters`,
			);
		}

		this._name = trimmedValue;
	}
	public get email(): string {
		return this._email;
	}
	private set email(value: string) {
		const isValid = User.EMAIL_REGEX.test(value);

		const trimmedValue = value.trim();

		if (trimmedValue.length > User.MAX_EMAIL_LENGTH) {
			throw userExceptions.invalidEmailLengthError(
				`Email must be max ${User.MAX_EMAIL_LENGTH} characters`,
			);
		}
		if (!isValid) {
			throw userExceptions.invalidEmailError(
				`⚠️ Invalid email format: ${value}`,
			);
		}

		this._email = value;
	}
	public get password(): string {
		return this._password;
	}
	private set password(value: string) {
		this._password = value;
	}

	public get createdAt(): Date | undefined | null | string {
		return this._createdAt;
	}
	private set createdAt(value: Date | undefined | null | string) {
		this._createdAt = value;
	}
	public get updatedAt(): Date | undefined | null | string {
		return this._updatedAt;
	}
	private set updatedAt(value: Date | undefined | null | string) {
		this._updatedAt = value;
	}
}

export { User };
