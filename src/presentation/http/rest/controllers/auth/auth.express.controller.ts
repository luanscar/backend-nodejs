import type { GetProfileUseCase } from "@application/use-cases/auth/get-profile.use-case";
import type { SignInUseCase } from "@application/use-cases/auth/sign-in.use-case";
import type { SignUpUseCase } from "@application/use-cases/auth/sign-up.use-case";
import type { IUser } from "@domain/interfaces/user.interface";
import type { SignInInputDTO } from "@presentation/dtos/sign-in.dto";
import type {
	SignUpInputDTO,
	SignUpOutputDTO,
} from "@presentation/dtos/sign-up.dto";

import { ExpressController } from "@shared/presentation/http/express.controller";
import type { NextFunction, Request, Response } from "express";

export class AuthController extends ExpressController {
	private _signInUseCase: SignInUseCase;
	private _signUpUseCase: SignUpUseCase;
	private _getProfileUseCase: GetProfileUseCase;

	constructor(
		signInUseCase: SignInUseCase,
		signUpUseCase: SignUpUseCase,
		getProfileUseCase: GetProfileUseCase,
	) {
		super();
		this._signInUseCase = signInUseCase;
		this._signUpUseCase = signUpUseCase;
		this._getProfileUseCase = getProfileUseCase;
	}

	async signIn(request: Request, response: Response, next: NextFunction) {
		try {
			const dto: SignInInputDTO = request.body;
			const signInOutput = await this._signInUseCase.execute(dto);
			this.sendSuccessResponse(response, signInOutput);
		} catch (error) {
			next(error);
		}
	}

	async signUp(request: Request, response: Response, next: NextFunction) {
		try {
			const dto: SignUpInputDTO = request.body;
			const signUpOutput: SignUpOutputDTO =
				await this._signUpUseCase.execute(dto);
			this.sendSuccessResponse(response, signUpOutput);
		} catch (error) {
			next(error);
		}
	}

	async getProfile(request: Request, response: Response, next: NextFunction) {
		try {
			const { uuid } = request.body;
			const signUpOutput: IUser = await this._getProfileUseCase.execute(uuid);
			this.sendSuccessResponse(response, signUpOutput);
		} catch (error) {
			next(error);
		}
	}
}
