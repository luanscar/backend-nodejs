import { UserFactory } from '@application/factories/user.factory';
import type { User } from '@domain/entities/user.entity';
import type { IUser, UpdateUserProps } from '@domain/interfaces/user.interface';
import type { Prisma } from '@prisma/client';

class UserMap {
    public static toDTO(user: User): IUser {
        return {
            id: user.id,
            name: user.name,
            email: user.email,

            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    public static toDomain(user: UpdateUserProps): User {
        return UserFactory.create(user);
    }

    public static fromPrismaModelToDomain(userPrisma: Prisma.UserCreateInput): User {
        return UserMap.toDomain({
            id: userPrisma.id,
            name: userPrisma.name,
            email: userPrisma.email,
            password: userPrisma.password,
            createdAt: userPrisma.createAt as Date,
            updatedAt: userPrisma.updateAt as Date
        });
    }
}

export { UserMap };
