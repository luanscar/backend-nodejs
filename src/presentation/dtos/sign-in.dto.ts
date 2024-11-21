import type { IUser } from "@domain/interfaces/user.interface";

export interface SignInInputDTO {
	email: string;
	password: string;
}

export interface SignInOutputDTO {
	token: string;
	user: IUser;
}
