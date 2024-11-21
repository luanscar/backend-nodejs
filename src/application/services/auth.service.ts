import type { User } from "@domain/entities/user.entity";
import jwt from "jsonwebtoken";
import type { IAuthService } from "./auth.service.interface";

export class AuthService implements IAuthService {
	async generateToken(user: User): Promise<string> {
		const JWTPayload = {
			id: user.id,
			name: user.name,
			email: user.email,
		};

		return jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
			expiresIn: `${process.env.JWT_EXPIRES_IN}d`,
		});
	}
}
