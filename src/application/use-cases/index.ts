import { organizationRepo, userRepo } from "@infrastructure/database";
import { GetProfileUseCase } from "./auth/get-profile.use-case";
import { SignInUseCase } from "./auth/sign-in.use-case";
import { SignUpUseCase } from "./auth/sign-up.use-case";
import { CreateOrganizationUseCase } from "./organization/create-organization.use-case";

import { AuthService } from "@application/services/auth.service";
import { BcryptEncoder } from "@application/services/bcrypt-encoder.service";
import { configDotenv } from "dotenv";
import { GetOrganizationUseCase } from "./organization/get-organization.use-case";
import { GetUserOrganizationsUseCase } from "./organization/get-user-organizations.use-case";
import { DeleteOrganizationUseCase } from "./organization/delete-organization.use-case";

const signInUseCase = new SignInUseCase(userRepo, new AuthService());
const signUpUseCase = new SignUpUseCase(userRepo, new BcryptEncoder());
const getProfileUseCase = new GetProfileUseCase(userRepo);
const createOrganizationUseCase = new CreateOrganizationUseCase(organizationRepo);
const getOrganizationUseCase = new GetOrganizationUseCase(organizationRepo);
const getUserOrganizationUseCase = new GetUserOrganizationsUseCase(organizationRepo);
const deleteOrganizationUseCase = new DeleteOrganizationUseCase(organizationRepo);

export {
	signInUseCase,
	signUpUseCase,
	getProfileUseCase,
	createOrganizationUseCase,
	getOrganizationUseCase,
	getUserOrganizationUseCase,
	deleteOrganizationUseCase,
};
