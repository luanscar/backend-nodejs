import type { IMember } from "@domain/interfaces/member.interface";
import { Entity } from "@shared/domain/entity";

class Member extends Entity<IMember> {
	private _role: string;
	private _userId: string;
	private _organizationId: string;

	constructor(member: IMember) {
		super(member.id);
		this.role = member.role;
		this.userId = member.userId;
		this.organizationId = member.organizationId;
	}

	public get role(): string {
		return this._role;
	}

	private set role(role: string) {
		this._role = role;
	}

	public get userId(): string {
		return this._userId;
	}

	private set userId(userId: string) {
		this._userId = userId;
	}

	public get organizationId(): string {
		return this._organizationId;
	}

	private set organizationId(organizationId: string) {
		this._organizationId = organizationId;
	}
}

export { Member };
