import { getProfileUseCase, signInUseCase, signUpUseCase } from '@application/use-cases';
import { AuthController } from './auth.express.controller';

const authController = new AuthController(signInUseCase, signUpUseCase, getProfileUseCase);

export { authController };
