import type { IUser } from "@domain/interfaces/user.interface";
import { prisma } from "@main/infra/database/orm/prisma/client";
import { HttpErrors } from "@shared/presentation/http/http.error";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
	try {
		const userId = await getUserIdFromAuthHeader(request);

		request.getCurrentUserId = async () => userId;

		request.getUserMembership = async (slug: string) => {
			const userId = await request.getCurrentUserId();

			const findOrganization = await prisma.organization.findUnique({
				where: {
					slug,
				},
			});

			if (!findOrganization) {
				throw new HttpErrors.NotFoundError({
					message: "You're not a member of any organization, or the organization does not exist",
				});
			}

			const member = await prisma.member.findFirst({
				where: {
					userId,
					organization: {
						slug,
					},
				},
				include: {
					organization: true,
				},
			});

			if (!member) {
				throw new HttpErrors.NotFoundError({
					message: "Member not found",
				});
			}
			const { organization, ...membership } = member;
			return {
				membership,
				organization,
			};
		};

		next();
	} catch (error) {
		next(error);
	}
};

export const getUserIdFromAuthHeader = async (request: Request): Promise<string> => {
	const authorization = request.headers.authorization;

	if (!authorization) {
		throw new HttpErrors.UnauthorizedError({
			message: "Authorization header is missing",
		});
	}

	const [type, token] = authorization.split(" ");

	if (type !== "Bearer" || !token) {
		throw new HttpErrors.UnauthorizedError({
			message: "Invalid authorization format",
		});
	}

	const user = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;

	const userById = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
	});

	if (!userById) {
		throw new HttpErrors.UnauthorizedError({
			message: "Invalid user token",
		});
	}

	request.user = userById;
	return request.user.id;
};
