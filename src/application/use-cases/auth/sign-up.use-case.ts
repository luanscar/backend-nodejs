import { userApplicationExceptions } from "@application/exceptions/user.application.exception";
import { UserFactory } from "@application/factories/user.factory";
import { UserMap } from "@application/mappers/user.mapper";
import type { IEncoder } from "@application/services/encoder.service.interface";
import type { User } from "@domain/entities/user.entity";
import type { CreateUserProps, IUser } from "@domain/interfaces/user.interface";
import type { IUserRepository } from "@domain/repositories/user.repository";
import type { SignUpInputDTO, SignUpOutputDTO } from "@presentation/dtos/sign-up.dto";
import type { IUseCase } from "@shared/application/use-case.interface";
import bcrypt from "bcrypt";

export class SignUpUseCase implements IUseCase<SignUpInputDTO, SignUpOutputDTO> {
	private _userRepo: IUserRepository<User>;
	private _encoder: IEncoder;

	constructor(repo: IUserRepository<User>, encoder: IEncoder) {
		this._userRepo = repo;
		this._encoder = encoder;
	}

	async execute({ email, name, password }: SignUpInputDTO): Promise<SignUpOutputDTO> {
		const dashedPassword = await this._encoder.encode(password);

		const user: User = UserFactory.create({
			email,
			name,
			password: dashedPassword,
		});

		const existsUser = await this._userRepo.findByEmail(email);

		if (existsUser) {
			throw userApplicationExceptions.userAlreadyExistsError();
		}
		const createdUser = await this._userRepo.create(user);

		return {
			user: UserMap.toDTO(createdUser),
		};
	}
}
