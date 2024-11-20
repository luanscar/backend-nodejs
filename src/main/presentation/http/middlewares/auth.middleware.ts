import type { IUser } from '@domain/interfaces/user.interface';
import { HttpErrors } from '@shared/presentation/http/http.error';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '@main/infra/database/orm/prisma/client';

export const authMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        request.getCurrentUserId = async (): Promise<string> => {
            const sub = extractTokenFromAuthHeader(request);

            const user = jwt.verify(sub, process.env.JWT_SECRET as string) as IUser;

            const userById = await prisma.user.findUnique({
                where: {
                    id: user.id
                }
            });

            if (!userById) {
                throw new HttpErrors.UnauthorizedError({
                    message: 'Invalid user token'
                });
            }

            request.user = userById;
            return request.user.id;
        };

        request.getUserMembership = async (slug: string) => {
            const userId = await request.getCurrentUserId();

            const findOrganization = await prisma.organization.findUnique({
                where: {
                    slug
                }
            });

            if (!findOrganization) {
                throw new HttpErrors.NotFoundError({
                    message: 'Organization not found'
                });
            }

            const member = await prisma.member.findFirst({
                where: {
                    userId,
                    organization: {
                        slug
                    }
                },
                include: {
                    organization: true
                }
            });

            if (!member) {
                throw new HttpErrors.NotFoundError({
                    message: 'Member not found'
                });
            }
            const { organization, ...membership } = member;
            return {
                membership,
                organization
            };
        };

        next();
    } catch (error) {
        next(error);
    }
};

export const extractTokenFromAuthHeader = (request: Request): string => {
    const authorization = request.headers.authorization;

    if (!authorization) {
        throw new HttpErrors.UnauthorizedError({ message: 'Authorization header is missing' });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
        throw new HttpErrors.UnauthorizedError({
            message: 'Invalid authorization format'
        });
    }

    return token;
};
