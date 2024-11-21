import type { User } from "@domain/entities/user.entity";

export interface IEncoder {
	encode(plain: string): Promise<string>;
	compare(plain: string, hashed: string): Promise<boolean>;
}
