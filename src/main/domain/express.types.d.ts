import type { IMember } from "@domain/interfaces/member.interface";
import type { IUser } from "@modules/user/domain/user.types";

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
			getCurrentUserId(): Promise<string>;
			getUserMembership(slug: T): Promise<T>;
		}
	}
}
