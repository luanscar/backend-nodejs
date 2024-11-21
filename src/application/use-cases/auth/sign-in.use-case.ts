import { authApplicationExceptions } from "@application/exceptions/auth.application.exception";
import type { User } from "@domain/entities/user.entity";
import type { IUserRepository } from "@domain/repositories/user.repository";
import type { IUseCase } from "@shared/application/use-case.interface";
import bcrypt from "bcrypt";

import { UserMap } from "@application/mappers/user.mapper";
import type { IAuthService } from "@application/services/auth.service.interface";
import type {
	SignInInputDTO,
	SignInOutputDTO,
} from "@presentation/dtos/sign-in.dto";

export class SignInUseCase
	implements IUseCase<SignInInputDTO, SignInOutputDTO>
{
	private _userRepo: IUserRepository<User>;
	private _authService: IAuthService;

	constructor(repo: IUserRepository<User>, authService: IAuthService) {
		this._userRepo = repo;
		this._authService = authService;
	}
	async execute({ email, password }: SignInInputDTO): Promise<SignInOutputDTO> {
		const findUser = await this._userRepo.findByEmail(email);

		if (!findUser) {
			throw authApplicationExceptions.invalidCredentialsError();
		}

		const isPasswordValid = await bcrypt.compare(password, findUser.password);

		if (!isPasswordValid) {
			throw authApplicationExceptions.invalidCredentialsError();
		}

		const token = await this._authService.generateToken(findUser);

		const user = UserMap.toDTO(findUser);

		return {
			token,
			user: {
				...user,
			},
		};
	}
}
