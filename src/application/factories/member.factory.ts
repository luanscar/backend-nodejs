import { Member } from "@domain/entities/member.entity";
import type { IMember } from "@domain/interfaces/member.interface";
import { Organization } from "domain/entities/organization.entity";
import type { IOrganization } from "domain/interfaces/organization.interface";

class MemberFactory {
	public static create(memberData: IMember): Member {
		return new Member(memberData);
	}

	public static recreate(memberData: IMember): Member {
		return new Member(memberData);
	}
}

export { MemberFactory };
