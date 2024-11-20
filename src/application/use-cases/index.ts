import { organizationRepo, userRepo } from '@infrastructure/database';
import { SignInUseCase } from './auth/sign-in.use-case';
import { SignUpUseCase } from './auth/sign-up.use-case';
import { GetProfileUseCase } from './auth/get-profile.use-case';
import { CreateOrganizationUseCase } from './organization/create-organization.use-case';

import { GetOrganizationUseCase } from './organization/get-organization.use-case';
import { AuthService } from '@application/services/auth.service';
import { BcryptEncoder } from '@application/services/bcrypt-encoder.service';
import { configDotenv } from 'dotenv';

const signInUseCase = new SignInUseCase(userRepo, new AuthService());
const signUpUseCase = new SignUpUseCase(userRepo, new BcryptEncoder());
const getProfileUseCase = new GetProfileUseCase(userRepo);
const createOrganizationUseCase = new CreateOrganizationUseCase(organizationRepo);
const getOrganizationUseCase = new GetOrganizationUseCase(organizationRepo);

export { signInUseCase, signUpUseCase, getProfileUseCase, createOrganizationUseCase, getOrganizationUseCase };
