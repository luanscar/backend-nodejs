import { UserMap } from '@application/mappers/user.mapper';
import { PrismaRepository } from '@shared/infra/database/prisma.repository';
import type { User } from 'domain/entities/user.entity';
import type { IUserRepository } from 'domain/repositories/user.repository';

export class UserRepositoryImpl extends PrismaRepository implements IUserRepository<User> {
    async findByEmail(email: string): Promise<User | null> {
        const userByEmail = await this._datasource.user.findFirst({
            where: {
                email
            }
        });

        if (userByEmail) {
            return UserMap.fromPrismaModelToDomain(userByEmail);
        }

        return null;
    }
    async findByUuid(uuid: string): Promise<User | null> {
        console.log(uuid);
        const userByUuid = await this._datasource.user.findUnique({
            where: {
                id: uuid
            }
        });

        if (userByUuid) {
            return UserMap.fromPrismaModelToDomain(userByUuid);
        }

        return null;
    }
    async findAll(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    async exists(uuid: string): Promise<boolean> {
        const existsUser = await this.findByUuid(uuid);

        if (existsUser) return true;

        return false;
    }
    async create(user: User): Promise<User> {
        const userData = await this._datasource.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        });

        return user;
    }
    async update(uuid: string, entity: Partial<User>): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async delete(uuid: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
