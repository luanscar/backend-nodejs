import express from 'express';

import { validGetProfile } from '@presentation/middlewares/auth/get-profile.middleware';

import { validSignIn } from '@presentation/middlewares/auth/sign-in.middleware';
import { validSignUp } from '@presentation/middlewares/auth/sign-up.middleware';
import { authMiddleware } from '@main/presentation/http/middlewares/auth.middleware';
import { authController } from '@presentation/http/rest/controllers/auth';

const authRouter = express.Router();

authRouter.post('/sign-in', validSignIn, (request, response, next) => authController.signIn(request, response, next));
authRouter.post('/sign-up', validSignUp, (request, response, next) => authController.signUp(request, response, next));

authRouter.post('/profile', authMiddleware, validGetProfile, (request, response, next) => authController.getProfile(request, response, next));

export { authRouter };
