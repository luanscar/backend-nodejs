import { authApplicationExceptions } from "@application/exceptions/auth.application.exception";
import { UserMap } from "@application/mappers/user.mapper";
import type { User } from "@domain/entities/user.entity";

import type { IUser } from "@domain/interfaces/user.interface";
import type { IUserRepository } from "@domain/repositories/user.repository";
import type { IUseCase } from "@shared/application/use-case.interface";

export class GetProfileUseCase implements IUseCase<string, IUser> {
	private _userRepo: IUserRepository<User>;

	constructor(repo: IUserRepository<User>) {
		this._userRepo = repo;
	}

	async execute(uuid: string): Promise<IUser> {
		const existsProfile: boolean = await this._userRepo.exists(uuid);

		if (!existsProfile) {
			throw authApplicationExceptions.authApplicationException("User not found!");
		}

		const userById = await this._userRepo.findByUuid(uuid);

		if (!userById) {
			throw authApplicationExceptions.authApplicationException("User not found!");
		}

		return UserMap.toDTO(userById);
	}
}
